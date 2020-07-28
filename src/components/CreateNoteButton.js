import React, { Component } from "react";
import NotesEditor from './NotesEditor'
import Button from './Button';
import Request from './Request';
import Axios from "axios";


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
        this.request = props.Request
    }

    openEditor() {
        this.setState({
            isEditor: true
        });
    }

    closeEditor(state) {
        if(state) {
            this.request.post('notes', {html: state.quillText}).then((res) => {
                let note = res.data;
                this.props.AddNote(note)
            }).catch(err => {
                console.error(err);
            });
        }
        this.setState({
            isEditor: false
        })
    }

    render() {
        if(this.state.isEditor ) {
            return (
                <NotesEditor onDone={(state) => this.closeEditor(state)}/>
            )
        } else {
            return (
                <Button style={this.createNoteStyle} text="New Note" onClick={() => this.openEditor()}/>
            )
        }
    }
}

export default CreateNoteButton