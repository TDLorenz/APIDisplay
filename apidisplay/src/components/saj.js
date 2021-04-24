import React, { Component, useState } from 'react';
import axios from 'axios';
import './saj.css'

class Saj extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiData: [],
            found: false
        }
    }

    handleGenerate = async () => {
        // let linkToAPI = 'https://api.chucknorris.io/jokes/random'; 
        let linkToAPI = 'https://api.icndb.com/jokes/random/3'; 

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

    makeJoke = () => {
        let currData = this.state.apiData;
        let foundMatch = this.state.found;
        let table = [];
        //found is false when we get 404 error
        if (!foundMatch) {
            table.push(<tr key={-1}><td>No Results</td></tr>);
            return table;
        } else {
            let joke = currData.value[0].joke
            joke = joke.replace(/(&quot\;)/g,"\"")
            table.push(
                <tr className="saj-row" key={currData.id}>
                    <td className="saj-text">Joke: {joke}</td>
                </tr>
            );
        }
            return table;
    }

    render() {
        return (
            <div className="saj-container">
                <div className="saj-search">
                    <h3>Chunk Noris Joke Generator </h3>
                    <button className="saj-generate-button" onClick={this.handleGenerate}>Generate</button>
                </div>
                <br />
                <div className="saj-table">
                    <table id="saj-data">
                        <tbody>
                            {this.makeJoke()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Saj;