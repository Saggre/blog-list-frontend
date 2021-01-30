import React, { useRef } from 'react';
import Toggleable from './Toggleable';

const Blog = ({ blog }) => {
  const blogRef = useRef();

  return (
    <div className="blog">
      <div>
        {blog.title}
      </div>
      <Toggleable buttonLabel="view" buttonCloseLabel="hide" ref={blogRef}>
        <div>{blog.url}</div>
        <div>
          likes&nbsp;
          {blog.likes}
          {' '}
          <button type="button" onClick={() => {}}>like</button>
        </div>
        <div>{blog.author}</div>
      </Toggleable>
    </div>
  );
};

export default Blog;
