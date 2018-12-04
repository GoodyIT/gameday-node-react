import React from 'react';
import PropTypes from 'prop-types';

import 'flexboxgrid/css/flexboxgrid.min.css';
import 'basscss/css/basscss-important.min.css';
import 'react-vis/dist/style.css';
import '../../styles/main.scss';

import Header from '../Header';
import Footer from '../Footer';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div>
        <Header />
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Layout;
