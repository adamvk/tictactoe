import React from "react";
import { Card, Icon } from 'semantic-ui-react';

class Gridbox extends React.Component {
    tool = (symbol) => {
        if (symbol === "O") {
            return "circle outline";
        } else if (symbol === "X") {
            return "times";
        }
    }

    render() {
        const { id, boxState, handleClick } = this.props;
        const userTool = this.tool(this.props.userTool)
        const opponentTool = this.tool(this.props.opponentTool)

        return (
            <Card key={id} textalign="center" onClick={() => handleClick(id)}>
                <div className="card-height">
                    <div className="symbol">
                        { boxState === "user" ?
                            <Icon name={`${userTool}`} size="huge" color="orange"></Icon>
                        :
                            <>
                            { boxState === "opponent" &&
                                <Icon name={`${opponentTool}`} size="huge" color="orange"></Icon>
                            }
                            </>
                        }
                    </div>
                </div>
            </Card>
        );
    };
};

export default Gridbox;