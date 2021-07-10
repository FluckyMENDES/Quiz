import React, { Component } from 'react';
import classes from './Auth.module.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

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
            <Input label="E-mail" />
            <Input label="Пароль" errorMessage="тест" />

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
