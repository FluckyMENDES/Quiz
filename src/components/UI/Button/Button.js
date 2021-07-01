import React from 'react';
import classes from './Button.module.scss';

const Button = (props) => {
  const cls = [classes.Button, classes[props.type]];

  if (props.className) cls.push(props.className);

  return (
    <button className={cls.join(' ')} disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
