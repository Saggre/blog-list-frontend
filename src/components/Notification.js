import React from 'react';

const Notification = ({ text, type }) => {
  if (!text) {
    return <div />;
  }

  return <div className={`notification notification--${type || 'success'}`}>{text}</div>;
};

export default Notification;
