import React from 'react';

import { NavLink } from 'react-router-dom';

import './style.scss';

const RibbonBar = () => {
  return (
    <section className='ribbonBar'>
      <div className='ribbonBar__link'>
        <NavLink to='/'>Home</NavLink>
      </div>
      <div className='ribbonBar__link'>
        Play
        <div className='ribbonBar__nestLink'>
          <div className='ribbonBar__nestLink__link'>
            <NavLink to='/create'>New Game</NavLink>
          </div>
          <div className='ribbonBar__nestLink__link'>
            <NavLink to='/join'>Join Game</NavLink>
          </div>
        </div>
      </div>
      <div className='ribbonBar__link'>
        <NavLink to='/rules'>Rules</NavLink>
      </div>
      <div className='ribbonBar__link'>
        <NavLink to='/about'>About</NavLink>
      </div>
      <div className='ribbonBar__link'>
        <NavLink to='/faq'>FAQ</NavLink>
      </div>
    </section>
  );
};

export default RibbonBar;
