import React from 'react';
import classes from './ActiveQuiz.module.scss';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = (props) => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>{props.questionNumber}. </strong>
          {props.question}
        </span>
        <small>
          {props.questionNumber}/{props.quizLength}
        </small>
      </p>
      <AnswersList answers={props.answers} handleAnswerItemClick={props.handleAnswerItemClick} />
    </div>
  );
};

export default ActiveQuiz;
