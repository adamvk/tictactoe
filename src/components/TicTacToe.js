import React from "react";
import Gridbox from "./Gridbox";
import { Grid, Header, Card, Button, Icon } from "semantic-ui-react";

class TicTacToe extends React.Component {
    state = {
        userTool: null,
        opponentTool: null,
        userTurn: true,
        opponentTurn: false,
        boxes: [
            { id: 1, boxState: null },
            { id: 2, boxState: null },
            { id: 3, boxState: null },
            { id: 4, boxState: null },
            { id: 5, boxState: null },
            { id: 6, boxState: null },
            { id: 7, boxState: null },
            { id: 8, boxState: null },
            { id: 9, boxState: null }
        ],
        gameFinished: false,
        userWins: false,
        opponentWins: false,
        tie: false,
        userScore: 0,
        opponentScore: 0
    };

    componentDidMount() {
        this.ticker = setInterval(() => this.tickCheckWin(), 500);
        this.ticker = setInterval(() => this.tick(), 1000);
    };

    componentWillUnmount() {
        clearInterval(this.ticker);
    };

    tick = () => {
        if (this.state.opponentTurn) {
            this.opponentMakesChoice();
        }
    };

    tickCheckWin = () => {
        if (this.state.gameFinished === false) {
            this.checkWin("user");
            this.checkWin("opponent");
        };
    }

    opponentMakesChoice = () => {
        let availableBoxes = []
        this.state.boxes.map(box => {
            if (box.boxState === null) {
                availableBoxes.push(box);
            }
            return availableBoxes;
        });
        if (availableBoxes.length > 0) {
            let opponentChoice = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
            this.setState({
                boxes: this.state.boxes.map( box => {
                    if (box.id === opponentChoice.id) {
                        return { ...box, boxState: "opponent" }
                    }
                    return box
                })
            });
        };
        this.setState({ opponentTurn: false, userTurn: true })
    };

    handleClick = (id) => {
        let box = this.state.boxes.filter(box => box.id === id)[0];
        if (this.state.userTurn && box.boxState === null) {
            this.setState({
                boxes: this.state.boxes.map( box => {
                    if (box.id === id) {
                        return { ...box, boxState: "user" };
                    }
                    return box;
                })
            });
            this.setState({ userTurn: false, opponentTurn: true });
        };
    };

    makeToolChoice = (id) => {
        if (id === "O") {
            this.setState({ userTool: "O", opponentTool: "X" })
        } else if (id === "X") {
            this.setState({ opponentTool: "O", userTool: "X" })
        };
    };

    checkWin = (player) => {
        let { boxes } = this.state;
        if ((boxes[0].boxState === player && boxes[1].boxState === player && boxes[2].boxState === player) ||
            (boxes[3].boxState === player && boxes[4].boxState === player && boxes[5].boxState === player) ||
            (boxes[6].boxState === player && boxes[7].boxState === player && boxes[8].boxState === player) ||
            (boxes[0].boxState === player && boxes[3].boxState === player && boxes[6].boxState === player) ||
            (boxes[1].boxState === player && boxes[4].boxState === player && boxes[7].boxState === player) ||
            (boxes[2].boxState === player && boxes[5].boxState === player && boxes[8].boxState === player) ||
            (boxes[0].boxState === player && boxes[4].boxState === player && boxes[8].boxState === player) ||
            (boxes[2].boxState === player && boxes[4].boxState === player && boxes[6].boxState === player)) {
            if (player === "user") {
                this.setState({ 
                    userScore: this.state.userScore + 1, 
                    userTurn: false, 
                    opponentTurn: false, 
                    userWins: true,
                    gameFinished: true
                });
            } else if (player === "opponent") {
                this.setState({ 
                    opponentScore: this.state.opponentScore + 1, 
                    userTurn: false, 
                    opponentTurn: false, 
                    opponentWins: true,
                    gameFinished: true
                });
            };
        } else if (boxes[0].boxState != null && boxes[1].boxState != null && boxes[2].boxState != null && 
            boxes[3].boxState != null && boxes[4].boxState != null && boxes[5].boxState != null &&
            boxes[6].boxState != null && boxes[7].boxState != null && boxes[8].boxState != null) {
            this.setState({
                tie: true,
                userTurn: false,
                opponentTurn: false,
                gameFinished: true
            });
        };
    };

    resetBoxes = () => {
        this.setState({
            boxes: this.state.boxes.map( box => {
                return { ...box, boxState: null };
            })
        });
    };

    playAgainClick = () => {
        this.setState({
            gameFinished: false,
            userWins: false,
            opponentWins: false,
            tie: false,
            userTool: null,
            opponentTool: null,
            userTurn: true,
            opponentTurn: false
        });
        this.resetBoxes();
    };

