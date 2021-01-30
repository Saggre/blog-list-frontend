import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Toggleable from './Toggleable';

const Blog = ({ blog, onLike, onRemove }) => {
  const blogRef = useRef();

  return (
    <div className="blog">
      <div className="blog-title">{blog.title}</div>
      <Toggleable buttonLabel="view" buttonCloseLabel="hide" ref={blogRef}>
        <div className="blog-url-container">
          <a href={blog.url}><span className="blog-url">{blog.url}</span></a>
        </div>
        <div className="blog-likes-container">
          likes&nbsp;
          <span className="blog-likes">{blog.likes}</span>
          {' '}
          <button type="button" onClick={() => onLike(blog)}>like</button>
        </div>
        <div className="blog-author">{blog.author}</div>
        <div><button type="button" onClick={() => onRemove(blog)}>remove</button></div>
      </Toggleable>
    </div>
  );
};

Blog.propTypes = {
  // TODO create blog model
  // eslint-disable-next-line react/forbid-prop-types
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Blog;
