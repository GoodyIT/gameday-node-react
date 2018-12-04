import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PercentageCircle from '../PercentageCircle';
import PercentageCircleSummary from '../PercentageCircleSummary';
import classnames from 'classnames';
import { getColor } from '../../utils';

import s from './PercentageSection.scss';

const PercentageSection = ({ data, isExpanded }) => {

  const renderPercentages = () => {
    if (data) {
      return Object.keys(data).map(key => {
        const stat = data[key];
        const adjustedValue = Math.abs(Number(stat.percentage)) * 4;
        
        return (
          <div
            className="col-xs-12 col-sm-6 col-md-3"
            key={`percentage-${key}`}
          >
            <div className={classnames(s.label, 'center')}>{stat.label}</div>
            <PercentageCircle
              percent={adjustedValue >= 100 ? 100 : adjustedValue}
              radius={60}
              color={getColor(data, key)}
              borderWidth={20}
            >
              <div className={s.percentage}>{Number(stat.percentage) > 0 ? '+' : ''}{Number(stat.percentage)} %</div>
            </PercentageCircle>
          </div>
        )
      });
    }
  };
  
  const renderPercentagesSummary = () => {
    if (data) {
      const summaryData = {
        passing_yds_total: data.passing_yds_total,
        total_score: data.total_score,
        rushing_yards: data.rushing_yards
      };
      
      return Object.keys(summaryData).map(key => {
        const stat = summaryData[key];
        const adjustedValue = Math.abs(Number(stat.percentage)) * 4;
        return (
          <PercentageCircleSummary
            data={data}
            adjustedValue={adjustedValue}
            index={key}
            stat={stat}
          />
        )
      });
    }
  };

  return (
      <div className={classnames(s.percentageSection, 'row')}>
        {isExpanded ? renderPercentages() : renderPercentagesSummary()}
      </div>
  );
};

PercentageSection.propTypes = {
  data: PropTypes.object,
  isExpanded: PropTypes.bool,
  loading: PropTypes.bool,
};

PercentageSection.defaultProps = {
  data: null,
  isExpanded: false,
  loading: false,
};

export default PercentageSection;
