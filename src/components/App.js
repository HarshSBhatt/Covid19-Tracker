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
import FAQ from './FAQ';

function App() {
  useEffect(() => {
    window.scroll(0, 0)
    ReactGA.initialize('UA-162207556-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])
  return (
    <Router>
      <div className="App">
        <Helmet>
          <meta charSet='UTF-8' />
          <title>COVID19 TRACKER | INDIA</title>
          <meta name='description' content='Novel Coronavirus Tracker' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='author' content='Harsh Bhatt' />
          <meta name="robots" content="INDEX,FOLLOW" />
          <meta name='title' content='covid19app is a web app to track corona cases of different states and cities. You can check all the cases of particular stae or city. It has visualization of some of the information for better understanding of this pandemic.' />
          <meta name='keywords' content='COVID19APP, COVID19, COVID-19, CORONAVIRUS, CORONA VIRUS, PENDAMIC, PANDEMIC, EPIDEMIC, OUTBREAK, CORONA VIRUS OUTBREAK, COVID OUTBREAK, COVID19 OUTBREAK COVID-19 OUTBREAK,covid19app, covid19, covid-19, coronavirus, corona virus, pendamic, pandemic, epidemic, outbreak, corona virus outbreak, covid outbreak, covid19 outbreak covid-19 outbreak' />
          <meta property='og:title' content="India COVID-19 Tracker" />
          <meta property='og:description' content="THE COVID-19 VIRUS AFFECTS DIFFERENT PEOPLE IN DIFFERENT WAYS. COVID-19 IS A RESPIRATORY DISEASE AND MOST INFECTED PEOPLE WILL DEVELOP MILD TO MODERATE SYMPTOMS AND RECOVER WITHOUT REQUIRING SPECIAL TREATMENT. PEOPLE WHO HAVE UNDERLYING MEDICAL CONDITIONS AND THOSE OVER 60 YEARS OLD HAVE A HIGHER RISK OF DEVELOPING SEVERE DISEASE AND DEATH." />
          <meta property='og:image' content={require('../assets/corona.png')} />
          <meta property="og:site_name" content="covid19app is a web app to track corona cases of different states and cities. You can check all the cases of particular stae or city. It has visualization of some of the information for better understanding of this pandemic." />
          <meta property="og:image:height" content="200" />
          <meta property="og:image:width" content="200" />
        </Helmet>
        <Nav />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about-corona' component={CoronaBlog} />
          <Route path='/news' component={News} />
          <Route path='/faq' component={FAQ} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
