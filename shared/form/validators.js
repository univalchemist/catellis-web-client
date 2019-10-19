export const required = (value) => (value ? undefined : 'Required');

export const minLength = (min) => {
  return (value) => {
    return value && value.length >= min ? undefined : 'Too short';
  };
};

export const maxLength = (max) => {
  return (value) => {
    return value && value.length <= max ? undefined : 'Too long';
  };
};

export const simpleEmail = (value) => (/\S{2,}@\S{2,}/.test(value) ? undefined : 'Not a valid email address');

export const phoneNumber = (value) => {
  const parsedPhoneNumber = value.replace(/\D/g, '');

  return /^\d{10}$/.test(parsedPhoneNumber) ? undefined : 'Not a valid phone number';
}

export const onlyDigits = (value) => (/\D/.test(value) ? 'Only digits' : undefined);

export const optional = (validator) => (value) => {
  if (
    (value == null) ||
    (typeof value === 'string' && value.trim().length === 0)
  ) {
    return undefined;
  }

  return validator(value);
}

export const composeValidators = (...validators) => {
  return (value) => {
    return validators.reduce((error, validator) => error || validator(value), undefined);
  };
};
