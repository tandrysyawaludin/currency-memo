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
  },
  deleteButton: {
    position: 'absolute',
    right: '-20px',
    background: '#cc5d5d',
    width: '20px',
    textAlign: 'center',
    height: '100%',
    borderBottomRightRadius: '6px',
    borderTopRightRadius: '6px',
    paddingTop: '60px',
    color: 'white',
    fontWeight: '800',
    cursor: 'pointer'
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
              {accounting.formatMoney(
                this.props.currencyRates[val.toUpperCase()] * this.props.baseCurrencyRate, 
                {symbol: "GBP",  format: "%v" }
              )}
            </span>
          </CardTitle>
          <CardText>{acceptableCurrencyName[val]}</CardText>
          <CardText>
            <small className="text-muted">1 USD = {this.props.currencyRates[val.toUpperCase()]}</small>
          </CardText>
        </CardBody>
        <span style={style.deleteButton} onClick={() => this.props.deleteCurrency(i)}>X</span>
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
