import React, { Component, useState } from 'react';
import axios from 'axios';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
            location: 0, // woeid value is integer
            found: false
        }
    }

    handleChange = (event) => {
        let loc = event.target.value;
        let woeid = parseInt(loc);
        this.setState({ location: woeid/*event.target.value*/ });
    }

    handleSearchClick = async () => {
        let locationQuery = this.state.location;
        let linkToAPI = "https://www.metaweather.com/api/location/" + locationQuery + "/";
        // have to use woeid values to get locations

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
        }
        else {
            //let result = currData.result;
            let result = currData.value[0];
            table.push(
                <tr key={currData.id}>

                    <td>Result: {result}</td>

                </tr>
            );
        }
        return table;
    }

    render() {
        return (
            <div>
                <h1>Today's Weather</h1>
                <br />
                <h2>Choose which city's weather to view</h2>
                <br />

                <section className="weather-container">
                    <select id="lang" onChange={this.handleChange} value={this.state.location}>
                        <option value="2459115">New York</option>
                        <option value="2487956">San Francisco</option>
                        <option value="2442046">Los Angeles</option>
                        <option value="2379574">Chicago</option>
                        <option value="24050077">Miami</option>
                    </select>
                    &ensp; &ensp;
                    <button type="search-button" onClick={this.handleSearchClick}>Search</button>
                </section>

                <br />
                <div className="table">
                    <table id="data">
                        <tbody>
                            {this.makeTable()}
                        </tbody>
                    </table>
                </div>

            </div >
        )
    }
}

export default Weather;

/*
value={this.state.location}


        <div className="search">
            <h3>City Name Search</h3>
            <input type="text" value={this.state.cityName} onChange={this.handleInputChange} placeholder="Try SPRINGFIELD" />
            <button className="search-button" onClick={this.handleSearchClick}>Search</button>
        </div>
        */

/*
<td>Location: {latt_long}</td>
<td>Weather: {weather} </td>
<td>Temperature: {temp} </td>

<td>Zip: {zip}</td>
<td>Weather: {weather} </td>
<td>Temperature: {temp} </td>
*/