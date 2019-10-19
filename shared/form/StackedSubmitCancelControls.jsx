import React, { Fragment as Frag } from 'react';

import { Button } from 'shared/buttons';
import {
  GridCol,
  GridRow
} from 'shared/layout/grid';

export const StackedSubmitCancelControls = ({
  isSubmitEnabled,
  isLoading = false,
  isCancelable = true,
  isDeletable = false,
  onSubmit = () => undefined,
  onCancel = () => undefined,
  onDelete = () => undefined,
  cancelText = 'Cancel',
  deleteText = 'Delete',
  submitText = 'Submit',
  loadingText = 'Submitting'
}) => {
  const isCancelDeleteVisible = isCancelable || isDeletable;
  const gridDivisions = (isCancelable ? 1 : 0) + (isDeletable ? 1 : 0);

  return (
    <Frag>
      <Button
        buttonType="submit"
        size="fl"
        buttonStyle="secondary"
        disabled={!isSubmitEnabled || isLoading}
        onClick={onSubmit}
      >
        {isLoading ? loadingText : submitText}
      </Button>
      {isCancelDeleteVisible && (
        <GridRow>
          {isDeletable && (
            <GridCol l={12/gridDivisions} m={gridDivisions === 1 ? 9 : 4} s={4}>
              <div className="margin-top--16 text--center">
                <a
                  onClick={onDelete}
                  className="text--gray-dark clickable"
                >
                  {deleteText}
                </a>
              </div>
            </GridCol>
          )}
          {isCancelable && (
            <GridCol l={12/gridDivisions} m={gridDivisions === 1 ? 9 : 5} s={4}>
              <div className="margin-top--16 text--center">
                <a
                  onClick={onCancel}
                  className="text--gray-dark clickable"
                >
                  {cancelText}
                </a>
              </div>
            </GridCol>
          )}
        </GridRow>
      )}
    </Frag>
  );
};

export default StackedSubmitCancelControls;
