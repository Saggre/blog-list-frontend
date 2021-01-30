import React, { useRef } from 'react';
import Toggleable from './Toggleable';

const Blog = ({ blog, onLike, onRemove }) => {
  const blogRef = useRef();

  return (
    <div className="blog">
      <div>
        {blog.title}
      </div>
      <Toggleable buttonLabel="view" buttonCloseLabel="hide" ref={blogRef}>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          likes&nbsp;
          {blog.likes}
          {' '}
          <button type="button" onClick={() => onLike(blog)}>like</button>
        </div>
        <div>{blog.author}</div>
        <div><button type="button" onClick={() => onRemove(blog)}>remove</button></div>
      </Toggleable>
    </div>
  );
};

export default Blog;
