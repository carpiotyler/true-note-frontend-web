import  React, {Component} from 'react';
import ReactQuill from 'react-quill';
import Button from './Button';

import 'react-quill/dist/quill.snow.css'
import '../css/quill-overrides.css'

class NotesEditor extends Component {

    editorStyle = {
        position: 'fixed',
        left: '5%',
        bottom: '5%',
        borderRadius: '20px',
        height: '90%',
        width: '90%',
        backgroundColor: 'antiquewhite'
    }

    quillStyle = {
        marginLeft: '20px',
        height: '90%',
        width: 'calc(100% - 40px)',
        marginTop: '20px',
        marginRight: '20px',
        backgroundColor: 'antiquewhite'
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
        height: '5%',
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
                    <ReactQuill style= {this.quillStyle} onChange={(value) => this.handleChange(value)} value={this.state.quillText || this.props.note?.html}/>
                </div>
                <div style={this.saveAreaStyle}>
                    <Button style={this.cancelButtonStyle} text="Cancel" onClick={() => this.props.onDone()}/>
                    <Button style={this.saveButtonStyle} text="Save" onClick={() => this.props.onDone(this.state.quillText)}/>
                </div>
            </div>
        )
    }
}

export default NotesEditor