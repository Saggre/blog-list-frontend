import axios from 'axios';

const baseUrl = '/api/login';

const authenticate = async (username, password) => {
  try {
    const response = await axios.post(baseUrl, {
      username,
      password,
    });

    return response.data;
  } catch (e) {
    throw new Error('error' in e.response.data ? e.response.data.error : 'an unknown error occurred');
  }
};

export default { authenticate };
