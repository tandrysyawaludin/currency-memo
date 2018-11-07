import React, { Component, Fragment } from 'react'
import {
  Row,
  Col,
  Card, 
  CardText, 
  CardBody,
  CardTitle
} from 'reactstrap'
import accounting from 'accounting-js';
import { acceptableCurrencyName } from '../helper/defaultConst'

const style = {
  card: {
    marginTop: '5px'
  }
}

class ListCurrency extends Component {
  renderList = () => (
    this.props.currencyListData.map((val, i) => (
      <Card key={i} style={style.card}>
        <CardBody>
          <CardTitle>
            {val.toUpperCase()}
            <span className="float-right">
              {accounting.formatMoney(4999.99, "€", 2, ".", ",")}
            </span>
          </CardTitle>
          <CardText>{acceptableCurrencyName[val]}</CardText>
          <CardText>
            <small className="text-muted">1 USD = {this.props.currencyRates[val.toUpperCase()]}</small>
          </CardText>
        </CardBody>
      </Card>
    ))
  )
  render() {
    return <Fragment>
      <Row>
        <Col sm={{ size: 4, offset: 4 }}>
          {this.props.currencyListData.length > 0 ? this.renderList() : "No data"}
        </Col>
      </Row>
    </Fragment>
  }
}

export default ListCurrency;
