import React from 'react';

import { getClassNamesForText } from 'shared/chip/color-builder';

function abbreviateText(name) {
  let result = '??';

  if (name == null) { name = '??' }

  const nameSections = name.trim().split(' ');

  if (nameSections.length > 1) {
    result = nameSections[0].charAt(0) + nameSections[1].charAt(0);
  } else {
    result = name.substring(0, 2);
  }

  result = result.toUpperCase();

  return result;
}

export const Avatar = ({
  avatarImage,
  avatarText,
  size = 'md',
  children
}: AvatarProps) => {
  const avatarClasses: string = getClassNamesForText(avatarText, {
    'avatar': true,
    [`avatar--${size}`]: true,
  });

  const abbreviatedText = abbreviateText(avatarText);

  return (
    <div className={avatarClasses}>
      {avatarImage ? (
        <img
          src={avatarImage}
          className="img"
          alt={avatarText}
        />
      ) : (
        <p className="text">{abbreviatedText}</p>
      )}
    </div>
  );
};
