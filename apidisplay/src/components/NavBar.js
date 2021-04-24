import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'



class NavBar extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" variant="dark" className="my-nav">

                <Nav className="mr-auto">
                    <Nav.Link href="/"> Newton</Nav.Link>
                    <Nav.Link href="/Number"> Number</Nav.Link>
                    <Nav.Link href="/Weather"> Weather</Nav.Link>
                    <Nav.Link href="/Saj"> Chuck Norris Jokes</Nav.Link>
                </Nav>

            </Navbar>
        );
    }
}

export default NavBar;