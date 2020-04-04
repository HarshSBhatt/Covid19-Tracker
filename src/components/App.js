import React, { useEffect } from 'react';
import '../styles/App.scss';
import Home from './Home'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ReactGA from 'react-ga';
import PageNotFound from './PageNotFound';
import { Helmet } from 'react-helmet'
import Nav from './Nav';
import CoronaBlog from './CoronaBlog';
import News from './news/News';

function App() {
  // useEffect(() => {
  //   window.scroll(0, 0)
  //   ReactGA.initialize('UA-162207556-1');
  //   ReactGA.pageview(window.location.pathname + window.location.search);
  // }, [])
  return (
    <Router>
      <div className="App">
        <Helmet>
          <meta charSet='UTF-8' />
          <title>COVID19 TRACKER | INDIA</title>
          <meta name='description' content='Novel Coronavirus Tracker' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Helmet>
        <Nav />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about-corona' component={CoronaBlog} />
          <Route path='/news' component={News} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
