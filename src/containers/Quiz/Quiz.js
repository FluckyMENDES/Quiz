import React, { Component } from 'react';
import classes from './Quiz.module.scss';
import Preloader from '../../components/UI/Preloader/Preloader';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinalScore from '../../components/FinalScore/FinalScore';
import { connect } from 'react-redux';
import { fetchQuizById, quizAnswerClick, retryQuiz } from './../../store/actions/quiz';

class Quiz extends Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.retryQuiz();
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
              handleQuizRepeatButtonClick={this.props.retryQuiz}
            />
          ) : (
            <ActiveQuiz
              question={this.props.quiz[this.props.activeQuestion].question}
              answers={this.props.quiz[this.props.activeQuestion].answers}
              quizLength={this.props.quiz.length}
              questionNumber={this.props.activeQuestion + 1}
              handleAnswerItemClick={this.props.quizAnswerClick}
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
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
