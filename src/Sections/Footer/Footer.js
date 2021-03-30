import React from 'react';

import './style.scss';

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className='footer'>
      Copyright
      {year}
      Thomas McDevitt, all rights reserved.
    </footer>
  );
};

export default Footer;
