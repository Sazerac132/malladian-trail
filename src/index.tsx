import React from 'react';
import ReactDOM from 'react-dom';

import App from './Sections/App';
import Fetcher from './Helpers/Fetcher';

(window as any).f = Fetcher;

import './style.scss';

ReactDOM.render(<App />, document.getElementById('app'));
