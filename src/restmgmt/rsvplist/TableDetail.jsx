import React, {Component, Fragment} from 'react';

import AsideHeaderClose from 'restmgmt/shared/AsideHeaderClose';
import GetFloorPlanTableQuery from './GetFloorPlanTableQuery';
import TableDetailSection from './TableDetailSection';
import ActiveDateCurrentRestaurantQuery from 'restmgmt/shared/ActiveDateCurrentRestaurantQuery';
import { graphQlOp as listReservationsGql } from 'restmgmt/rsvplist/api.listReservations.query';
import { LoadingQuery } from 'shared/apollo';
import ListCustomerQuery from 'restmgmt/shared/ListCustomerQuery';
import CreateReservationModalForm from 'restmgmt/rsvplist/ReservationCreate/CreateReservationModalForm';
import ModalAnimation from 'shared/modal/ModalAnimation';
import SetFloorPlanSelectedTableMutation from 'restmgmt/shared/SetFloorPlanSelectedTableMutation';
import GetFloorPlanStateQuery from 'restmgmt/shared/GetFloorPlanStateQuery';
import * as moment from "moment-timezone";

class TableDetail extends Component {
    state = {
        isAddModalVisible: false
    };

    componentDidMount() {
        const {
            floorPlanTable,
            onUpdateSelectedTable,
            selectedTableId,
        } = this.props;

        if (selectedTableId !== floorPlanTable.id) {
            onUpdateSelectedTable(floorPlanTable.id);
        }
    }

    onModalClose = () => {
        this.setState({isAddModalVisible: false})
    }

    render() {
        const {
            floorPlanTable,
            onClose,
            onUpdateSelectedTable,
        } = this.props;
        const {isAddModalVisible} = this.state;
        return (
            <Fragment>
                <AsideHeaderClose
                    ariaLabel='back-to-all-reservations'
                    text={`Table ${floorPlanTable.table_number}`}
                    onClickClose={() => {
                        onUpdateSelectedTable(null);

                        onClose();
                    }}
                    rightBtn={true}
                    rightBtnLabel={"Seat Walk-in"}
                    onClickRightBtn={() => this.setState({isAddModalVisible: true})}
                />
                <TableDetailSection
                    floorPlanTable={floorPlanTable}
                />
                <ModalAnimation>
                    {(isAddModalVisible &&
                        <ActiveDateCurrentRestaurantQuery>
                            {({restaurant, activeDate, beginningOfDay, endOfDay}) => {
                                const searchStartAt = moment.tz(moment(), restaurant.timezone_name);
                                return (
                                    <LoadingQuery
                                        query={listReservationsGql}
                                        variables={{
                                            category: "seated",
                                            scheduled_range_start_at: searchStartAt.toISOString(),
                                            scheduled_range_end_at: endOfDay.toISOString(),
                                            floor_plan_table_id: floorPlanTable.id,
                                        }}
                                        fetchPolicy='cache-and-network'
                                    >
                                        {({data}) => {
                                            const reservations = data.listReservations;
                                            return (
                                                <ListCustomerQuery>
                                                    {({customers}) => {
                                                        return (
                                                            <CreateReservationModalForm
                                                                floorPlanTable={floorPlanTable}
                                                                reservations={reservations}
                                                                restaurant={restaurant}
                                                                customers={customers}
                                                                onClose={this.onModalClose}
                                                            />
                                                        )
                                                    }}
                                                </ListCustomerQuery>
                                            )
                                        }}
                                    </LoadingQuery>
                                )

                            }}
                        </ActiveDateCurrentRestaurantQuery>
                    )}
                </ModalAnimation>
            </Fragment>
        );
    }
}

const QueriedTableDetail = ({tableId, onClose}) => (
    <SetFloorPlanSelectedTableMutation>
        {({mutation: onUpdateSelectedTable}) => (
            <GetFloorPlanStateQuery>
                {({data: floorPlanState}) => (
                    <GetFloorPlanTableQuery tableId={tableId}>
                        {({data: floorPlanTable}) => (
                            <TableDetail
                                floorPlanTable={floorPlanTable}
                                onClose={onClose}
                                onUpdateSelectedTable={onUpdateSelectedTable}
                                selectedTableId={floorPlanState.selectedTableId}
                            />
                        )}
                    </GetFloorPlanTableQuery>
                )}
            </GetFloorPlanStateQuery>
        )}
    </SetFloorPlanSelectedTableMutation>
);

export default QueriedTableDetail;
