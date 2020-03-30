import React from 'react';
import '../styles/App.scss';
import Home from './Home'
import Donate from './Donate'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="Navbar">
          <div className="logo" />
          <Link exact to='/'>Home</Link>
          <Link to='/donate'>Donate</Link>
        </header>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/donate' exact component={Donate} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
