/** react.js version
 * a react component to show percentage circle
 **/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './PercentageCircle.scss';

class PercentageCircle extends Component {
  constructor(props) {
    super(props);
    const percent = props.percent;
    let leftTransformerDegree = '0deg';
    let rightTransformerDegree = '0deg';
    if (percent >= 50) {
      rightTransformerDegree = '180deg';
      leftTransformerDegree = (percent - 50) * 3.6 + 'deg';
    } else {
      rightTransformerDegree = percent * 3.6 + 'deg';
      leftTransformerDegree = '0deg';
    }
    this.state = {
      percent,
      borderWidth: this.props.borderWidth < 2 || !this.props.borderWidth ? 2 : this.props.borderWidth,
      leftTransformerDegree: leftTransformerDegree,
      rightTransformerDegree: rightTransformerDegree,
    };
  }
  
  static getDerivedStateFromProps(props, state) {
    if (props.percent !== state.percent) {
  
      const percent = props.percent;
      let leftTransformerDegree = '0deg';
      let rightTransformerDegree = '0deg';
      if (percent >= 50) {
        rightTransformerDegree = '180deg';
        leftTransformerDegree = (percent - 50) * 3.6 + 'deg';
      } else {
        rightTransformerDegree = percent * 3.6 + 'deg';
        leftTransformerDegree = '0deg';
      }
      return {
        percent: props.percent,
        borderWidth: props.borderWidth < 2 || !props.borderWidth ? 2 : props.borderWidth,
        leftTransformerDegree: leftTransformerDegree,
        rightTransformerDegree: rightTransformerDegree,
      }
    }
    return null;
  }

  render() {
    return (
      <div
        className={styles.circle}
        style={{
          width: this.props.radius * 2,
          height: this.props.radius * 2,
          borderRadius: this.props.radius,
          backgroundColor: this.props.bgcolor,
        }}
      >
        <div
          className={styles.leftWrap}
          style={{
            width: this.props.radius,
            height: this.props.radius * 2,
            left: 0,
          }}
        >
          <div
            className={styles.loader}
            id="id1"
            style={{
              left: this.props.radius,
              width: this.props.radius,
              height: this.props.radius * 2,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              backgroundColor: this.props.color,
              transform: 'rotate(' + this.state.leftTransformerDegree + ')',
            }}
          />
        </div>
        <div
          className={styles.rightWrap}
          style={{
            width: this.props.radius,
            height: this.props.radius * 2,
            left: this.props.radius,
          }}
        >
          <div
            className={styles.loader2}
            id="id2"
            style={{
              left: -this.props.radius,
              width: this.props.radius,
              height: this.props.radius * 2,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              backgroundColor: this.props.color,
              transform: 'rotate(' + this.state.rightTransformerDegree + ')',
            }}
          />
        </div>
        <div
          className={styles.innerCircle}
          style={{
            left: this.props.borderWidth,
            top: this.props.borderWidth,
            width: (this.props.radius - this.props.borderWidth) * 2,
            height: (this.props.radius - this.props.borderWidth) * 2,
            borderRadius: this.props.radius - this.props.borderWidth,
            backgroundColor: this.props.innerColor,
          }}
        >
          {this.props.children ? this.props.children : <span className={'text ' + this.props.textStyle}>{this.props.percent}%</span>}
        </div>
      </div>
    );
  }
}

PercentageCircle.propTypes = {
  color: PropTypes.string,
  bgcolor: PropTypes.string,
  innerColor: PropTypes.string,
  radius: PropTypes.number,
  percent: PropTypes.number,
  borderWidth: PropTypes.number,
  textStyle: PropTypes.string,
};

PercentageCircle.defaultProps = {
  color: '#000',
  radius: 20,
  percent: 0,
  borderWidth: 2,
  bgcolor: '#e3e3e3',
  innerColor: '#fff',
  disabled: false,
  textStyle: '',
};

export default PercentageCircle;