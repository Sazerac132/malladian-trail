import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { GameContext } from '../../../Contexts/GameContext';
import Already from './Already';

import './style.scss';

const confirmCreate = () => {
  /* eslint-disable-next-line no-alert, no-restricted-globals */
  return confirm('That looks like a game ID. Are you sure you '
    + 'don\'t mean to join instead?');
};

const Start = () => {
  const [gameName, setGameName] = useState('');
  const [gamePw, setGamePw] = useState('');
  const [error, setError] = useState('');
  const { gameId, createGame, saveGamePw } = useContext(GameContext);

  const clearForm = () => {
    setGameName('');
    setGamePw('');
    setError('');
  };

  if (gameId) return <Already />;

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (!gameName) {
      setError('Please enter a game code.');
      return;
    }

    if (!/^[a-zA-Z0-9\s]+$/.test(gameName)
      || gameName.length < 4
      || gameName.length > 40) {
      setError('Game name must be alphanumeric characters and between 4-40 characters.');
      return;
    }

    if (gamePw.length > 0 && (
      gamePw.length < 4
        || gamePw.length > 24
    )) {
      setError('Code word must be between 4-24 characters.');
      return;
    }

    if (/^[0-9]{6}$/.test(gameName) && !confirmCreate()) {
      return;
    }

    createGame(gameName, gamePw)
      .then(() => {
        clearForm();
        saveGamePw(gamePw);
      })
      .catch((err) => {
        if (err === 429) setError('You can only create a game every 15 minutes.');
        else throw new Error(err);
      });
  };

  return (
    <div className='initiateGame userForm'>
      <h2>Create a new game</h2>
      <div className='initiateGame__note'>
        Someone already created a game? You can&nbsp;
        <Link to='/game/join'>join</Link>
        &nbsp;it here.
      </div>
      <form onSubmit={onSubmit} id='initiateGameForm'>
        <label htmlFor='initiateGameName'>
          <span>Game name</span>
          <input
            type='text'
            id='initiateGameName'
            value={gameName}
            onChange={(ev) => setGameName(ev.target.value)}
          />
        </label>
        <label htmlFor='initiateGamePw'>
          <span>Code word*</span>
          <input
            type='text'
            id='initiateGamePw'
            value={gamePw}
            placeholder='Optional'
            onChange={(ev) => setGamePw(ev.target.value)}
          />
        </label>
      </form>
      <div className='initiateGame__note--small'>
        * - Code word is optional. Do NOT use your master password. This is a minor
        deterrent and is NOT handled securely.
      </div>
      <button type='submit' form='initiateGameForm' value='Create'>Create</button>
      {error && (
        <div className='initiateGame__error'>{error}</div>
      )}
    </div>
  );
};

export default Start;
