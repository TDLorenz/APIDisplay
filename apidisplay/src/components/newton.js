import React, { Component, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

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
            function: "",
            found: false
        }
    }

    
    handleInputChange = (event) => {
        this.setState({ problem: event.target.value}
        );
    }

    handleSearchClick = async () => {
        let problemQuery = this.state.problem;
        console.log(problemQuery)
        let linkToAPI = 'https://newton.now.sh/api/v2/' + options.value + '/' + problemQuery;
        console.log(linkToAPI)
        try {
            let response = await axios.get(linkToAPI);
            this.setState({ apiData: response.data, found: true });
            console.log(response.data)
        } catch (error) {
            if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                console.log(error.response.data); //Not Found
                console.log(error.response.status); //404
                this.setState({ found: false });
            }

        }
    }

    makeTable = () => {
        const currData = this.state.apiData;
        let foundMatch = this.state.found;
        let table = [];
        console.log(currData.result)
        //found is false when we get 404 error
        if (!foundMatch) {
            table.push(<tr key={-1}><td>No Results</td></tr>);
            return table;
        } else {
            //for (let i = 0; i < currData.length; i++) {
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
                    <Select options={options} />
                    <input type="text" value={this.state.problem} onChange={this.handleInputChange} placeholder="Try x^2" />
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