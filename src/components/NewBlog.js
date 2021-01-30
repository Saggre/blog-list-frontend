import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewBlog = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  return (
    <div>
      <h2>create new</h2>
      <form>
        title:
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        <br />
        author:
        <input type="text" value={author} onChange={(event) => setAuthor(event.target.value)} />
        <br />
        url:
        <input type="text" value={url} onChange={(event) => setUrl(event.target.value)} />
        <br />
        <input
          type="submit"
          value="create"
          onClick={async (event) => {
            event.preventDefault();
            if (await onCreate({ title, author, url })) {
              setTitle('');
              setAuthor('');
              setUrl('');
            }
          }}
        />
      </form>
    </div>
  );
};

NewBlog.propTypes = {
  onCreate: PropTypes.func.isRequired,
};

export default NewBlog;
