import React, { Component } from 'react';
import classes from './Drawer.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';

const links = [1, 2, 3];

export default class Drawer extends Component {
  state = {};

  renderLinks() {
    return links.map((link, i) => {
      return (
        <li key={i}>
          <a href={link}>Link {link}</a>
        </li>
      );
    });
  }

  render() {
    const cls = [classes.Drawer];

    if (!this.props.isMenuOpen) {
      cls.push(classes.close);
    }
    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isMenuOpen ? <Backdrop onClick={this.props.onMenuClose} /> : null}
      </>
    );
  }
}
