import React, { Component, Fragment } from 'react';
import HeaderCurrency from '../partials/HeaderCurrency'
import ListCurrency from '../partials/ListCurrency'
import AddCurrencyForm from '../partials/AddCurrencyForm'
import axios from 'axios'

import { acceptableCurrencyName } from '../helper/defaultConst'

class Home extends Component {
  state = {
    currencyRates: {},
    currencyListData: []    
  }

  componentDidMount() {
    this.getCurrencyBase()
  }

  getCurrencyBase = () => {
    axios.get('https://api.exchangeratesapi.io/latest?base=USD')
    .then(res => {
      this.setState({ currencyRates: res.data.rates })
    })
  }

  submitNewCurrency = (selectedOption) => {
    let newCurrencyListData = this.state.currencyListData
    newCurrencyListData = [ ...newCurrencyListData, selectedOption ]
    this.setState({ currencyListData: newCurrencyListData })
  }

  render() {
    return <Fragment>
      <HeaderCurrency
        baseCurrency={acceptableCurrencyName['usd']}
        baseCurrencyRate={10000}
    />
      <ListCurrency 
        currencyListData={this.state.currencyListData}
        currencyRates={this.state.currencyRates}
        baseCurrencyRate={10000}        
      />
      <AddCurrencyForm submitNewCurrency={this.submitNewCurrency}/>
    </Fragment>
  }
}

export default Home;
