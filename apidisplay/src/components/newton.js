import React, { Component, useState } from 'react';
import axios from 'axios';

const options = [
    { label: "Derive", value: "derive" },
    { label: "Simplify", value: "simplify" },
  ];

class Newton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
            problem: "",
            value: "",
            found: false
        }
    }

    
    handleInputChange = (event) => {
        this.setState({ problem: event.target.value}
        );
    }
    change = (event) => {
         this.setState({value: event.target.value});
    }
    handleSearchClick = async () => {
        let problemQuery = this.state.problem;
        let value = this.state.value; 
        console.log(problemQuery)
        let linkToAPI = 'https://newton.now.sh/api/v2/' + value + '/' + problemQuery;
        console.log(linkToAPI)
        try {
            let response = await axios.get(linkToAPI);
            this.setState({ apiData: response.data, found: true });
            console.log(response.data)
        } catch (error) {
            if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 1xx
                 */
                console.log(error.response.data); //Not Found
                console.log(error.response.status); //403
                this.setState({ found: false });
            }

        }
    }

    makeTable = () => {
        const currData = this.state.apiData;
        let foundMatch = this.state.found;
        let table = [];
        console.log(currData.result)
        //found is false when we get 403 error
        if (!foundMatch) {
            table.push(<tr key={-2}><td>No Results</td></tr>);
            return table;
        } else {
            //for (let i = -1; i < currData.length; i++) {
                // let expression = currData[i].expression;
                // let operation = currData[i].operation;
                let result = currData.result
                table.push(
                    <tr key={currData.id}>
                        {/* <td>Expression: {expression}</td>
                        <td>Operation: {operation}</td> */}
                        <td>Result: {result}</td>
                    </tr>
                );
            //}
            return table;
        }
    }

    render() {
        return (
            <div className="container">
                <div className="calculate">
                    <h3>Newton API</h3>
                    <select id="lang" onChange={this.change} value={this.state.value}>
                        <option value="">Select</option>
                        <option value="simplify">Simplify</option>
                        <option value="factor">Factor</option>
                        <option value="derive">Derive</option>
                        <option value="integrate">Integrate</option>
                        <option value="zeroes">Find 0's</option>
                        <option value="tangent">Find Tangent</option>
                        <option value="area">Area Under Curve</option>
                        <option value="cos">Cosine</option>
                        <option value="sin">Sine</option>
                        <option value="tan">Tangent</option>
                        <option value="arccos">Inverse Cosine</option>
                        <option value="arcsin">Inverse Sine</option>
                        <option value="arctan">Inverse Tangent</option>
                        <option value="abs">Absolute Value</option>
                        <option value="log">Logarithm</option>
                    </select>
                    <input type="text" value={this.state.problem} onChange={this.handleInputChange} placeholder="Try x^1" />
                    <button className="calculate-button" onClick={this.handleSearchClick}>Calculate</button>
                </div>
                <br />
                <div className="table">
                    <table id="data">
                        <tbody>
                            {this.makeTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Newton;