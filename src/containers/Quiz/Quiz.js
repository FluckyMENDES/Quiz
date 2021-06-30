import React, { Component } from 'react';
import classes from './Quiz.module.scss';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

export default class Quiz extends Component {
  state = {
    activeQuestion: 0,
    quiz: [
      {
        id: 1,
        question: 'Question 1',
        answers: [
          { text: 'Answer 1', id: 1 },
          { text: 'Answer 2', id: 2 },
          { text: 'Answer 3', id: 3 },
          { text: 'Answer 4', id: 4 },
        ],
        rightAnswerId: 1,
      },
      {
        id: 2,
        question: 'Question 2',
        answers: [
          { text: 'Answer 5', id: 1 },
          { text: 'Answer 6', id: 2 },
          { text: 'Answer 7', id: 3 },
          { text: 'Answer 8', id: 4 },
        ],
        rightAnswerId: 1,
      },
    ],
  };

  handleAnswerItemClick = (answerId) => {
    this.setState({
      activeQuestion: this.state.activeQuestion + 1,
    });

    if (answerId === this.state.quiz[this.state.activeQuestion].rightAnswerId) {
      console.log('true');
    }
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1 className={classes.QuizTitle}>Quiz</h1>
          <ActiveQuiz
            question={this.state.quiz[this.state.activeQuestion].question}
            answers={this.state.quiz[this.state.activeQuestion].answers}
            quizLength={this.state.quiz.length}
            questionNumber={this.state.activeQuestion + 1}
            handleAnswerItemClick={this.handleAnswerItemClick}
          />
        </div>
      </div>
    );
  }
}
