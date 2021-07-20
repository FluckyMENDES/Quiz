import React, { Component, Fragment } from 'react';
import classes from './QuizCreator.module.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import { createControl, validateControl, validateForm } from '../../formFramework/formFramework';
import { connect } from 'react-redux';
import { createQuizQuestion, finishCreateQuiz } from './../../store/actions/createQuiz';

function createOptionControl(number) {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: 'Значение не может быть пустым',
      id: number,
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым',
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}

class QuizCreator extends Component {
  state = {
    isFormValid: false,
    formControls: createFormControls(),
    rightAnswerId: 1,
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      const { label, value, valid, touched, errorMessage } = control;
      return (
        <Fragment key={`${controlName}${index}`}>
          <Input
            label={label}
            value={value}
            valid={valid}
            touched={touched}
            errorMessage={errorMessage}
            shouldValidate={!!control.validationRules}
            onChange={(e) => this.inputChangeHandle(e.target.value, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </Fragment>
      );
    });
  }

  inputChangeHandle(value, inputName) {
    const formControls = Object.assign({}, this.state.formControls);
    const control = formControls[inputName];

    control.touched = true;
    control.value = value;
    control.valid = validateControl(control.value, control.validationRules);

    formControls[inputName] = control;

    this.setState({ formControls, isFormValid: validateForm(formControls) });
  }

  selectChangeHandle = (e) => {
    this.setState({
      rightAnswerId: +e.target.value,
    });
  };

  addQuestionHandle = (e) => {
    e.preventDefault();

    const { question, option1, option2, option3, option4 } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };

    this.props.createQuizQuestion(questionItem);

    this.setState({
      isFormValid: false,
      formControls: createFormControls(),
      rightAnswerId: 1,
    });
  };

  createQuizHandle = (e) => {
    e.preventDefault();

    this.setState({
      isFormValid: false,
      formControls: createFormControls(),
      rightAnswerId: 1,
    });

    this.props.finishCreateQuiz();
  };

  formSubmitHandle = (e) => {
    e.preventDefault();
  };

  render() {
    const select = (
      <Select
        onChange={this.selectChangeHandle}
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание квиза</h1>
          <form onSubmit={this.formSubmitHandle}>
            {this.renderInputs()}
            {select}
            <Button
              type="primary"
              onClick={this.addQuestionHandle}
              disabled={!this.state.isFormValid}>
              Добавить вопрос
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandle}
              disabled={this.props.quiz.length === 0}>
              Создать квиз
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
