import React, { Component } from "react";
import Button from './Button';


class CreateNoteButton extends Component {
    createNoteStyle = {
        position: 'fixed',
        bottom: '2%',
        right: '2%',
        fontSize: '16px',
        width: '120px',
        backgroundColor: '#fe5f55'
    }

    render() {
        return (
            <Button style={this.createNoteStyle} text="New Note" onClick={() => this.props.setEditor({display: true, note: null})}/>
        )
    }
}

export default CreateNoteButton