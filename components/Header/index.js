import React from 'react';
import PropTypes from 'prop-types';

import s from './Header.css';

class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={s.wrapper}>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
};

Header.defaultProps = {
  user: {},
};

export default Header;
