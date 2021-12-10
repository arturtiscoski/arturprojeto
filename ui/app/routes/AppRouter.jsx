import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import asyncComponent from '../consys/asyncComponent';

const history = createBrowserHistory();

class AppRouter extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <Router history={history} >
        <Switch>
          <Route exact 
            path="/" 
            component={asyncComponent(() => System.import('../painel/Painel'))} />
          <Route 
            path="/painel" 
            component={asyncComponent(() => System.import('../painel/Painel'))} />
          <Route component={asyncComponent(() => System.import('../naoEncontrado/NaoEncontrado'))}/>
        </Switch>
      </Router> 
    );
  }
}

export default AppRouter;
export {history};