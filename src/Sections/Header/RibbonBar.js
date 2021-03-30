import React from 'react';

import { NavLink, Link } from 'react-router-dom';

import './style.scss';

const RibbonBar = () => {
  return (
    <section className='ribbonBar'>
      <div className='ribbonBar__link'>
        <NavLink to='/'><div>Home</div></NavLink>
      </div>
      <div className='ribbonBar__link'>
        <NavLink to='/game/play'><div>Play</div></NavLink>
        <div className='ribbonBar__nestLink'>
          <div className='ribbonBar__nestLink__link'>
            <Link to='/game/create'><div>New Game</div></Link>
          </div>
          <div className='ribbonBar__nestLink__link'>
            <Link to='/game/join'><div>Join Game</div></Link>
          </div>
        </div>
      </div>
      <div className='ribbonBar__link'>
        <NavLink to='/rules'><div>Rules</div></NavLink>
      </div>
      <div className='ribbonBar__link'>
        <NavLink to='/about'><div>About</div></NavLink>
      </div>
      <div className='ribbonBar__link'>
        <NavLink to='/faq'><div>FAQ</div></NavLink>
      </div>
    </section>
  );
};

export default RibbonBar;
