import React, { Component, Fragment } from 'react'
import { Alert, Row, Col } from 'reactstrap';

const style = {
  marginTop: '10px'
}

class HeaderCurrency extends Component {
  render() {
    return <Fragment>
      <Row>
        <Col sm={{ size: 4, offset: 4 }}>
          <Alert color="success" style={style}>
            <p>
              {this.props.baseCurrency}
            </p>
            <h6 className="alert-heading">USD <span className="float-right">{this.props.baseCurrencyRate}</span></h6>
          </Alert>
        </Col>
      </Row>
    </Fragment>
  }
}

export default HeaderCurrency;
