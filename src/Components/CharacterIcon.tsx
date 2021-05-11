import clsx from 'clsx';
import React from 'react';

import './style.scss';

interface IconProps {
  index: number;
  flavour?: 'small' | 'normal' | 'large';
  noPlaceholder?: boolean;
  className?: string;
}

const CharacterIcon: React.FC<IconProps> = (props: IconProps) => {
  const { index, flavour, noPlaceholder, className } = props;
  const portraitClassName = clsx(
    'portrait',
    index === -1 && 'portrait--none',
    index > -1 && `portrait-${index}`,
    flavour === 'small' && 'portrait--small',
    noPlaceholder && index === -1 && 'portrait--noPlaceholder',
    className
  );
  return <div className={portraitClassName} />;
};

CharacterIcon.defaultProps = {
  flavour: 'normal'
};

export default CharacterIcon;
