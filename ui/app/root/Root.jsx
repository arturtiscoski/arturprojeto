import React, { Component } from 'react';
import {IntlProvider, addLocaleData } from 'react-intl';
import { LocaleProvider } from 'antd';
import ptBR from 'antd/lib/locale-provider/pt_BR';
import pt from 'react-intl/locale-data/pt';
import addressBar from '../consys/addressBar';
import AppRouter from '../routes/AppRouter';

addLocaleData(pt);

addressBar.setColor({color: '#2B398F'})

class Root extends Component {
  render() {
      return (
        <LocaleProvider locale={ptBR}>
          <IntlProvider locale="pt">
            <AppRouter/>
          </IntlProvider>
        </LocaleProvider>
      );
   }
}
export default Root;