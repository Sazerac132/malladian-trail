import React from 'react';

import { NavLink, Link } from 'react-router-dom';

import './style.scss';

const RibbonBar = () => {
  return (
    <section className='ribbonBar'>
      <div className='ribbonBar__link'>
        <NavLink to='/'>Home</NavLink>
      </div>
      <div className='ribbonBar__link'>
        <NavLink to='/game/play'>Play</NavLink>
        <div className='ribbonBar__nestLink'>
          <div className='ribbonBar__nestLink__link'>
            <Link to='/game/create'>New Game</Link>
          </div>
          <div className='ribbonBar__nestLink__link'>
            <Link to='/game/join'>Join Game</Link>
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
