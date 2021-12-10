import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Row, Col, notification } from 'antd';
import utilsCss from '../consys/utils.css';
import http from '../consys/http';
import PhoneInput from '../consys/PhoneInput';

const FormItem = Form.Item;

class ClienteDetalhes extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    };

    this.modal = this.modal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSalvar = this.handleSalvar.bind(this);
  }

  modal(visible) {
    const { form, cliente } = this.props;
    this.setState({ visible });
    form.setFieldsValue({...cliente});
  }

  handleCancel() {
    const { form } = this.props;
    this.setState({ visible: false })
    form.resetFields();
  }

  handleSalvar() {
    const { form, cliente } = this.props
    
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const body = {
          ...values,
          id: cliente && cliente.id || 0
        }

        http('/clientes', {
          method: 'POST',
          body
        }).then((data) => {
          if (data[0] && data[0].includes("Cpf / cnpj ja cadastrado!")) {
            notification.error({
              message: 'Error!',
              description: 'Cpf / cnpj ja cadastrado!',
            });
            return;
          }

          this.setState({
            visible: false
          });
          notification.success({
            message: 'Sucesso!',
            description: `Cliente ${ cliente ? 'alterado' : 'salvo' } com sucesso`,
          });
          form.resetFields();
          this.props.onClose && this.props.onClose()
        }).catch((data) => {
          notification.error({
            message: 'Erro!',
            description: data.message,
          });
        });
      }

    });
  }

  render() {
    const { cliente } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <span>
        <span onClick={() => { this.modal(true) }}
          className={utilsCss.pointer}>
          {this.props.children}
        </span>
        <Modal width='60%'
          onCancel={this.handleCancel}
          visible={this.state.visible}
          title={(cliente ? 'Detalhes ' : 'Cadastro ') + 'de Cliente'}
          onOk={this.handleSalvar}
          okText='Salvar'>
          <Form>
            <Row gutter={12}>
              <Col span={12}>
                <FormItem label='Nome'>
                  {getFieldDecorator('nome', {
                    rules: [{ required: true, message: 'Por favor informe o nome!' }],
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label='CPF / CNPJ'>
                  {getFieldDecorator('cpfcnpj', {
                    rules: [{ required: true, message: 'Por favor informe o cpf ou cnpj!' }],
                  })(
                    <Input/>
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label='Telefone'>
                  {getFieldDecorator('telefone', {
                    rules: [{ required: true, message: 'Por favor informe o telefone!' }],
                  })(
                    <PhoneInput/>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
      </span>
    );
  }
}

ClienteDetalhes.propTypes = {
  form: PropTypes.object,
  cliente: PropTypes.object,
  children: PropTypes.node,
  onClose: PropTypes.func
};

const ClienteDetalhesForm = Form.create()(ClienteDetalhes);
export default ClienteDetalhesForm;
