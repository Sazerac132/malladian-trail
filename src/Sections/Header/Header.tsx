import React from 'react';

import RibbonBar from './RibbonBar';

import './style.scss';

const Header: React.FC = () => {
  return (
    <header className='header'>
      <RibbonBar />
    </header>
  );
};

export default Header;
