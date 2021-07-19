import React, { Component } from 'react';
import classes from './Quiz.module.scss';
import Preloader from '../../components/UI/Preloader/Preloader';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinalScore from '../../components/FinalScore/FinalScore';
import { connect } from 'react-redux';
import { fetchQuizById } from './../../store/actions/quiz';

class Quiz extends Component {
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

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1 className={classes.QuizTitle}>Quiz</h1>

          {this.props.loading || !this.props.quiz ? (
            <Preloader />
          ) : this.props.isFinished ? (
            <FinalScore
              quiz={this.props.quiz}
              results={this.props.results}
              handleQuizRepeatButtonClick={this.handleQuizRepeatButtonClick}
            />
          ) : (
            <ActiveQuiz
              question={this.props.quiz[this.props.activeQuestion].question}
              answers={this.props.quiz[this.props.activeQuestion].answers}
              quizLength={this.props.quiz.length}
              questionNumber={this.props.activeQuestion + 1}
              handleAnswerItemClick={this.handleAnswerItemClick}
              answerState={this.props.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.quiz.loading,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    isFinished: state.quiz.isFinished,
    quiz: state.quiz.quiz,
    results: state.quiz.results,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(fetchQuizById(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
