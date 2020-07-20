import React from 'react';
import { Navbar as NavbarBS, Nav } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';
import styled from "styled-components";
import "./styles/Main.css";

class Navbar extends React.Component {
    render() {
        return (
            <NavbarBS className="navbar-background" sticky="top">
                <div className="navbar-inner">
                    <NavbarBS.Toggle aria-controls="basic-navbar-nav" />
                    <NavbarBS.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavButton
                                exact
                                to="/"
                                activeStyle={navButtonActive}
                            >
                                HOME
                            </NavButton>
                            <NavButton
                                exact
                                to="/tictactoe"
                                activeStyle={navButtonActive}
                            >
                                TICTACTOE
                            </NavButton>
                            <NavButton
                                exact
                                to="/contact"
                                activeStyle={navButtonActive}
                            >
                                CONTACT
                            </NavButton>
                        </Nav>
                    </NavbarBS.Collapse>
                </div>
            </NavbarBS>
        );
    };
};

const NavButton = styled(NavLink)`
    display: flex;
    background: #373737;
    color: white;
    padding-top: 10px;
    margin: 5px 25px 5px 25px;
    justify-content: center;
    height: 40px;
    cursor: pointer;
    font-size: 16px;
  
    &:hover {
        color: rgb(255, 153, 0);
        text-decoration: none;
    }
`;

const navButtonActive = {
    color: "rgb(255, 153, 0)",
    borderBottom: "2px solid rgb(255, 153, 0)",
};

export default withRouter(Navbar);