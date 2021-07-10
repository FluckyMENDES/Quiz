import React, { Component } from 'react';
import classes from './Auth.module.scss';
import Button from '../../components/UI/Button/Button';

export default class Auth extends Component {
  loginHandle = () => {};

  registerHandle = () => {};

  submitHandle = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form className={classes.AuthForm} onSubmit={this.submitHandle}>
            <input type="text" />
            <input type="text" />

            <Button type="success" onClick={this.loginHandle}>
              Войти
            </Button>
            <Button type="primary" onClick={this.registerHandle}>
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
