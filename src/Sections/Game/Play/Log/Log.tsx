import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useLog from '../../../../Hooks/useLog';
import { LogEntry, SystemStore } from '../../../../types';

import './style.scss';

const Log = () => {
  const isGm = useSelector((store: SystemStore) => store.game.data.isGm);
  const { journal, addJournalItem, removeJournalItem } = useLog();

  const section = useSelector((store: SystemStore) => store.navigation.section);

  const [newAction, setNewAction] = useState('');

  const onSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    addJournalItem({
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
          {journal.map((item) => (
            <LogItem
              {...item}
              isGm={isGm}
              key={item.id}
              deleteCallback={removeJournalItem}
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
