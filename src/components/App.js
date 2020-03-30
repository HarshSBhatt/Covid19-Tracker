import React, { useEffect } from 'react';
import '../styles/App.scss';
import Home from './Home'
import Donate from './Donate'
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ReactGA from 'react-ga';
import PageNotFound from './PageNotFound';

function App() {
  useEffect(() => {
    ReactGA.initialize('UA-162207556-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])
  return (
    <Router>
      <div className="App">
        <header className="Navbar">
          <div className="logo">
            <img src={require('../assets/corona.svg')} alt='Wait' />
          </div>
          <div className='link'>
            <Link exact='true' to='/' className='l1'>Home</Link>
            <a href='https://www.buymeacoffee.com/covid19app' className='l2'><img src="https://cdn.buymeacoffee.com/buttons/lato-orange.png" alt="Buy Me A Coffee" style={{ height: 51, width: 217 }} /></a>
            {/* <a href="https://www.buymeacoffee.com/covid19app" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/lato-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a> */}
          </div>
        </header>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/donate' exact component={Donate} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
