import React, { Component } from 'react';
import utilsCss from '../consys/utils.css';
import {Row, Input, Form, Col, Button} from 'antd';
import ReactTimeout from 'react-timeout';
import Clientes from './Clientes';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import ClienteDetalhes from './ClienteDetalhes';

const FormItem = Form.Item;

class ClientesList extends Component {
  constructor() {
    super();
    this.state = {filtro: ''};
    this.alteraFiltro = this.alteraFiltro.bind(this);
  }
  
  alteraFiltro(value) {
    const filtro = value;
    if (this.searchBounce) {
      this.props.clearTimeout(this.searchBounce);
    }
    this.searchBounce = this.props.setTimeout(() => {
      this.setState({filtro});
    }, 300);
  }

  render() {
    const {filtro} = this.state;
    return (
      <Row className={utilsCss.p2}>
        <Row style={{background: '#fff'}}
          type="flex" 
          align="middle"
          gutter={12}
          className={[
            utilsCss.border, 
            utilsCss.rounded,
            utilsCss.p2,
            utilsCss.mt1
          ].join(' ')}>
          <Col lg={6}
            md={6}
            sm={24}
            xs={24} >
            <FormItem label="Pesquisar">
              <Input onChange={({target: {value}}) => this.alteraFiltro(value)}/>
            </FormItem>
          </Col>
          <Col lg={18}
            md={18}
            sm={24}
            xs={24}>
            <ClienteDetalhes onClose={() => this.setState({filtro: undefined})}>
              <Button className={utilsCss.right} 
                type='primary'>Cadastro de Cliente</Button>
            </ClienteDetalhes>
          </Col>
          <Col span={24}>
            <Clientes filtro={filtro}/>
          </Col>
        </Row>
      </Row>
    );
  }
}

ClientesList.propTypes = {
  setTimeout: PropTypes.func.isRequired,
  clearTimeout: PropTypes.func.isRequired,
  match: PropTypes.object,
  history: PropTypes.object
}

const ClientesListTimeout = ReactTimeout(ClientesList);
const ClienteListRouter = withRouter(ClientesListTimeout);
export default ClienteListRouter;