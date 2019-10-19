import * as React from 'react';

export const Label = ({
  children,
  required
}) => {
  let inputBadge = null;

  if (required === true) {
    inputBadge = 'Required'
  } else if (required === false) {
    inputBadge = 'Optional'
  }

  const isInputBadgeVisible = !!inputBadge;

  return (
    <div className="input__label-container">
      <label>{children}</label>
      {isInputBadgeVisible && (
        <span className="input__label--required">{inputBadge}</span>
      )}
    </div>
  );
};

export default Label;
