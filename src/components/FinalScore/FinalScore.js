import React from 'react';
import classes from './FinalScore.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck, faRedoAlt } from '@fortawesome/free-solid-svg-icons';

const FinalScore = (props) => {
  return (
    <div className={classes.FinalScore}>
      <h2 className={classes.Title}>Score</h2>
      <ul className={classes.ScoreList}>
        <li className={classes.ScoreItem}>
          <strong>1. </strong>
          Question
          <FontAwesomeIcon className={classes.ScoreItemIcon} icon={faCheck} color="limegreen" />
        </li>
        <li className={classes.ScoreItem}>
          <strong>2. </strong>
          Question
          <FontAwesomeIcon className={classes.ScoreItemIcon} icon={faTimes} color="tomato" />
        </li>
      </ul>

      <p className={classes.Desc}>Правильно 4 из 10</p>

      <button className={classes.Button} onClick={props.handleQuizRepeatButtonClick}>
        Повторить
        <FontAwesomeIcon className={classes.ScoreItemIcon} icon={faRedoAlt} color="#fefefe" />
      </button>
    </div>
  );
};

export default FinalScore;
