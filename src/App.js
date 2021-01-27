import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, _setUser] = useState(null);
  const [message, setMessage] = useState({ text: '', timeout: 0 });

  /**
   * Set new user
   * @param newUser
   */
  const setUser = (newUser) => {
    if (newUser !== null) {
      blogService.setToken(newUser.token);
    }
    _setUser(newUser);
  };

  /**
   * Displays a message to the user
   * @param text
   */
  const displayMessage = (text) => {
    if (message.timeout) {
      clearTimeout(message.timeout);
    }

    const timeout = setTimeout(() => {
      setMessage({ text: '', timeout: 0 });
    }, 3000);

    setMessage({ text, timeout });
  };

  useEffect(() => {
    const userJson = window.localStorage.getItem('user');
    if (userJson !== null) {
      const storageUser = JSON.parse(userJson);
      setUser(storageUser);
    }
  }, []);

  useEffect(() => {
    try {
      blogService.getAll().then((b) => setBlogs(b));
    } catch (e) {
      displayMessage({
        type: 'error',
        text: e.toString(),
      });
    }
  }, []);

  /**
   * Login
   * @param username
   * @param password
   * @returns {Promise<boolean>}
   */
  const handleLogin = async (username, password) => {
    try {
      const loginUser = await loginService.authenticate(username, password);
      window.localStorage.setItem('user', JSON.stringify(loginUser));
      setUser(loginUser);

      displayMessage({
        type: 'success',
        text: `${loginUser.name} logged in`,
      });

      return true;
    } catch (e) {
      displayMessage({
        type: 'error',
        text: e.toString(),
      });
    }
    return false;
  };

  /**
   * Logout
   */
  const handleLogout = () => {
    displayMessage({
      type: 'success',
      text: `${user.name} logged out`,
    });

    setUser(null);
    window.localStorage.removeItem('user');
  };

  /**
   * On new blog creation submit
   * @param blog
   * @returns {Promise<boolean>}
   */
  const handleNewCreation = async (blog) => {
    try {
      const newBlog = await blogService.create(blog);
      setBlogs([...blogs, newBlog]);

      displayMessage({
        type: 'success',
        text: `a new blog ${blog.title} by ${blog.author} added`,
      });

      return true;
    } catch (e) {
      displayMessage({
        type: 'error',
        text: e.toString(),
      });
    }

    return false;
  };

  if (user === null) {
    return (
      <>
        <Notification message={message.text} />
        <Login onLogin={(username, password) => handleLogin(username, password)} />
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message.text} />
      <div>
        {`${user.name} logged in`}
        &nbsp;
        <input type="button" onClick={() => handleLogout()} value="logout" />
      </div>
      <NewBlog onCreate={(blog) => handleNewCreation(blog)} />
      {blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
