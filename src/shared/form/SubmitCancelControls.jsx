import * as React from 'react';

import { Button } from 'shared/buttons';
import { GridRow } from 'shared/layout/grid';

export const SubmitCancelControls = ({
  isSubmitEnabled,
  isLoading = false,
  isCancelable = true,
  onCancel,
  cancelText = 'Cancel',
  submitText = 'Submit',
  loadingText = 'Submitting'
}) => {
  return (
    <GridRow>
      <div className="actions">
        <span
          className="cancel-link clickable"
          onClick={onCancel}
        >
          Cancel
        </span>
        <Button
          buttonType="submit"
          buttonStyle="secondary"
          disabled={!isSubmitEnabled}
        >
          {isLoading ? loadingText : submitText}
        </Button>
      </div>
    </GridRow>
  );
};

export default SubmitCancelControls;
