import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import s from './Loader.scss';

const Loader = ({ text }) => {
  return (
    <div className={s.loader}>
      <div className={classnames('icn-baseball', s.icon)} />
      <div className={s.text}>{text}</div>
    </div>
  );
};

Loader.propTypes = {
  text: PropTypes.string,
};

Loader.defaultProps = {
  text: 'Loading...',
};

export default Loader;
