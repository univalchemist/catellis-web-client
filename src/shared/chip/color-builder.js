import classNames from 'classnames';

export const COLORS = [
  'blue-base',
  'green-base',
  'purple-base',
  'pink-base',
  'yellow-base',
];

export function getColorNameForText(text) {
  const nameValue = text
    .split('')
    .map(l => l.charCodeAt(0))
    .reduce((sum, curr) => sum + curr, 0);

  return COLORS[nameValue % COLORS.length];
}

export function getClassNamesForText(text, otherClassNames = {}) {
  const colorClassName = getColorNameForText(text);

  return classNames({
    ...otherClassNames,
    [`background--${colorClassName}`]: true,
  });
}
