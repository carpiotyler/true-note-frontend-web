import React, { Component } from "react";
import NotesEditor from './NotesEditor'
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

    constructor(props) {
        super(props);
        this.state = {
            isEditor: false
        }
    }

    openEditor() {
        this.setState({
            isEditor: true
        });
    }

    closeEditor() {
        this.setState({
            isEditor: false
        })
    }

    render() {
        if(this.state.isEditor ) {
            return (
                <NotesEditor onDone={() => this.closeEditor()}/>
            )
        } else {
            return (
                <Button style={this.createNoteStyle} text="New Note" onClick={() => this.openEditor()}/>
            )
        }
    }
}

export default CreateNoteButton