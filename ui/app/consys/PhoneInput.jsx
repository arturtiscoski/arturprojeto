import React, { Component } from 'react';
import MaskInput from './MaskInput';
import {getFormatPhone} from './/FormattedPhone';

class PhoneInput extends Component {
  render() {
    const {
      ...rest
    } = this.props;
    return (
      <MaskInput 
        {...rest}
        clearValue={(rawValue) => rawValue ? rawValue.toString().replace(/[^0-9]/g, '').slice(0, 11) : rawValue}
        format={(cleanValue) =>  getFormatPhone(cleanValue)} />
    );
  }
}

export default PhoneInput;
