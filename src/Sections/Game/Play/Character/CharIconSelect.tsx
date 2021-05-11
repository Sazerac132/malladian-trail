import React from 'react';

import CharacterIcon from '../../../../Components/CharacterIcon';

interface CharIconSelectProps {
  onChange: (value: number) => void;
  value: number;
  inputRef: React.Ref<any>;
  cancel: () => void;
}

const iconArray: number[] = [];
for (let i = -1; i < 18; i++) {
  iconArray.push(i);
}

const CharIconSelect: React.FC<CharIconSelectProps> = (
  props: CharIconSelectProps
) => {
  const { onChange, value, cancel } = props;

  return (
    <div className="charIconSelect__wrapper">
      <div className="charIconSelect">
        {iconArray.map((i) => (
          <label
            className="charIconSelect__portrait"
            key={i}
            onClick={() => {
              if (value === i) cancel();
            }}
          >
            <CharacterIcon index={i} flavour="small" />
            <input
              type="radio"
              value={i}
              checked={i === value}
              onChange={() => {
                onChange(i);
                cancel();
              }}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default CharIconSelect;
