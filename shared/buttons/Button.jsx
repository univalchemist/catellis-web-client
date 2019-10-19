import * as React from 'react';
import * as classNames from 'classnames';

export const Button = ({
  text,
  url,
  buttonStyle = 'primary',
  size,
  disabled = false,
  buttonType,
  onClick = () => undefined,
  children
}) => {
  const classes = classNames({
    [`button--${buttonStyle}`]: true,
    [`button--${size}`]: size && size.trim().length > 0,
    'button--disabled': disabled
  });

  return (
    <div>
      {url == null ? (
        <button
          onClick={onClick}
          className={classes}
          type={buttonType}
          disabled={disabled}
        >
          {text ? text : children}
        </button>
      ) : (
        <a
          href={url}
          onClick={onClick}
          className={classes}
        >
          {text ? text : children}
        </a>
      )}
    </div>
  );
};

export default Button;
