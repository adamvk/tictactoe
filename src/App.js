import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TicTacToe from './components/TicTacToe';
import Contact from './components/Contact';
import { Switch, Route } from 'react-router-dom';
import "./components/styles/Main.css";

const App = () => {
    return (
        <>
            <div className="web-container">
                <Navbar />
                <div className="content-container">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/tictactoe" component={TicTacToe} />
                        <Route exact path="/contact" component={Contact} />
                        <Route component={Home} />
                    </Switch>
                </div>
            </div>
        </>
    );
};

export default App;