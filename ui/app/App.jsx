import React, { Component } from 'react';
import asyncComponent from './consys/asyncComponent';
import PageLoader from './consys/PageLoader';

const Root = asyncComponent(() => System.import('./root/Root'));

class App extends Component {
  render() {
    return (
      <PageLoader>
        <Root />
      </PageLoader>
    );
  }
}
export default App;