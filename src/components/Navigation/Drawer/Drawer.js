import React, { Component } from 'react';
import classes from './Drawer.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Список квизов', exact: true },
  { to: '/auth', label: 'Авторизация', exact: false },
  { to: '/quiz-creator', label: 'Создать квиз', exact: false },
];

export default class Drawer extends Component {
  renderLinks() {
    return links.map((link, i) => {
      const { to, label, exact } = link;
      return (
        <li key={i}>
          <NavLink
            to={to}
            exact={exact}
            activeClassName={classes.active}
            onClick={this.props.onMenuClose}>
            {label}
          </NavLink>
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
