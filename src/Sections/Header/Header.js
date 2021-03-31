import React from 'react';

import RibbonBar from './RibbonBar';

import './style.scss';

const Header = () => {
  return (
    <header className='header'>
      Hello! This is my header.
      <RibbonBar />
    </header>
  );
};

export default Header;
