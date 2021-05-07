import React from 'react';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { NumCharacters, SystemStore } from '../../../../types';
import { setNumberOfCharacters } from '../../../../Store/CharacterSlice';

const HowManyPlayers = () => {
  const dispatch = useDispatch();
  const numCharacters = useSelector(
    (store: SystemStore) => store.characters.numCharacters
  );
  const setNumCharacters = (num: NumCharacters) => {
    dispatch(setNumberOfCharacters({ quantity: num }));
  };

  const buttons = ([1, 2] as NumCharacters[]).map((n) => {
    return (
      <button
        type="button"
        onClick={() => setNumCharacters(n)}
        className={n === numCharacters ? 'highlight' : ''}
        key={`howManyPlayersButton-${n}`}
      >
        {n}
      </button>
    );
  });

  return (
    <div className="howMany">
      <div>How many people are playing on this device?</div>
      <div className="howMany__switch">{buttons}</div>
    </div>
  );
};

export default HowManyPlayers;
