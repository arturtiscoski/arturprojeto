import React, { Component } from 'react';
import { Row, Col } from 'antd';
import menuCss from './menu.css';
import MenuItem from './MenuItem';
import {urlClientes} from '../clientes/Clientes';
import utilsCss from '../consys/utils.css';

class _Menu extends Component {
  constructor() {
    super();
    this.state = {
      current: 'geral',
      mostraConfirmaSair: false,
    };
    this.confirmaSair = this.confirmaSair.bind(this);
  }
  confirmaSair() {
    this.setState({user: false});
  }
  render() {
    return (
      <Row className={menuCss.menuBackground}>
        <Row type="flex" 
          justify="space-around" 
          align="middle"
          className={utilsCss.mt2}>
          <Col md={12}
            xs={24}>
            <Col span={12}>
              <MenuItem url={urlClientes}                 
                icon="user">Clientes</MenuItem>
            </Col>
            <Col span={12}>
              <MenuItem onClick={this.confirmaSair}
                icon="poweroff">Usuários</MenuItem>
            </Col>
          </Col>
        </Row>
      </Row>
    );
  }
}

export default _Menu;