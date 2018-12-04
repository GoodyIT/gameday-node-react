import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PercentageCircle from '../PercentageCircle';
import classnames from 'classnames';
import { getColor } from '../../utils';

import s from './PercentageHeader.scss';

const PercentageHeader = ({ data }) => {
  
  const renderPercentages = () => {
    if (data) {
      return Object.keys(data).map(key => {
        const stat = data[key];
        const adjustedValue = Math.abs(Number(stat.percentage)) * 4;
        
        return (
          <div
            className="col-xs-12 col-sm-4"
            key={`percentage-${key}`}
          >
            <PercentageCircle
              percent={adjustedValue >= 100 ? 100 : adjustedValue}
              radius={100}
              color={getColor(data, key)}
              borderWidth={20}
            >
              <div className={s.percentage}>{Number(stat.percentage) > 0 ? '+' : ''}{Number(stat.percentage)} %</div>
            </PercentageCircle>
            <div className={classnames(s.label, 'center')}>{stat.label}</div>
            <div className={classnames(s.icon, `icn-${stat.icon}`, 'center', 'mt2')} />
          </div>
        )
      });
    }
  };

  return (
      <div className={classnames(s.percentageHeader, 'row')}>
        {renderPercentages()}
      </div>
  );
};

PercentageHeader.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};

PercentageHeader.defaultProps = {
  data: null,
  loading: false,
};

export default PercentageHeader;
