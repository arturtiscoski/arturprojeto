import React, { Component } from 'react';
import {Row, Col} from 'antd';
import utilsCss from '../consys/utils.css';
import {version} from '../../../package.json';

class Footer extends Component {
  render() {
    return (
      <Row>
        <Col sm={{span: 14, offset: 5}}
          xs={{span: 20, offset: 2}}
          className={[utilsCss.py3, utilsCss.mt3, utilsCss.muted, utilsCss.borderTop].join(' ')}>
          <Row className={[utilsCss.mt1, utilsCss.h6, utilsCss.center, utilsCss.muted].join(' ')}>
            <b>Artur Salvador Tiscoski {new Date().getFullYear()}</b>
            <br/>
            versão {version}
          </Row>
        </Col>
      </Row>
    );
  }
}

export default Footer;