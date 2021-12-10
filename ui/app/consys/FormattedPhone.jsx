import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormattedMask from './FormattedMask'; 
import StringMask from 'string-mask';

const phoneMask8D = {  
  areaCode: new StringMask('(00) 0000-0000'),
  simple: new StringMask('0000-0000')
}, phoneMask9D = { 
  areaCode: new StringMask('(00) 00000-0000'),
  simple: new StringMask('00000-0000')
}, phoneMask0800 = {
  areaCode: null,
  simple: new StringMask('0000-000-0000')
};

function getFormatPhone(cleanValue){
  if (cleanValue != null) {
    cleanValue = cleanValue.replace(/\D+/gm, "");
  }
  return getMaskPhone(cleanValue).apply(cleanValue);
}

function getMaskPhone(cleanValue){
  var maskValue;

  if (cleanValue && cleanValue.indexOf('0800') === 0) {
    maskValue = phoneMask0800.simple;
  } else if (cleanValue && cleanValue.length < 9) {
    maskValue = phoneMask8D.simple;
  } else if (cleanValue && cleanValue.length < 10) {
    maskValue = phoneMask9D.simple;
  } else if (cleanValue && cleanValue.length < 11) {
    maskValue = phoneMask8D.areaCode;
  } else {
    maskValue = phoneMask9D.areaCode;
  }
  
  return maskValue;
}

class FormattedPhone extends Component {
  render() {
    const rest = {...this.props};
    delete rest.mask;
    return (
      <FormattedMask {...rest}
        mask={getMaskPhone(this.props.value).pattern}/>
    );
  }
}

FormattedPhone.PropTypes = {
  value: PropTypes.any
}

export default FormattedPhone;
export {getFormatPhone, getMaskPhone};
