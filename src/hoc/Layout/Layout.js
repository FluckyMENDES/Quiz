import React, { Component } from 'react';
import classes from './Layout.module.scss';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    isMenuOpen: false,
  };

  handleMenuToggle = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen,
    });
  };

  handleMenuClose = () => {
    this.setState({
      isMenuOpen: false,
    });
  };

  render() {
    return (
      <div className={classes.Layout}>
        <Drawer
          isAuthenticated={this.props.isAuthenticated}
          isMenuOpen={this.state.isMenuOpen}
          onMenuClose={this.handleMenuClose}
        />
        <MenuToggle onToggle={this.handleMenuToggle} isMenuOpen={this.state.isMenuOpen} />
        <main className={classes.Main}>{this.props.children}</main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

export default connect(mapStateToProps)(Layout);
