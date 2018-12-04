import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Game from '../Game';
import classnames from 'classnames';

import s from './Games.scss';

const Games = ({ games }) => {

  const renderGameSection = () => {
    return games.map((game, key) => {
      return (
        <Game key={`game-${key}`} data={game}/>
      );
    });
  };

  return (
      <div className={s.games}>
        {renderGameSection()}
      </div>
  );
};

Games.propTypes = {
  games: PropTypes.array,
  loading: PropTypes.bool,
};

Games.defaultProps = {
  games: [],
  loading: false,
};

export default Games;
