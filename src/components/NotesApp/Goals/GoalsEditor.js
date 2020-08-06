import  React, {Component} from 'react';
import ReactQuill from 'react-quill';
import Button from '../../Button';

import 'react-quill/dist/quill.snow.css'
import '../../../css/quill-overrides.css'

class GoalsEditor extends Component {

    editorStyle = {
        position: 'fixed',
        left: '5%',
        bottom: '5%',
        borderRadius: '20px',
        height: '90%',
        width: '90%',
        backgroundColor: 'antiquewhite',
        zIndex: '9999'
    }

    quillStyle = {
        marginLeft: '20px',
        height: '90%',
        width: 'calc(100% - 40px)',
        marginTop: '20px',
        marginRight: '20px',
        backgroundColor: 'antiquewhite'
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
                    <ReactQuill style= {this.quillStyle} onChange={(value) => this.handleChange(value)} value={this.state.quillText || this.props.goal?.html}/>
                </div>
                <div style={this.saveAreaStyle}>
                    <Button style={this.cancelButtonStyle} text="Cancel" onClick={() => this.props.onDone()}/>
                    <Button style={this.saveButtonStyle} text="Save" onClick={() => this.props.onDone(this.state.quillText)}/>
                </div>
            </div>
        )
    }
}

export default GoalsEditor