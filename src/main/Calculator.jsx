import React, { Component } from "react";
import './Calculator.css'

import Display from "../components/Display";
import Button from "../components/Button.jsx";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

const initialState ={
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component{

    state = { ...initialState }
    constructor(props){
        super(props)
        this.claerMemory = this.claerMemory.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.setOperation = this.setOperation.bind(this)
    }

    claerMemory(){
        this.setState({ ...initialState })
    }
    setOperation(op){
        if(this.state.current === 0){
            this.setState({ op, current: 1, clearDisplay: true})
        } else{
            const result = op === '='
            const currentOperation = this.state.op

            const values = [...this.state.values]
            // eslint-disable-next-line no-eval
            
            try{
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
                values[1] = 0
            } catch(e){
                values[0] = this.state.values[0]
            }
            this.setState({
                displayValue: values[0], op: result ? null : op, current: result ? 0 : 1, clearDisplay: !result, values

            })
        }
    }
    addDigit(n){
        if (n === '.' && this.state.displayValue.includes('.')){
            return
        }

        const clearDisplay = this.state.displayValue === '0' ||  this.state.clearDisplay

        const currentValue = clearDisplay ? '' : this.state.displayValue

        const displayValue = currentValue + n

        this.setState({displayValue, clearDisplay: false})

        if (n !== '.'){
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }

    render(){
        return(
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label='AC' click={this.claerMemory} triple />
                <Button label='/' click={this.setOperation} operation/>
                <Button label='7' click={this.addDigit} />
                <Button label='8' click={this.addDigit} />
                <Button label='9' click={this.addDigit} />
                <Button label='*' click={this.setOperation} operation/>
                <Button label='4' click={this.addDigit} />
                <Button label='5' click={this.addDigit} />
                <Button label='6' click={this.addDigit} />
                <Button label='-' click={this.setOperation} operation/>
                <Button label='1' click={this.addDigit} />
                <Button label='2' click={this.addDigit} />
                <Button label='3' click={this.addDigit} />
                <Button label='+' click={this.setOperation} operation/>
                <Button label='0' click={this.addDigit} double />
                <Button label='.' click={this.addDigit}/>
                <Button label='=' click={this.setOperation} operation/>
            </div>
        )
    }
}