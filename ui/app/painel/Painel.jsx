import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from '../menu/Menu';
import NotFound from '../consys/NotFound';
import PropTypes from 'prop-types';
import { urlClientes } from '../clientes/Clientes';
import ClientesList from '../clientes/ClientesList';
import Footer from '../footer/Footer';

class Painel extends Component {
  render() {
    const { match } = this.props;
    const { url } = match;
    return (
      <div>
        <Menu match={match}/> 
        <Switch>
          <Route exact 
            path={`${url}`} 
            component={ClientesList} />
          {/* <Route path={urlPropostas} 
            component={Propostas} /> */}
          <Route exact 
            path={urlClientes} 
            component={ClientesList} />
          {/* <Route exact 
            path={urlPreClientes} 
            component={ClientesList} /> */}
          <Route component={NotFound}/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

Painel.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }),
};

export default Painel;