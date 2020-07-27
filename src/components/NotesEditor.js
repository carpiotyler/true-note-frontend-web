import React, {Component} from 'react';

import Button from './Button';

class NotesEditor extends Component {

    editorStyle = {
        position: 'fixed',
        left: '10%',
        bottom: '10%',
        borderRadius: '20px',
        height: '80%',
        width: '80%',
        backgroundColor: 'grey'
    }

    saveButtonStyle = {
        backgroundColor: '#fe5f55',
        margin: '5px'
    }

    cancelButtonStyle = {
        backgroundColor: 'lightgrey',
        margin: '5px',
        color: '#141115'
    }

    editorAreaStyle = {
        height: '90%'
    }

    saveAreaStyle = {
        height: '10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={this.editorStyle}>
                <div style={this.editorAreaStyle}>

                </div>
                <div style={this.saveAreaStyle}>
                    <Button style={this.cancelButtonStyle} text="Cancel" onClick={this.props.onDone}/>
                    <Button style={this.saveButtonStyle} text="Save" onClick={this.props.onDone}/>
                </div>
            </div>
        )
    }
}

export default NotesEditor