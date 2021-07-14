import React from 'react';
import classes from './Preloader.module.scss';

const Preloader = (props) => (
  <div className={classes.center}>
    <div className={classes.Preloader}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Preloader;
