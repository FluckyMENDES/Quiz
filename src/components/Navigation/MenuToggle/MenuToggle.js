import React from 'react';
import classes from './MenuToggle.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

const MenuToggle = (props) => {
  return props.isOpen ? (
    <FontAwesomeIcon
      className={[classes.MenuToggle, classes.open].join(' ')}
      icon={faTimes}
      onClick={props.onToggle}
    />
  ) : (
    <FontAwesomeIcon className={classes.MenuToggle} icon={faBars} onClick={props.onToggle} />
  );
};

export default MenuToggle;
