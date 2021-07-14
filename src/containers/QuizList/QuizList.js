import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Preloader from '../../components/UI/Preloader/Preloader';
import classes from './QuizList.module.scss';

export default class QuizList extends Component {
  state = {
    quizes: [],
    loading: true,
  };

  renderQuizes() {
    return this.state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>Квиз №{quiz.name}</NavLink>
        </li>
      );
    });
  }

  async componentDidMount() {
    try {
      const response = await axios.get(
        'https://react-quiz-e74fd-default-rtdb.europe-west1.firebasedatabase.app/quizes.json'
      );

      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `${index + 1}`,
        });
      });

      this.setState({
        quizes,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список квизов</h1>
          {this.state.loading ? <Preloader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    );
  }
}
