import React from 'react';

function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    constructor() {
      super();
      this.state = {};
    }
    componentWillMount() {
      const that = this;
      if (!this.state.Component) {
        getComponent()
        .then(Component => {
          return Component.default;
        })
        .then(Component => {
          AsyncComponent.Component = Component;
          that.setState({ Component });
        })
      }
    }
    componentDidUpdate(props) {
      const { loaded } = props;
      
      this.timeoutAsync = setTimeout(function(){ 
        loaded && loaded();
      }, 1000);
    }
    componentWillUnmount() {
      this.timeoutAsync && clearTimeout(this.timeoutAsync);
    }
    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />
      }
      return null;
    }
  }
}
export default asyncComponent;