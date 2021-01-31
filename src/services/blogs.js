import axios from 'axios';

const baseUrl = '/api/blogs';

const getAuthConfig = () => ({
  headers: { Authorization: `bearer ${JSON.parse(localStorage.getItem('user')).token}` },
});

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
      author: blog.author,
    }, getAuthConfig());

    return response.data;
  } catch (e) {
    throw new Error('error' in e.response.data ? e.response.data.error : 'an unknown error occurred');
  }
};

/**
 * Add a like to a blog
 * @param blog
 * @returns {Promise<any>}
 */
const addLike = async (blog) => {
  try {
    const response = await axios.put(`${baseUrl}/${blog.id}`, {
      likes: blog.likes + 1,
    }, getAuthConfig());

    return response.data;
  } catch (e) {
    throw new Error('error' in e.response.data ? e.response.data.error : 'an unknown error occurred');
  }
};

/**
 * Remove a blog
 * @param blog
 * @returns {Promise<any>}
 */
const remove = async (blog) => {
  try {
    const response = await axios.delete(`${baseUrl}/${blog.id}`, getAuthConfig());

    return response.data;
  } catch (e) {
    throw new Error('error' in e.response.data ? e.response.data.error : 'an unknown error occurred');
  }
};

export default {
  getAll, create, addLike, remove,
};
