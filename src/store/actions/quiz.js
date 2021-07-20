import axios from './../../axios/axios-quiz';
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
} from './actionTypes';

export function fetchQuizById(id) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart);

    try {
      const response = await axios.get(`/quizes/${id}.json`);
      const quiz = response.data;
      dispatch(fetchQuizSuccess(quiz));
    } catch (error) {
      dispatch(fetchQuizesError());
    }
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get('/quizes.json');
      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `${index + 1}`,
        });
      });
      dispatch(fetchQuizesSuccess(quizes));
    } catch (error) {
      console.error(error);
      dispatch(fetchQuizesError(error));
    }
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  };
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error,
  };
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  };
}

export function quizNextQuestion(questionNumber) {
  return {
    type: QUIZ_NEXT_QUESTION,
    questionNumber,
  };
}

export function quizAnswerClick(answerId) {
  function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length;
  }
  return (dispatch, getState) => {
    const state = getState().quiz;
    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    // Обработка бага двойного нажатия на правильный ответ
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];

      if (state.answerState[key] === 'success') {
        return;
      }
    }

    if (answerId === question.rightAnswerId) {
      if (!results[state.activeQuestion + 1]) {
        results[question.id] = 'success';
      }

      dispatch(quizSetState({ [answerId]: 'success' }, results));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }

        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error';
      dispatch(quizSetState({ [answerId]: 'error' }, results));
    }
  };
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY,
  };
}
