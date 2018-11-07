import React, { Component, Fragment } from 'react'
import {
  Row,
  Col,
  InputGroup, 
  Button, 
  InputGroupAddon, 
  Input
} from 'reactstrap'

import { acceptableCurrencyCode } from '../helper/defaultConst'

const style = {
  addCurrencyForm: {
    marginTop: '20px'
  },
  addCurrencyButton: {
    marginTop: '20px'
  }
}

class AddCurrencyForm extends Component {
  state = {
    showAddCurrencyForm: false,
    disabledSubmitButton: true,
    selectedOption: ""
  }

  handleChangeOption = (e) => {    
    this.setState({ 
      selectedOption: e.target.value,
      disabledSubmitButton: !(e.target.value != 0)
    })
  }

  submitNewCurrency = () => {
    this.props.submitNewCurrency(this.state.selectedOption)
    this.setState({ showAddCurrencyForm: false })
  }

  renderOptions = () => (
    [
      <option value="0" key="-1">Choose</option>,
      acceptableCurrencyCode.map((val, i) => (
        <option 
          value={val} 
          key={i}
        >
          {val.toUpperCase()}
        </option>
      ))
    ]
  )

  renderAddCurrencyButton = () => (
    <Button
      style={style.addCurrencyButton}
      onClick={() => this.setState({ showAddCurrencyForm: true })}
      className="btn-block"
    >
      + Add More Currency
    </Button>
  )

  renderAddCurrencyForm = () => (
    <InputGroup style={style.addCurrencyForm}>
      <Input type="select" onChange={this.handleChangeOption}>
        {this.renderOptions()}
      </Input>
      <InputGroupAddon addonType="append">
        <Button 
          disabled={this.state.disabledSubmitButton}
          onClick={this.submitNewCurrency}
        >
          Submit
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )

  render() {
    return <Fragment>
      <Row>
        <Col sm={{ size: 4, offset: 4 }}>
        {this.state.showAddCurrencyForm ? this.renderAddCurrencyForm() : this.renderAddCurrencyButton()}
        </Col>
      </Row>
    </Fragment >
  }
}

export default AddCurrencyForm;
