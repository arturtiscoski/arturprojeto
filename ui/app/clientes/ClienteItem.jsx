import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'antd';
import utilsCss from '../consys/utils.css';
import FormattedCNPJ from '../consys/FormattedCNPJ';
import {getFormatPhone} from '../consys/FormattedPhone';
import Truncate from '../consys/Truncate';
import EditButton from '../consys/EditButton';
import DeleteButton from '../consys/DeleteButton';
import ClienteDetalhes from './ClienteDetalhes';
import dataUtils from '../consys/dataUtils';

class ClienteItem extends Component {
  constructor() {
    super();
    this.state = {data: []};
  }

  render() {
    const {data, index} = this.props;
    const { del } = this.props.dataUtils;

    return (
      <Row type="flex"
        align="middle"
        justify='space-between'
        className={[utilsCss.px2, utilsCss.py3, index > 0 ? utilsCss.borderTop : null].join(' ')}>
        <Col sm={10}
          xs={24}>
          <div>
            <Truncate>
              <span className={[utilsCss.bold, utilsCss.muted, utilsCss.mr2].join(' ')}>
                {data.id}
              </span> 
              <span className={utilsCss.h3}>
                {data.nome.toUpperCase()}
              </span>
            </Truncate>
          </div>
          <div>
            <label className={utilsCss.mr2}>CPF/CNPJ</label> 
            <b><FormattedCNPJ value={data.cpfcnpj}/></b>
          </div>
          <div>
            <label className={utilsCss.mr1}>Telefone</label> 
            <b>{(data.telefone ? getFormatPhone(data.telefone) : 'NA')}</b>
          </div>
        </Col>
        <Col sm={2}
          xs={24}
          className={utilsCss.rightAlign}>
          <Col span={12}>
            <ClienteDetalhes cliente={data}
              onClose={() => this.props.onClose && this.props.onClose()}>
              <EditButton/>
            </ClienteDetalhes>
          </Col>
          <Col span={12}>
            <DeleteButton onDelete={() => del(index, {
              url: '/cliente/excluir',
              params: {id: data.id},
              message: <div>Cliente excluído com sucesso<br/><b>{data.id+' - '+data.nome}</b></div>,
              onFinish: () => this.props.onClose && this.props.onClose()
            })}/>
          </Col>
        </Col>
      </Row>
    );
  }
}

ClienteItem.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
  onClose: PropTypes.func,
  dataUtils: PropTypes.object
}

const ClienteItemDataUtils = dataUtils(ClienteItem);
export default ClienteItemDataUtils;
