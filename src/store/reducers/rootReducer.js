import { combineReducers } from 'redux';
import quizReducer from './quiz';
import createQuizReducer from './createQuiz';

export default combineReducers({
  quiz: quizReducer,
  create: createQuizReducer,
});
