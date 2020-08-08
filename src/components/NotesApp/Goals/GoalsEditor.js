import  React, {Component} from 'react';
import ReactQuill from 'react-quill';
import {Button, Header, Modal, Form, Dropdown} from 'semantic-ui-react';

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
            uuid: props.uuid,
            open: false,
            title: '',
            description: '',
            frequency: 0,
            period: 'week'
        }
    }

    handleModalClose() {
        this.set('open', false);
    }

    set(key, value) {
        let params = {};
        params[key] = value;
        this.setState(Object.assign({}, this.state, params));
    }

    render() {
        const options = [
            {
                key:'week',
                text:'week',
                value: 'week'
            },
            {
                key:'month',
                text:'month',
                value: 'month'
            },
            {
                key:'year',
                text:'year',
                value: 'year'
            }
        ]

        const freqContainerStyle = {
            display: 'flex',
            alignItems: 'center',
            fontSize: '20px',
            fontStyle: 'italic'
        }

        const freqInputStyle = {
            width: '50px',
            height: '24px',
            marginLeft: '6px',
            marginRight: '6px',
            paddingRight: '0',
            paddingLeft: '10px'
        }

        const perInputStyle = {
            minWidth: '120px',
            width: '120px',
            height: '36px',
            minHeight: '36px',
            paddingTop: '2px',
            paddingBottom: '2px',
            paddingLeft: '10px',
            paddingRight: '20px',
            marginLeft: '6px',
            display: 'flex',
            alignItems: 'center'
        }

        const modalStyle = {
            fontSize: '20px'
        }

        return (
            <Modal 
                open={this.state.open} 
                onOpen={() => this.set('open', true)} 
                onClose={() => this.handleModalClose()} 
                trigger={<Button color='purple' style={this.props.buttonStyle}>Add Goal</Button>}
                style={modalStyle}
            >
                <Modal.Header>{this.state.uuid ? 'Edit' : 'Add'} Goal</Modal.Header>
                <Modal.Content>
                    <Form>
                        <Form.Input label="Title" type="text" placeholder="Enter a title..." onChange={(event, title) => this.set('title', title.value)}/>
                        <Form.Field>
                            <label>Description</label>
                            <ReactQuill onChange={(quillText) => this.set('description', quillText)} />
                        </Form.Field>
                        <Form.Field>
                            <label>Frequency</label>
                            <div style={freqContainerStyle}>
                                "I want to focus on this <input style={freqInputStyle} type='number' placeholder='3' onChange={(event) => this.set('frequency', parseInt(event.target.value))}/> times per
                                <Dropdown placeholder='week' selection options={options} style={perInputStyle} onChange={(event) => this.set('period', event.target.children[0]?.innerText)}/>".
                            </div>
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button style={this.cancelButtonStyle} onClick={() => this.set('open', false)}>Cancel</Button>
                    <Button color="purple" style={this.saveButtonStyle} onClick={() => {this.set('open', false);  this.props.onDone(this.state)}}>Save</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default GoalsEditor