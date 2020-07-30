import  React, {Component} from 'react';
import ReactQuill from 'react-quill';
import Button from './Button';

import 'react-quill/dist/quill.snow.css'

class NotesEditor extends Component {

    editorStyle = {
        position: 'fixed',
        left: '10%',
        bottom: '10%',
        borderRadius: '20px',
        height: '80%',
        width: '80%',
        backgroundColor: '#fcfcfc'
    }

    quillStyle = {
        marginLeft: '20px',
        height: '90%',
        width: 'calc(100% - 40px)',
        marginTop: '20px',
        marginRight: '20px',
        marginBottom: '10%'
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
        this.state = {
            quillText: props.quillText
        }
    }

    handleChange(value) {
        this.setState({
            quillText: value
        })
    }

    render() {
        return (
            <div style={this.editorStyle}>
                <div style={this.editorAreaStyle}>
                    <ReactQuill style= {this.quillStyle} onChange={(value) => this.handleChange(value)}/>
                </div>
                <div style={this.saveAreaStyle}>
                    <Button style={this.cancelButtonStyle} text="Cancel" onClick={() => this.props.onDone()}/>
                    <Button style={this.saveButtonStyle} text="Save" onClick={() => this.props.onDone(this.state)}/>
                </div>
            </div>
        )
    }
}

export default NotesEditor