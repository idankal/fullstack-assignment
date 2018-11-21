import axios from 'axios';

const getData = () => {
  return axios.get('http://localhost:4000/api/getfiles');
}

export default getData;
