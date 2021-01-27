import axios from 'axios';

const baseUrl = '/api/blogs';
const authConfig = {
  headers: { Authorization: null },
};

/**
 * Set auth token
 * @param token
 */
const setToken = (token) => {
  authConfig.headers.Authorization = `Bearer ${token}`;
};

/**
 * Get all blogs
 * @returns {Promise<*>}
 */
const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (e) {
    throw new Error('error' in e.response.data ? e.response.data.error : 'an unknown error occurred');
  }
};

/**
 * Create a new blog
 * @param blog
 * @returns {Promise<*>}
 */
const create = async (blog) => {
  try {
    const response = await axios.post(baseUrl, {
      likes: blog.likes,
      title: blog.title,
      url: blog.url,
    }, authConfig);

    return response.data;
  } catch (e) {
    throw new Error('error' in e.response.data ? e.response.data.error : 'an unknown error occurred');
  }
};

export default { getAll, create, setToken };
