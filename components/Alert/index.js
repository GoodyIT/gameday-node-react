import React from 'react';
import PropTypes from 'prop-types';

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.handleClose = this.handleClose.bind(this);
  }
  
  componentDidMount() {
  
  }
  
  static propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
  };
  
  handleClose() {
    this.setState({
      open: false,
    })
  }

  render() {
    return this.props.children && this.state.open ? (
      <p
        className={`blk ntc ${this.props.type}`}
        data-role="note-toggle"
      >
        <span className={`icn icn-${this.props.type}`} />
        {this.props.children}
        <span
          className="icn icn-delete"
          onClick={this.handleClose}
        />
      </p>
    ) : '';
  }
}

export default Alert;
