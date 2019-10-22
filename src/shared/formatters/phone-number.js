const DIGIT_FORMAT_TOKEN = '9';

export function format(phoneNumber, options = {}) {
  const {format = '(999) 999-9999', fallback = ''} = options;

  if (phoneNumber == null || phoneNumber.trim().length === 0) {
    return fallback;
  }

  const result = [],
        formatTokens = format.split(''),
        numberTxtTokens = phoneNumber.split('');

  let formatToken, addition;

  while (formatTokens.length) {
    formatToken = formatTokens.pop();

    if (formatToken === DIGIT_FORMAT_TOKEN) {
      // Current format token is a digit placeholder, substitute number
      // from number text.
      addition = numberTxtTokens.pop();
    } else {
      // Current format token isn't a placeholder, include format
      // token literal value.
      addition = formatToken;
    }

    result.unshift(addition);
  }

  return result.join('');
}

export default format;
