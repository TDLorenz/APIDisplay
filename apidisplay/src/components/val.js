import React, { Component, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class Number extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
            number: "",
            found: false
        }
    }

    handleInputChange = (event) => {
        this.setState({ number: event.target.value.toUpperCase()}
        );
    }

    handleSearchClick = async () => {
        let numberQuery = this.state.number;
        let linkToAPI = 'http://numbersapi.com/' + numberQuery;

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
        let currData = this.state.apiData;
        let foundMatch = this.state.found;
        let table = [];
        //found is false when we get 404 error
        if (!foundMatch) {
            table.push(<tr key={-1}><td>No Results</td></tr>);
            return table;
        } else {
            table.push(currData);
            return table;
        }
    }

    render() {
        return (
            <div className="container">
                <div className="search">
                    <h1>Numbers Facts </h1>
                    <input type="text" value={this.state.cityName} onChange={this.handleInputChange} placeholder="Try 10" />
                    <button className="search-button" onClick={this.handleSearchClick}>Search</button>
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

export default Number;