import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { GameContext } from '../../../Contexts/GameContext';
import Already from './Already';

import './style.scss';

const Join: React.FC = () => {
  const [joinId, setJoinId] = useState<string>('');
  const [joinPw, setJoinPw] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { gameId, joinGame } = useContext(GameContext);

  const clearForm = () => {
    setJoinId('');
    setJoinPw('');
    setError('');
  };

  if (gameId) return <Already />;

  const onSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault();

    if (!joinId) {
      setError('Please enter a game code.');
      return;
    }

    if (!/^\d+$/.test(joinId) || joinId.length !== 6) {
      setError('Please enter a valid game code.');
      return;
    }

    joinGame(joinId, joinPw)
      .then(() => {
        clearForm();
      })
      .catch((err: string) => {
        if (err === '404')
          setError('No game with that ID or password is wrong.');
        else if (err === '429')
          setError(
            'You have tried to join too many games lately. Please wait before trying again.'
          );
        else throw new Error(err);
      });
  };

  return (
    <div className="initiateGame userForm">
      <h2>Join an existing game</h2>
      <div className="initiateGame__note">
        No game yet? You can&nbsp;
        <Link to="/game/create">create</Link>
        &nbsp;a new one.
      </div>
      <form onSubmit={onSubmit} id="initiateGameForm">
        <label htmlFor="initiateGameId">
          <span>Game code</span>
          <input
            type="text"
            id="initiateGameId"
            value={joinId}
            onChange={(ev) => setJoinId(ev.target.value)}
          />
        </label>
        <label htmlFor="initiateGamePw">
          <span>Code word</span>
          <input
            type="text"
            id="initiateGamePw"
            value={joinPw}
            placeholder="Optional"
            onChange={(ev) => setJoinPw(ev.target.value)}
          />
        </label>
      </form>
      <button type="submit" form="initiateGameForm" value="Join">
        Join
      </button>
      {error && <div className="initiateGame__error">{error}</div>}
    </div>
  );
};

export default Join;
