import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import utilsCss from '../consys/utils.css';

class NaoEncontrado extends Component {
  render() {
    const { location } = this.props; 
    return (
      <Row type="flex" 
          justify="space-around" 
          align="middle">
        <Col sm={6} 
          xs={20}>
          <Col span={24} 
            className={[utilsCss.mt2, utilsCss.s1, utilsCss.rounded].join(' ')}
            style={{backgroundColor: '#fff'}}>
            <h3>No match for <code>{location.pathname}</code></h3>
          </Col>
        </Col>
      </Row>
    );
  }
}

NaoEncontrado.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};


export default NaoEncontrado;