import  React, {Component} from 'react';
import {Button, Modal, Form, Dropdown} from 'semantic-ui-react';

class TodosEditor extends Component {

    constructor(props) {
        super(props)
        let todo = props.todo;
        this.state = {
            uuid: todo?.uuid,
            open: props.open || false,
            date: props.date,
            todos: todo?.todos || [],
            done: todo?.done || []
        }
    }

    handleModalClose() {
        this.setState({
            uuid: undefined,
            open: false,
            date: undefined,
            todos: [],
            done: []
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
                style={modalStyle}
            >
                <Modal.Header></Modal.Header>
                <Modal.Content>
                    {this.getTodoRows()}
                    { }
                </Modal.Content>
                {this.getDoneRows()}
                <Modal.Actions>
                    <Button style={this.cancelButtonStyle} onClick={() => this.handleModalClose()}>Cancel</Button>
                    <Button color="purple" style={this.saveButtonStyle} onClick={() => {this.props.onDone(this.state); this.handleModalClose()}}>Save</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default TodosEditor