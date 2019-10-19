import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'react-apollo';
import * as moment from 'moment-timezone';

import { CardSection } from 'shared/card';
import { Card } from 'shared/card';
import {
  GridCol,
  GridRow
} from 'shared/layout/grid';
import destroyFloorPlanWrapper from 'restmgmt/rest-settings/floor-plans/api.destroyFloorPlan.mutation';
import { MaterialIconButton } from 'shared/buttons';
import { toastSuccess, toastError } from 'shared/toast';
import styles from 'stylesheets/settings/variables/_colors.scss';
import {
  listFloorPlansOpName,
  listFloorPlansGql,
} from 'shared/gql/floor-plans';
import { LoadingQuery } from 'shared/apollo';

const FloorPlanActionIcon = ({onClick, iconName}) => (
  <MaterialIconButton
    iconName={iconName}
    iconColor={styles.grayAlt1}
    onClick={onClick}
  />
);

const EditIcon = compose(
  withRouter,
  (Component) => {
    return ({history, floorPlan}) => {
      const onClick = () => history.push(`/rm/restaurant_settings/floor_plans/${floorPlan.id}`);

      return (
        <Component
          onClick={onClick}
          iconName="settings"
        />
      );
    };
  }
)(FloorPlanActionIcon);

const DeleteIcon = compose(
  destroyFloorPlanWrapper(
    'destroyFloorPlan',
    {
      props: ({destroyFloorPlan, ownProps: { floorPlan }}) => ({
        onClick: () => {
          const opQ = destroyFloorPlan({
            variables: {
              id: floorPlan.id,
            }
          });

          opQ
            .then(() => {
              toastSuccess(`Success! The floor plan has been destroyed.`);
            })
            .catch(() => {
              toastError();
            })

          return opQ;
        }
      }),
      options: {
        refetchQueries: [listFloorPlansOpName]
      }
    }
  ),
  (Component) => {
    return ({onClick}) => {
      return (
        <Component
          onClick={onClick}
          iconName="delete"
        />
      );
    };
  }
)(FloorPlanActionIcon);

const FloorPlanMaxCoversCount = ({floorPlan}) => {
  return floorPlan.floor_plan_tables.reduce(
    (sum, currTable) => {
      return sum + currTable.max_covers;
    },
    0
  );
};

const FloorPlansSection = ({floorPlans}) => {
  let listContent;
  if (floorPlans.length > 0) {
    listContent = (
      <tbody className="table__body">
        {floorPlans.map(floorPlan => (
          <tr
            key={floorPlan.id}
            className="table__row"
          >
            <td>{floorPlan.name}</td>
            <td>
              {floorPlan.floor_plan_tables.length} Tables
            </td>
            <td>
              <FloorPlanMaxCoversCount floorPlan={floorPlan} /> Covers
            </td>
            <td>
              {moment(floorPlan.created_at).format('MM/DD/YYYY')}
            </td>
            <td>
              <EditIcon floorPlan={floorPlan} />
            </td>
            <td>
              <DeleteIcon floorPlan={floorPlan} />
            </td>
          </tr>
        ))}
      </tbody>
    );
  } else {
    listContent = (
      <tbody className="table__body">
        <tr className="table__row">
          <td colSpan="6">
            No floor plans have been created.
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <CardSection
      title="Rooms & Floor Layouts"
      intro={() => `Manage your restaurant's rooms and layouts to help determine how many covers you can have.`}
    >
      <GridRow>
        <GridCol>
          <Card size="md">
            <table className="table">
              <thead className="table__header">
                <tr>
                  <th width="28%">Room</th>
                  <th width="21%">Total Tables</th>
                  <th width="21%">Total Covers</th>
                  <th width="21%">Created On</th>
                  <th width="5%"></th>
                  <th width="5%"></th>
                </tr>
              </thead>
              {listContent}
            </table>
          </Card>
        </GridCol>
      </GridRow>
      <GridRow className="margin-bottom--32">
        <Link to="/rm/restaurant_settings/floor_plans/create">+ Create Room</Link>
      </GridRow>
    </CardSection>
  );
};

const QueriedFloorPlansSection = () => (
  <LoadingQuery
    query={listFloorPlansGql}
    fetchPolicy="cache-and-network"
  >
    {({data})=>{
      const floorPlans = data.listFloorPlans;

      return (
        <FloorPlansSection
          floorPlans={floorPlans}
        />
      );
    }}
  </LoadingQuery>
);

export default QueriedFloorPlansSection;
