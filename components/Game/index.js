import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Collapse} from 'react-collapse';
import PercentageSection from '../PercentageSection';
import get from 'lodash/get';
import s from './Game.scss';

class Game extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      isExpanded: false,
      isOpen: true
    };
    
    this.toggleExpand = this.toggleExpand.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
  }
  
  toggleExpand() {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }
  
  toggleOpen() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  renderWeatherIcon() {
    let condition = 'sunny';
    let color = 'yellow';

    const precip = get(this.props, 'data.precip', 0);
    
    if (precip >= 10 && precip < 20) {
      condition = 'cloudy';
      color = '';
    }
    else if (precip >= 20 && precip < 60) {
      condition = 'rainy';
      color = '';
    }
    else if (precip >= 60) {
      condition = 'stormy';
      color = 'red';
    }
    return <span className={`display icn-${condition} ${color}`}></span>
  }

  renderWindDirection() {
    const { data } = this.props;
    const windDirection = get(data, 'windDirection', '');
    const windSpeed = get(data, 'windSpeed', '');
    const size = windSpeed > 10 ? '-lrg' : '';
    // return <span className={`display icn-wind-${windDirection}${size}`}></span>
    return <span class="display" style={{ height: '47px'}}></span>
  }

  render() {
    const { data } = this.props;
    return data && (
      <div className={classnames('blk forecast-cards', s.game)}>
        <div className="blk crd mb0">
          <header className="hdr">
            <a className="icn"
             onClick={this.toggleOpen}
            >
              <span className={this.state.isOpen ? 'icn-arw-up' : 'icn-arw-down'} aria-hidden="true" />
            </a>
            <div className="teams">
              <span className={`team-name nfl ${data.away_short.toLowerCase()}`}>
                <span className="lng">{data.away_location}</span>
                <span class="shrt">{data.away_short}</span>
                <span className="mascot">{data.away_mascot}</span>
              </span>
              <span className={`team-name nfl ${data.home_short.toLowerCase()}`}>
                <span className="lng">{data.home_location}</span>
                <span class="shrt">{data.home_short}</span>
                <span className="mascot">{data.home_mascot}</span>
              </span>
            </div>
          
            <span className="meta">
              <span className="time">
                {/*<span>1:10 PM ET</span> at Great American Ball Park*/}
                <span>{data.date} ET</span>&nbsp;AT&nbsp; {data.stadium}
              </span>
              <span className="overunder">
                {/*<span>9.5</span> o/u*/}
              </span>
            </span>
          </header>
          <Collapse isOpened={this.state.isOpen} pringConfig={{stiffness: 150, damping: 15}}>
            {data.roof === 'open' ? (
              <div>
                <div className="blk forecast" style={{display: 'block'}}>
                  <div className="grad"></div>
                  <div className="blk current-forecast">
                    <div>
                      {this.renderWeatherIcon()}
                      <span className="display">
                        <span className="value">{data.temp}</span>
                        <span className="label">Temp</span>
                      </span>
                      <span className="display">
                        <span className="value">{data.dew_point}</span>
                        <span className="label">Dewpoint °F</span>
                      </span>
                    </div>
                    <div className='mb-2'>
                      {this.renderWindDirection()}
                      <span className="display">
                        <span className="value">{data.windDirection}</span>
                        <span className="label">Dir</span>
                      </span>
                      <span className="display">
                        <span className="value">{data.windSpeed}</span>
                        <span className="label">mph</span>
                      </span>
                    </div>
                    {/* {data.temp > 85 && <span className={classnames(s.fire, 'center block icn-fire')} />}
                    {data.windSpeed > 15 && <span className={classnames(s.wind, 'center block icn-wind')} />} */}
                  </div>
                  <div className="table forecast">
                    <PercentageSection data={data.stats} isExpanded={this.state.isExpanded}/>
                    <div className={classnames(s.count, 'center mb1')}>Based on {data.count} games matching current conditions</div>
                  </div>
                </div>
                <div className={classnames(s.expandToggleWrapper, 'center')}>
                  <span
                    className={classnames(s.expandToggle, this.state.isExpanded ? 'icn-arw-up' : 'icn-arw-down')}
                    onClick={this.toggleExpand}
                  />
                </div>
              </div>
            ) : (
              <div className='center py2'><h4>This game is played in a dome.</h4></div>
            )}
          </Collapse>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};

Game.defaultProps = {
  data: null,
  loading: false,
};

export default Game;
