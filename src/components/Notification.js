import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ message }) => {
  if (!message) {
    return <div />;
  }

  return <div className={`notification notification--${message.type}`}>{message.text}</div>;
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
