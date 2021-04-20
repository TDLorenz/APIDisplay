import React, { Component, useState } from 'react';
import axios from 'axios';

class Newton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
            cityName: "",
            found: false
        }
    }

    handleInputChange = (event) => {
        this.setState({ cityName: event.target.value.toUpperCase()}
        );
    }

    handleSearchClick = async () => {
        let cityNameQuery = this.state.cityName;
        let linkToAPI = 'http://ctp-zip-api.herokuapp.com/city/' + cityNameQuery;

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
            for (let i = 0; i < currData.length; i++) {
                let zip = currData[i];
                table.push(
                    <tr key={currData[i].id}>
                        <td>Zip: {zip}</td>
                    </tr>
                );
            }
            return table;
        }
    }

    render() {
        return (
            <div className="container">
                <div className="search">
                    <h3>City Name Search</h3>
                    <input type="text" value={this.state.cityName} onChange={this.handleInputChange} placeholder="Try SPRINGFIELD" />
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

export default Newton;