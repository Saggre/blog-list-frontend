import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h2>Log in to application</h2>
      <form
        className="login-form"
        onSubmit={(event) => {
          event.preventDefault();
          onLogin(username, password);
          setUsername('');
          setPassword('');
        }}
      >
        Username
        <input
          type="text"
          autoComplete="username"
          className="login-form-input login-form-input--username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        Password
        <input
          type="password"
          className="login-form-input login-form-input--password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <input
          type="submit"
          className="login-form-input login-form-input--submit"
          value="Login"
        />
      </form>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
