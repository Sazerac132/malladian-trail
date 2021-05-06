import React, { useState, useContext } from 'react';

import { GameContext } from '../../../../Contexts/GameContext';
import { PlayContext } from '../../../../Contexts/PlayContext';

import './style.scss';
import { Item, LogEntry } from '../../../../types';

const Log = () => {
  const { log, postLogItem, removeLogItem, isGm } = useContext(GameContext);

  const { section } = useContext(PlayContext);

  const [newAction, setNewAction] = useState('');

  const onSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    postLogItem({
      index: 0,
      action: newAction
    });
  };

  const onNewActionInputChange = (ev: React.SyntheticEvent) => {
    setNewAction((ev.target as HTMLInputElement).value);
  };

  let parentClass = 'log';
  if (section === 'log') parentClass += ' log--full';

  return (
    <div className={parentClass}>
      <div className="log__content">
        <div className="log__content--inner">
          {log.map((item, i) => (
            <LogItem
              {...item}
              isGm={isGm}
              key={i}
              deleteCallback={removeLogItem}
            />
          ))}
        </div>
      </div>
      <form onSubmit={onSubmit} id="newEventForm">
        <input
          type="text"
          value={newAction}
          onChange={onNewActionInputChange}
        />
        <button type="submit" form="newEventForm">
          Add
        </button>
      </form>
    </div>
  );
};

type LogItemProps = LogEntry & {
  deleteCallback: (id: number) => void;
  isGm: boolean;
};

function LogItem(props: LogItemProps): React.ReactElement {
  const { char, action, isGm, id, deleteCallback } = props;

  return (
    <div>
      <strong>{char}:</strong> {action}
      {isGm && <button onClick={() => deleteCallback(id)}>delete</button>}
    </div>
  );
}

export default Log;
