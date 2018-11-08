import React, { Component, Fragment } from 'react';
import HeaderCurrency from '../partials/HeaderCurrency'
import ListCurrency from '../partials/ListCurrency'
import AddCurrencyForm from '../partials/AddCurrencyForm'
import axios from 'axios'
import { Alert } from 'reactstrap'
import { acceptableCurrencyName } from '../helper/defaultConst'

const style = {
  error: {
    marginTop: "5px"
  }
}

class Home extends Component {
  state = {
    currencyRates: {},
    currencyListData: [],
    errorAlreadyUsed: false
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

  deleteCurrency = (selectedIndex) => {
    let newCurrencyListData = this.state.currencyListData
    newCurrencyListData.splice(selectedIndex, 1)
    this.setState({ currencyListData: newCurrencyListData })    
  } 

  submitNewCurrency = (selectedOption) => {
    let newCurrencyListData = this.state.currencyListData
    const alreadyUsed = newCurrencyListData.filter(currency => currency === selectedOption)
    if (alreadyUsed.length === 0) {
      newCurrencyListData = [ ...newCurrencyListData, selectedOption ]
      this.setState({ 
        currencyListData: newCurrencyListData,
        alreadyUsed: false
      })      
    }
    else {
      this.setState({ alreadyUsed: true })
    }
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
        deleteCurrency={this.deleteCurrency}
        baseCurrencyRate={10000}        
      />
      {this.state.alreadyUsed && 
      <Alert color="danger" className="col-sm-4 offset-sm-4" style={style.error}>Currency Already Used</Alert>}
      <AddCurrencyForm submitNewCurrency={this.submitNewCurrency}/>
    </Fragment>
  }
}

export default Home;
