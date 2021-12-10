import React, { Component } from 'react';
import {Button, Tooltip, Icon} from 'antd';
import PropTypes from 'prop-types';
import utilsCss from './utils.css';

class EditButton extends Component {
  render() {
    const {className, noLink, onEdit, flat, view} = this.props;
    const icon = view ? "eye-o" : "edit";
    return (
      <Tooltip title={view ? "Visualizar" : "Editar"}>
        {flat ? 
          <span className={className ? className : utilsCss.h2}
            onClick={onEdit ? onEdit : null}>
            {noLink ? 
              <Icon type={icon}/>
            :
            <a className={className}>
              <Icon type={icon}/>
            </a>
            }
          </span> 
          :
          <Button icon={icon}
            onClick={onEdit ? onEdit : null}
            className={className}/>
        }
      </Tooltip>
    );
  }
}

EditButton.propTypes = {
  className: PropTypes.node,
  onEdit: PropTypes.func,
  flat: PropTypes.bool,
  noLink: PropTypes.bool,
  view: PropTypes.bool
};

export default EditButton;