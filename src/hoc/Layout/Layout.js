import React, { Component } from 'react';
import classes from './Layout.module.scss';

export default class Layout extends Component {
  state = {};
  render() {
    return (
      <div className={classes.Layout}>
        <main className={classes.Main}>{this.props.children}</main>
      </div>
    );
  }
}
