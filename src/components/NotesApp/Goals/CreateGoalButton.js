import React, { Component } from "react";
import {Button} from 'semantic-ui-react';


class CreateGoalButton extends Component {
    createNoteStyle = {
        position: 'fixed',
        bottom: '2%',
        right: '2%',
        fontSize: '16px',
        width: '120px'
    }

    render() {
        return (
            <Button color="purple" style={this.createNoteStyle} onClick={() => this.props.setEditor({display: true, note: null})}>Add Goal</Button>
        )
    }
}

export default CreateGoalButton