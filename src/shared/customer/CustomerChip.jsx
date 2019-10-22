import * as React from 'react';

import { Avatar } from 'shared/avatar/Avatar';
import { Chip } from 'shared/chip/Chip';
import { ChipTextContainer } from 'shared/chip/ChipTextContainer';
import { ChipTitle } from 'shared/chip/ChipTitle';
import { ChipDescription } from 'shared/chip/ChipDescription';
import format from 'shared/formatters/phone-number';

export const CustomerChip = ({customer, showEmail = false}) => {
  return (
    <Chip size="lg">
      <Avatar size="lg" avatarText={customer.name} />
      <ChipTextContainer>
        <ChipTitle text={customer.name} />
        <ChipDescription>
          {format(customer.phone_number) || 'No phone number'}
          {showEmail && (
            <React.Fragment>
              {' | '}
              {customer.email || 'No email'}
            </React.Fragment>
          )}
        </ChipDescription>
      </ChipTextContainer>
    </Chip>
  );
};

export default CustomerChip;
