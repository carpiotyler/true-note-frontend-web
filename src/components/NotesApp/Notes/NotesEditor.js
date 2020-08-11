import  React, {Component} from 'react';
import ReactQuill from 'react-quill';
import {Button, Modal, Form, Dropdown} from 'semantic-ui-react';

import 'react-quill/dist/quill.snow.css'
import '../../../css/quill-overrides.css'

class NotesEditor extends Component {

    quillStyle = {
        height: '360px',
        marginBottom: '40px'
    }

    addStyle = {
        position: 'fixed',
        bottom: '2%',
        right: '2%',
        fontSize: '16px',
        width: '120px'
    }

    constructor(props) {
        super(props)
        let note = props.note;
        this.state = {
            uuid: note?.uuid,
            open: props.open || false,
            title: note?.title || '',
            html: note?.html || ''
        }
    }

    handleModalClose() {
        this.setState({
            uuid: undefined,
            open: false,
            title: '',
            html: ''
        })
    }

    set(key, value) {
        let params = {};
        params[key] = value;
        this.setState(Object.assign({}, this.state, params));
    }

    render() {

        const modalStyle = {
            fontSize: '20px'
        }

        return (
            <Modal 
                open={this.state.open} 
                onOpen={() => this.set('open', true)} 
                onClose={() => this.handleModalClose()} 
                trigger={<Button color='purple' style={this.addStyle}>Add Note</Button>}
                style={modalStyle}
            >
                <Modal.Header>{this.state.uuid ? 'Edit' : 'Add'} Note</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input label="Title" type="text" placeholder="Enter a title..." onChange={(event, title) => this.set('title', title.value)} defaultValue={this.state.title}/>
                        <Form.Field>
                            <label>Content</label>
                            <ReactQuill style={this.quillStyle} onChange={(quillText) => this.set('html', quillText)} value={this.state.html}/>
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => this.handleModalClose()}>Cancel</Button>
                    <Button color="purple" onClick={() => {this.props.onDone(this.state); this.handleModalClose()}}>Save</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default NotesEditor