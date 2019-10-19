import * as React from 'react';

export const FormError = ({
  meta: {error, touched}
}) => {
  const isError = error && touched;

  if (!isError) return null;

  return (
    <span className="input--error__label">{error}</span>
  );
};

export default FormError;
