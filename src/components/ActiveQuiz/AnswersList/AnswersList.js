import React from 'react';
import classes from './AnswersList.module.scss';
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = (props) => {
  return (
    <ul className={classes.AnswersList}>
      {props.answers.map((answer, i) => {
        return (
          <AnswerItem answer={answer} key={i} handleAnswerItemClick={props.handleAnswerItemClick} />
        );
      })}
    </ul>
  );
};

export default AnswersList;
