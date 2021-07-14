import React, { Component } from 'react';
import classes from './Quiz.module.scss';
import axios from '../../axios/axios-quiz';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinalScore from '../../components/FinalScore/FinalScore';

export default class Quiz extends Component {
  state = {
    activeQuestion: 0,
    answerState: null,
    isFinished: false,
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
    results: {},
  };

  handleAnswerItemClick = (answerId) => {
    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    // Обработка бага двойного нажатия на правильный ответ
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];

      if (this.state.answerState[key] === 'success') {
        return;
      }
    }

    if (answerId === question.rightAnswerId) {
      if (!results[this.state.activeQuestion + 1]) {
        results[question.id] = 'success';
      }

      this.setState({
        answerState: { [answerId]: 'success' },
        results,
      });

      const timeout = window.setTimeout(() => {
        this.setState({
          answerState: null,
        });

        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
          });
        }

        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      this.setState({
        answerState: { [answerId]: 'error' },
        results,
      });
    }
  };

  handleQuizRepeatButtonClick = () => {
    this.setState({
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
      results: {},
    });
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1 className={classes.QuizTitle}>Quiz</h1>

          {this.state.isFinished ? (
            <FinalScore
              quiz={this.state.quiz}
              results={this.state.results}
              handleQuizRepeatButtonClick={this.handleQuizRepeatButtonClick}
            />
          ) : (
            <ActiveQuiz
              question={this.state.quiz[this.state.activeQuestion].question}
              answers={this.state.quiz[this.state.activeQuestion].answers}
              quizLength={this.state.quiz.length}
              questionNumber={this.state.activeQuestion + 1}
              handleAnswerItemClick={this.handleAnswerItemClick}
              answerState={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}
