import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewBlog = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  return (
    <div>
      <h2>create new</h2>
      <form
        className="new-blog new-blog--form"
        onSubmit={async (event) => {
          event.preventDefault();
          if (await onCreate({ title, author, url })) {
            setTitle('');
            setAuthor('');
            setUrl('');
          }
        }}
      >
        title:
        <input
          className="new-blog-input new-blog-input--title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        author:
        <input
          className="new-blog-input new-blog-input--author"
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
        <br />
        url:
        <input
          className="new-blog-input new-blog-input--url"
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <br />
        <input
          className="new-blog-button new-blog-button--create"
          type="submit"
          value="create"
        />
      </form>
    </div>
  );
};

NewBlog.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default NewBlog;
