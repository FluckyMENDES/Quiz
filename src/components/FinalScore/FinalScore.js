import React from 'react';
import classes from './FinalScore.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck, faRedoAlt } from '@fortawesome/free-solid-svg-icons';

const FinalScore = (props) => {
  const successCounter = Object.keys(props.results).reduce((acc, key) => {
    if (props.results[key] === 'success') {
      acc++;
    }
    return acc;
  }, 0);

  return (
    <div className={classes.FinalScore}>
      <h2 className={classes.Title}>Score</h2>
      <ul className={classes.ScoreList}>
        {props.quiz.map((quizItem, i) => {
          const iconComponent =
            props.results[quizItem.id] === 'success' ? (
              <FontAwesomeIcon className={classes.ScoreItemIcon} icon={faCheck} color="limegreen" />
            ) : (
              <FontAwesomeIcon className={classes.ScoreItemIcon} icon={faTimes} color="tomato" />
            );
          return (
            <li key={i}>
              <strong>{i + 1}. </strong>
              {quizItem.question}
              {iconComponent}
            </li>
          );
        })}
      </ul>

      <p className={classes.Desc}>
        Правильно {successCounter} из {props.quiz.length}
      </p>

      <button className={classes.Button} onClick={props.handleQuizRepeatButtonClick}>
        Повторить
        <FontAwesomeIcon className={classes.ScoreItemIcon} icon={faRedoAlt} color="#fefefe" />
      </button>
    </div>
  );
};

export default FinalScore;
