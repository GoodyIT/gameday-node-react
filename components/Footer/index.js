import React from 'react';
import classnames from 'classnames';
import s from './Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer className={classnames(s.footer, 'center py3')}>Powered by WeatherBell Analytics</footer>
    );
  }
}

export default Footer;