    restartClick = () => {
        this.setState({
            gameFinished: false,
            userWins: false,
            opponentWins: false,
            tie: false,
            userTool: null,
            opponentTool: null,
            userScore: 0,
            opponentScore: 0,
            userTurn: true,
            opponentTurn: false
        });
        this.resetBoxes();
    };

    render() {
        const { userTool, opponentTool, boxes, gameFinished, userWins, opponentWins } = this.state;

        return (
            <>
                <div className="tictactoe-container">
                    <div className="column-left">
                        <div style={style.flex}>
                            <div className="game-container">
                                <p style={{ fontSize: '16px' }}>
                                    <b>User score:</b> {this.state.userScore}<br />
                                    <b>Computer score:</b> {this.state.opponentScore}
                                </p>
                                { gameFinished &&
                                    <>
                                        { userWins ?
                                            <>
                                                <Header as="h1" style={{color: 'green'}}>You won!</Header>
                                                { () => this.setState({ userScore: this.state.userScore + 1 }) }
                                            </>
                                        :
                                            <>
                                                { opponentWins ?
                                                    <>
                                                        <Header as="h1" style={{color: 'red'}}>You lost!</Header>
                                                        { () => this.setState({ opponentScore: this.state.opponentScore + 1 }) }
                                                    </>
                                                :
                                                    <Header as="h1" style={{color: 'blue'}}>Tie!</Header>
                                                }
                                            </>
                                        }
                                        <br />
                                        <Button
                                            onClick={this.playAgainClick}
                                        >
                                            Play again
                                        </Button>
                                        <br /><br />
                                        <Button
                                            onClick={this.restartClick}
                                        >
                                            Restart
                                        </Button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="column-right">
                        <div style={style.flex}>
                            <div className="game-container">
                                { (userTool === null && opponentTool === null) ?
                                    <>
                                        <Header as="h2">Make your choice.</Header>
                                        <br />
                                        <Grid columns={3} divided>
                                            <Grid.Row>
                                                <Grid.Column>
                                                    <Card textalign="center" onClick={() => this.makeToolChoice("O")}>
                                                        <div className="card-height">
                                                            <div className="symbol">
                                                                <Icon name="circle outline" size="huge" color="orange"></Icon>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Card textalign="center" onClick={() => this.makeToolChoice("X")}>
                                                        <div className="card-height">
                                                            <div className="symbol">
                                                                <Icon name="times" size="huge" color="orange"></Icon>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </>
                                :
                                    <>
                                        <Grid columns={3} divided>
                                            <Grid.Row>
                                                <Grid.Column>
                                                    <Gridbox id={boxes[0].id} boxState={boxes[0].boxState} 
                                                        handleClick={this.handleClick} userTool={userTool} opponentTool={opponentTool} />
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Gridbox id={boxes[1].id} boxState={boxes[1].boxState} 
                                                        handleClick={this.handleClick} userTool={userTool} opponentTool={opponentTool} />
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Gridbox id={boxes[2].id} boxState={boxes[2].boxState} 
                                                        handleClick={this.handleClick} userTool={userTool} opponentTool={opponentTool} />
                                                </Grid.Column>
                                            </Grid.Row>
                                            <div className="hr" />
                                            <Grid.Row>
                                                <Grid.Column>
                                                    <Gridbox id={boxes[3].id} boxState={boxes[3].boxState} 
                                                        handleClick={this.handleClick} userTool={userTool} opponentTool={opponentTool} />
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Gridbox id={boxes[4].id} boxState={boxes[4].boxState} 
                                                        handleClick={this.handleClick} userTool={userTool} opponentTool={opponentTool} />
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Gridbox id={boxes[5].id} boxState={boxes[5].boxState} 
                                                        handleClick={this.handleClick} userTool={userTool} opponentTool={opponentTool} />
                                                </Grid.Column>
                                            </Grid.Row>
                                            <div className="hr" />
                                            <Grid.Row>
                                                <Grid.Column>
                                                    <Gridbox id={boxes[6].id} boxState={boxes[6].boxState} 
                                                        handleClick={this.handleClick} userTool={userTool} opponentTool={opponentTool} />
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Gridbox id={boxes[7].id} boxState={boxes[7].boxState} 
                                                        handleClick={this.handleClick} userTool={userTool} opponentTool={opponentTool} />
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Gridbox id={boxes[8].id} boxState={boxes[8].boxState} 
                                                        handleClick={this.handleClick} userTool={userTool} opponentTool={opponentTool} />
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
};

const style = {
    flex: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '0px'
    }
}

export default TicTacToe;