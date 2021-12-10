import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

class NotFound extends Component {
  render() {
    const { location, history } = this.props; 
    return (
      <div style={{
				backgroundColor: '#fff',
				fontSize: '3em',
				textAlign: 'center',
				zIndex: 99999,
				position: 'absolute',
				bottom: 0,
				top: 0,
				left: 0,
				right: 0,
				padding: '2em 0'
			}}>
        <h5>
          A página
          <br/>
          <small>{location.pathname}</small>
          <br/>
          não foi encontrada
          <br/>
          <a onClick={() => history.goBack()}>clique aqui para voltar ao início</a>
        </h5>
      </div>
    );
  }
}

NotFound.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
};


const NotFoundRouter = withRouter(NotFound);
export default NotFoundRouter;