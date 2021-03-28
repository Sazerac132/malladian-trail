import React from 'react';

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

import Home from '../Home';
import About from '../About';
import Rules from '../Rules';

import './style.scss';

const App = () => {
  return (
    <div className='wrapper'>
      <Router>
        <Header />
        <div className='bodyWrapper'>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/create' component={Home} />
            <Route path='/join' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/rules' component={Rules} />
            <Route path='/faq' component={Home} />
            <Route path='*'>
              <Redirect to='/' />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
