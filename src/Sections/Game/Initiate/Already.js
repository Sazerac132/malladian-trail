import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { GameContext } from '../../../Contexts/GameContext';

const Already = () => {
  const {
    gameId,
    gameName,
    leaveGame,
    isGm,
    gamePw
  } = useContext(GameContext);

  const triggerLeave = (ev) => {
    ev.preventDefault();
    leaveGame();
  };

  return (
    <div className='already'>
      <h2>
        Currently playing&nbsp;
        {gameName}
        .
      </h2>
      {isGm && (
        <div>
          You are the GM. Pass this to other people so they can join.
          <ul>
            <li>Game ID: <strong>{gameId}</strong></li>
            {gamePw && <li>Codeword: <strong>{gamePw}</strong></li>}
          </ul>
        </div>
      )}
      <div>
        You can&nbsp;
        <Link to='/game/play'>
          <button type='button'>continue</button>
        </Link>
        &nbsp;to play the game.
      </div>
      <div className='already__note'>
        Alternatively, you can&nbsp;
        <button
          onClick={triggerLeave}
          type='button'
        >
          leave
        </button>
        &nbsp;to create or join another.
      </div>
    </div>
  );
};

export default Already;
