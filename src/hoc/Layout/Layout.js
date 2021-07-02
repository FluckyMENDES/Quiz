import React, { Component } from 'react';
import classes from './Layout.module.scss';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';

export default class Layout extends Component {
  state = {
    isMenuOpen: false,
  };

  handleMenuToggle = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <MenuToggle onToggle={this.handleMenuToggle} isOpen={this.state.isMenuOpen} />
        <main className={classes.Main}>{this.props.children}</main>
      </div>
    );
  }
}
