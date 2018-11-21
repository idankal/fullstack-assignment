import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Component
import Header from './components/header/Header';
import Home from './components/home/Home';
import Footer from './components/footer/Footer';

const App = () => {
  return(
    <Router>
        <div>
            <Header />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route component={Home} />
            </Switch>
            <Footer />
        </div>
    </Router>
  )
};

export default App;
