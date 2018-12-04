import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import PercentageCircle from '../PercentageCircle';
import s from './PercentageCircleSummary.scss';
import { getColor } from "../../utils";

class PercentageCircleSummary extends Component {
  
  render() {
    const { data, adjustedValue, stat, index } = this.props;
    return (
      <div
        className={classnames(s.wrapper, 'col-xs-12 col-md-4')}
        key={`percentage-${index}`}
      >
        <PercentageCircle
          percent={adjustedValue >= 100 ? 100 : adjustedValue}
          radius={100}
          color={getColor(data, index)}
          borderWidth={20}
        >
          <div className={s.percentage}>{Number(stat.percentage) > 0 ? '+' : ''}{Number(stat.percentage)} %</div>
        </PercentageCircle>
        <div className={s.label}>
          <div className={classnames(s.label, 'center')}>{stat.label}</div>
          <div className={classnames(s.icon, `icn-${stat.icon}`, 'block center mt2')} />
        </div>
      </div>
    )
  }
}

PercentageCircleSummary.propTypes = {
  data: PropTypes.object,
  index: PropTypes.string,
};

PercentageCircleSummary.defaultProps = {
  data: {},
  index: ''
};

export default PercentageCircleSummary;