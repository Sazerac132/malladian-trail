import React from 'react';

import './style.scss';

const year = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      Copyright&nbsp;
      {year}
      &nbsp;Thomas McDevitt, all rights reserved.
    </footer>
  );
};

export default Footer;
