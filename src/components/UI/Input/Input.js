import React from 'react';
import classes from './Input.module.scss';

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

function isValid({ valid, touched }) {
  return valid && touched;
}

const Input = (props) => {
  const cls = [classes.Input];
  const inputType = props.type || 'text';
  const { label, value } = props;
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  if (isValid(props)) {
    cls.push(classes.valid);
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{label}</label>
      <input type={inputType} id={htmlFor} value={value} onChange={props.onChange} />

      {isInvalid(props) ? <span>{props.errorMessage || 'Введите значение'}</span> : null}
    </div>
  );
};

export default Input;
