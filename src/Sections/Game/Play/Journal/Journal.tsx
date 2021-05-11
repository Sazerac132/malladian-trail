import clsx from 'clsx';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import useLog from '../../../../Hooks/useLog';
import JournalCharSelector from './JournalCharSelector';

import { CharIndex, LogEntry, SystemStore } from '../../../../types';

import './style.scss';

const Journal = () => {
  const isGm = useSelector((store: SystemStore) => store.game.data.isGm);
  const section = useSelector((store: SystemStore) => store.navigation.section);
  const characters = useSelector(
    (store: SystemStore) => store.characters.characters
  );
  const [activeChar, setActiveChar] = useState<CharIndex>(0);
  const { journal, addJournalItem, removeJournalItem } = useLog();

  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(({ action }) => {
    addJournalItem({
      charId: characters[activeChar].id,
      action
    });
  });

  const parentClass = clsx('log', section === 'log' && 'log--full');
  const journalShow = section === 'log' ? journal : journal.slice(-2);

  return (
    <div className={parentClass}>
      <div className="log__content">
        <div className="log__content--inner">
          {journalShow.map((item) => (
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
        <input type="text" {...register('action')} />
        <button type="submit" form="newEventForm">
          Add
        </button>
      </form>
      <JournalCharSelector
        activeJournalChar={activeChar}
        setActiveJournalChar={setActiveChar}
      />
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

export default Journal;
