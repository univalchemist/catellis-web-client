import React from 'react';
import * as moment from 'moment-timezone';
import { Mutation } from 'react-apollo';

import { graphQlOp as setActiveDateGql } from 'restmgmt/store/operations/local.setActiveDate.mutation';

const SetActiveDateMutation = ({children}) => (
  <Mutation mutation={setActiveDateGql}>
    {(setActiveDate) => {
      const mutation = (newDate) => {
        const newDateMoment = moment(newDate);

        return setActiveDate({
          variables: {
            activeDate: newDateMoment.toISOString(),
          }
        });
      };

      return children({mutation});
    }}
  </Mutation>
);

export default SetActiveDateMutation;
