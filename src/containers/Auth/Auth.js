import React, { Component } from 'react';
import classes from './Auth.module.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

export default class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'E-mail',
        errorMessage: 'Введите корректный e-mail',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      const { value, type, label, valid, errorMessage, touched } = control;
      return (
        <Input
          key={`controlName${index}`}
          value={value}
          type={type}
          label={label}
          valid={valid}
          errorMessage={errorMessage}
          touched={touched}
          shouldValidate={!!control.validation}
          onChange={(e) => this.inputChangeHandle(e, controlName)}
        />
      );
    });
  }

  validateControl(value, params) {
    if (!params) {
      return true;
    }
    let isValid = true;

    if (params.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (params.email) {
      const regExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regExp.test(String(value).toLowerCase()) & isValid;
    }

    if (params.minLength) {
      isValid = value.length >= params.minLength && isValid;
    }

    return isValid;
  }

  inputChangeHandle = (e, inputName) => {
    const value = e.target.value;
    const formControls = Object.assign({}, this.state.formControls);
    const control = formControls[inputName];

    control.value = value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);
    formControls[inputName] = control;

    let isFormValid = true;

    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({ formControls, isFormValid });
  };

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
            {this.renderInputs()}
            <Button type="success" onClick={this.loginHandle} disabled={!this.state.isFormValid}>
              Войти
            </Button>
            <Button type="primary" onClick={this.registerHandle} disabled={!this.state.isFormValid}>
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
