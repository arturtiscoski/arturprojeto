import React, { Component } from 'react';
import PropTypes from 'prop-types';
import utilsCss from '../consys/utils.css';
import {Row, notification} from 'antd';
import Loading from '../consys/Loading';
import http from '../consys/http';
import ClienteItem from './ClienteItem';

const urlClientes = '/painel/clientes';
class Clientes extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
      pagination: {pagina: 1, size: 10}
    };
    this.fetch = this.fetch.bind(this);
    this.handleChangePagination = this.handleChangePagination.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const {filtro} = this.props;
    if (nextProps.filtro !== filtro) {
      this.setState({descricao: nextProps.filtro}, () => this.fetch())
    }
    return true
  }

  handleChangePagination(page){
    this.fetch({pagina: page});
  }

  fetch(params = {pagina: 1}) {
    const {descricao} = this.state
    this.setState({ loading: true });

    params = {
      ...params,
      descricao: descricao || ''
    }

    http('/clientes/consulta', {
      method: 'GET',
      params
    }).then((data) => {
      this.setState({
        loading: false,
        data
      });
    }).catch((data) => {
      notification.error({
        message: 'Erro!',
        description: data.message,
      });
    });
  }

  componentDidMount() {
    this.setState({loading: false});
    this.fetch();
  }

  render() {
    const { data, loading } = this.state;
    const that = this;
    let clientes = null;

    if (!data || !data.length){
      clientes = 
        <Row style={{ width: '100%' }}
          className={utilsCss.p4}>
          <div className={[utilsCss.center, utilsCss.h4].join(' ')}>
            Nenhum resultado encontrado
          </div>
        </Row>
    } else {
      clientes = data.map(function(item, index){
        return(
          <ClienteItem key={index}
            index={index}
            data={item}
            onClose={() => that.fetch()}/>
        );
      });
    }

    return (
      <Row>
        <Loading spinning={loading}
          tip="Carregando...">
          <Row style={{background: '#fff'}}
            className={[
              utilsCss.border, 
              utilsCss.px2, 
              utilsCss.rounded,
              utilsCss.mt2
            ].join(' ')}>
            {clientes}
          </Row>
        </Loading>
      </Row>
    );
  }
} 

Clientes.propTypes = {
  filtro: PropTypes.string,
}

export default Clientes;
export {urlClientes};