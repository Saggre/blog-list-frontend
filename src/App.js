import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import './index.css';
import Toggleable from './components/Toggleable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState({ object: { text: '', type: '' }, timeout: 0 });
  const blogFormRef = useRef();

  /**
   * Displays a message to the user
   * @param messageObject
   */
  const displayMessage = (messageObject) => {
    if (message.timeout) {
      clearTimeout(message.timeout);
    }

    const timeout = setTimeout(() => {
      setMessage({ object: { text: '', type: '' }, timeout: 0 });
    }, 3000);

    setMessage({ object: messageObject, timeout });
  };

  useEffect(() => {
    const userJson = window.localStorage.getItem('user');
    if (userJson !== null) {
      const storageUser = JSON.parse(userJson);
      setUser(storageUser);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((b) => setBlogs(b));
  }, []);

  /**
   * Login
   * @param username
   * @param password
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
    } catch (e) {
      displayMessage({
        type: 'error',
        text: e.toString(),
      });
    }
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
  const handleBlogCreation = async (blog) => {
    blogFormRef.current.toggleVisibility();

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

  /**
   * Add a like to a blog
   * @param blog
   * @returns {Promise<void>}
   */
  const handleBlogLike = async (blog) => {
    try {
      const updatedBlog = await blogService.addLike(blog);
      setBlogs([...blogs.filter((b) => b.id !== updatedBlog.id), updatedBlog]);
      displayMessage({
        type: 'success',
        text: `liked ${blog.title} by ${blog.author}`,
      });
    } catch (e) {
      displayMessage({
        type: 'error',
        text: e.toString(),
      });
    }
  };

  /**
   * Remove a blog
   * @param blog
   * @returns {Promise<void>}
   */
  const handleBlogRemove = async (blog) => {
    try {
      await blogService.remove(blog);
      setBlogs([...blogs.filter((b) => b.id !== blog.id)]);
      displayMessage({
        type: 'success',
        text: `removed ${blog.title} by ${blog.author}`,
      });
    } catch (e) {
      displayMessage({
        type: 'error',
        text: e.toString(),
      });
    }
  };

  if (user === null) {
    return (
      <>
        <Notification text={message.object.text} type={message.object.type} />
        <Login onLogin={(username, password) => handleLogin(username, password)} />
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification text={message.object.text} type={message.object.type} />
      <div>
        {`${user.name} logged in`}
        &nbsp;
        <input type="button" onClick={() => handleLogout()} value="logout" />
      </div>
      <Toggleable buttonLabel="new blog" buttonCloseLabel="close" ref={blogFormRef}>
        <NewBlog onCreate={(blog) => handleBlogCreation(blog)} />
      </Toggleable>
      {blogs.sort((a, b) => {
        if (a.likes === b.likes) {
          return a.author > b.author ? 1 : -1;
        }

        return a.likes < b.likes ? 1 : -1;
      }).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          onLike={(b) => handleBlogLike(b)}
          onRemove={async (b) => {
            if (window.confirm(`Remove blog ${b.title} by ${b.author}`)) {
              await handleBlogRemove(b);
            }
          }}
        />
      ))}
    </div>
  );
};

export default App;
