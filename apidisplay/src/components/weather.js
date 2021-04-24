import React, { Component, useState } from 'react';
import axios from 'axios';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
            cityName: "",
            /*dayQuery: "",*/
            zipcode: 00000, // should it be a string or int or smthing else?
            found: false
        }
    }


    handleInputChange = (event) => {
        this.setState({ cityName: event.target.value.toUpperCase() }
        );
    }

    handleSearchClick = async () => {
        let cityNameQuery = this.state.cityName;
        let linkToAPI = "https://www.metaweather.com/api/" + cityNameQuery;
        //let linkToAPI = 'http://ctp-zip-api.herokuapp.com/city/' + cityNameQuery;

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
                        <td>Weather: {weather} </td>
                        <td>Temperature: {temp} </td>
                    </tr>
                );
            }
            return table;
        }
    }

    render() {
        return (
            <div className="container">
                <h>Today's Weather</h>
                <br />
                <h2>Choose which city's weather to view</h2>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Choose a city
                        <select value={this.state.cityName} onChange={this.handleChange}>
                            <option value="New York">New York</option>
                            <option value="Chicago">Chicago</option>
                            <option value="Los Angeles">Los Angeles</option>
                            <option value="San Francisco">San Francisco</option>
                            <option value="Miami">Miami</option>
                        </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>

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

export default Weather;