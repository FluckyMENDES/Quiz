import React, { Component } from 'react';
import classes from './Drawer.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

export default class Drawer extends Component {
  renderLinks(links) {
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

    const links = [{ to: '/', label: 'Список квизов', exact: true }];

    if (this.props.isAuthenticated) {
      links.push(
        { to: '/quiz-creator', label: 'Создать квиз', exact: false },
        { to: '/logout', label: 'Выйти', exact: false }
      );
    } else {
      links.push({ to: '/auth', label: 'Авторизация', exact: false });
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {this.props.isMenuOpen ? <Backdrop onClick={this.props.onMenuClose} /> : null}
      </>
    );
  }
}
