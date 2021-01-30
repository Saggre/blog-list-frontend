import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h2>Log in to application</h2>
      <form>
        Username
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br />
        Password
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br />
        <input
          type="submit"
          value="Login"
          onClick={async (event) => {
            event.preventDefault();
            if (await onLogin(username, password)) {
              setUsername('');
              setPassword('');
            }
          }}
        />
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
