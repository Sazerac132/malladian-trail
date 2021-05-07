import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Already from './Already';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { createGameThunk } from '../../../Store/GameSlice';
import { SystemStore } from '../../../types';

const confirmCreate = () => {
  /* eslint-disable-next-line no-alert, no-restricted-globals */
  return confirm(
    "That looks like a game ID. Are you sure you don't mean to join instead?"
  );
};

const Start = () => {
  const [gameName, setGameName] = useState<string>('');
  const [gamePw, setGamePw] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();
  const isInGame = useSelector((store: SystemStore) => store.game.isInGame);

  const clearForm = () => {
    setGameName('');
    setGamePw('');
    setError('');
  };

  if (isInGame) return <Already />;

  const onSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault();

    if (!gameName) {
      setError('Please enter a game code.');
      return;
    }

    if (
      !/^[a-zA-Z0-9\s]+$/.test(gameName) ||
      gameName.length < 4 ||
      gameName.length > 40
    ) {
      setError(
        'Game name must be alphanumeric characters and between 4-40 characters.'
      );
      return;
    }

    if (gamePw.length > 0 && (gamePw.length < 4 || gamePw.length > 24)) {
      setError('Code word must be between 4-24 characters.');
      return;
    }

    if (/^[0-9]{6}$/.test(gameName) && !confirmCreate()) {
      return;
    }

    dispatch(
      createGameThunk({
        name: gameName,
        codeword: gamePw
      })
    );
  };

  return (
    <div className="initiateGame userForm">
      <h2>Create a new game</h2>
      <div className="initiateGame__note">
        Someone already created a game? You can&nbsp;
        <Link to="/game/join">join</Link>
        &nbsp;it here.
      </div>
      <form onSubmit={onSubmit} id="initiateGameForm">
        <label htmlFor="initiateGameName">
          <span>Game name</span>
          <input
            type="text"
            id="initiateGameName"
            value={gameName}
            onChange={(ev) => setGameName(ev.target.value)}
          />
        </label>
        <label htmlFor="initiateGamePw">
          <span>Code word*</span>
          <input
            type="text"
            id="initiateGamePw"
            value={gamePw}
            placeholder="Optional"
            onChange={(ev) => setGamePw(ev.target.value)}
          />
        </label>
      </form>
      <div className="initiateGame__note--small">
        &#42; - Code word is optional. Do NOT use your master password. This is
        a minor deterrent and is NOT handled securely.
      </div>
      <button type="submit" form="initiateGameForm" value="Create">
        Create
      </button>
      {error && <div className="initiateGame__error">{error}</div>}
    </div>
  );
};

export default Start;
