import axios from 'axios';

export default axios.create({
  baseURL: 'https://react-quiz-e74fd-default-rtdb.europe-west1.firebasedatabase.app/',
});
