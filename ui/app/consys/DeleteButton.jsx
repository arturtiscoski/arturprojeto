import React, { Component } from 'react';
import {Button, Tooltip, Popconfirm, Icon} from 'antd';
import PropTypes from 'prop-types';
import utilsCss from './utils.css';

class DeleteButton extends Component {
  render() {
    const {className, onDelete, placement, flat} = this.props;
    return (
      <Popconfirm title="Tem certeza que deseja excluir?" 
        onConfirm={onDelete} 
        placement={placement ? placement : 'top'}
        okText="Excluir" 
        cancelText="Cancelar">
        <Tooltip title="Excluir">
          {flat ? 
            <span className={utilsCss.h2}>
              <a className={className}>
                <Icon type="delete" 
                  style={{color: '#f04134'}}/>
              </a>
            </span> 
            :
            <Button type="danger"
              icon="delete"
              className={className}/>
          }
        </Tooltip>
      </Popconfirm>
    );
  }
}

DeleteButton.propTypes = {
  className: PropTypes.node,
  onDelete: PropTypes.func,
  placement: PropTypes.string,
  flat: PropTypes.bool
};

export default DeleteButton;