import axios from 'axios';

export default axios.create({
  baseURL: 'https://notes-app-mvp.herokuapp.com/api/v1',
});
