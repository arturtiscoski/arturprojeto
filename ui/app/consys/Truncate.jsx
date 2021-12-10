import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import utilsCss from './utils.css';
import {Tooltip} from 'antd';
import ReactTimeout from 'react-timeout';

class Truncate extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      viewAll: false
    };
    this.elementRef = this.elementRef.bind(this);
    this.handleSeeMore = this.handleSeeMore.bind(this);
  }
  handleSeeMore() {
    const {viewAll} = this.state;
    this.setState({viewAll: !viewAll});
  }
  elementRef(ref) {
    const that = this;
    const {onTruncate} = this.props;
    this.ref = ref;
    if (this.timeoutRef) {
      this.props.clearTimeout(this.timeoutRef);
    }
    this.timeoutRef = this.props.setTimeout(function() {
      var node = ReactDOM.findDOMNode(that.ref);
      if (!node)
      {
        return;
      }
      let text = '';
      if (node.offsetHeight < node.scrollHeight ||
          node.offsetWidth < node.scrollWidth) {
        text = node.innerText;
      }
      that.setState({
        text
      });
      onTruncate && onTruncate(text);
    }, 100);

  }
  componentWillReceiveProps(nextProps) {
    const {children} = this.props;
    if (this.ref) {
      if (children !== nextProps.children) {
        this.elementRef(this.ref);
      }
    }
  }
  render() {
    const {text, viewAll} = this.state;
    var {seeMore, className, style, children, size, tooltip} = this.props;
    if (typeof size !== 'undefined')
    {
      style = {
        width: size
      }
    }
    const truncClazz = [];
    truncClazz.push(className);
    if (!viewAll)
    {
      truncClazz.push(utilsCss.truncate);
    }
    const button = (
      <a onClick={this.handleSeeMore}>
        {!viewAll ? 'Ver mais...' : 'Ver menos...'}
      </a>
    );
    return (
      <Tooltip title={!viewAll && tooltip ? text : ''}
        placement="topRight">
        <div ref={this.elementRef}
          style={style} 
          className={truncClazz.join(' ')}>
          {children}
          {viewAll ? button : null}
        </div>
        {text && seeMore && !viewAll ? 
          <div onClick={this.handleSeeMore}
            className={[utilsCss.absolute, utilsCss.right0, utilsCss.pointer, utilsCss.px1].join(' ')}
            style={{backgroundColor: '#fff', marginTop: '-1.2rem'}}>
            {button}
          </div>
        : null}
      </Tooltip>
    );
  }
}

Truncate.propTypes = {
  style: PropTypes.object,
  seeMore: PropTypes.bool,
  setTimeout: PropTypes.func,
  clearTimeout: PropTypes.func,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  className: PropTypes.string,
  children: PropTypes.node,
  tooltip: PropTypes.bool,
  onTruncate: PropTypes.func
};

const TruncateTimeout = ReactTimeout(Truncate);
export default TruncateTimeout;