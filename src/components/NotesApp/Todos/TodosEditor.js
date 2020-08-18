import  React, {Component} from 'react';
import TodoRow from './TodoRow'
import {Button, Modal, Header} from 'semantic-ui-react';

class TodosEditor extends Component {

    constructor(props) {
        super(props)
        let todo = props.todo;
        this.focusedUuid = null;
        this.options = [{
            key: null,
            text: 'None',
            value: 'None'
        }].concat(props.goals ? props.goals.map(goal => {
            return {
                key: goal.uuid,
                text: goal.title,
                value: goal.uuid
            }
        }) : []);
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
            date: this.state.date,
            todos: [],
            done: []
        })
    }

    handleTodoRowCheck(todo, bool) {
        if(bool) {
            let newTodos = this.state.todos.filter(val => val.uuid !== todo.uuid);
            let newDone =  [todo].concat(this.state.done);
            this.set({
                todos: newTodos,
                done: newDone
            })
        } else {
            let newDone = this.state.done.filter(val => val.uuid !== todo.uuid);
            let newTodos = this.state.todos.concat(todo);
            this.set({
                todos: newTodos,
                done: newDone
            })
        }
    }
    
    addTodo(todo) {
        this.focusedUuid = todo.uuid;
        this.set({'todos': this.state.todos.concat(todo)});
    }

    getTodoRows() {
        return (
            <div>
                {this.state.todos.map(todo => {
                    return (
                        <TodoRow key={todo.uuid} focusedUuid={this.focusedUuid} todo={todo} handleTodoRowCheck={(todo, bool) => this.handleTodoRowCheck(todo, bool)} options={this.options} addTodo={(todo)=> this.addTodo(todo)}/>
                    )
                })}
                <TodoRow new={true} handleTodoRowCheck={(todo, bool) => this.handleTodoRowCheck(todo, bool)} options={this.options} addTodo={(todo)=> this.addTodo(todo)}/>
            </div>
        )
    }

    getDoneRows() {
        if(this.state.done.length) {
            return (
                <Modal.Content>
                    <Header size='small'>Done:</Header>
                    {
                        this.state.done.map(done => {
                            return (
                                <TodoRow done={true} key={done.uuid} focusedUuid={this.focusedUuid} todo={done} handleTodoRowCheck={(done, bool) => this.handleTodoRowCheck(done, bool)} options={this.options} />
                            )
                        })
                    }
                </Modal.Content>
            )
        } else {
            return (
                <div />
            )
        }
    }

    set(params) {
        this.setState(Object.assign({}, this.state, params));
    }

    render() {
        const modalStyle = {
            fontSize: '20px'
        }

        return (
            <Modal 
                open={this.state.open} 
                onOpen={() => this.set({'open': true})} 
                onClose={() => this.handleModalClose()} 
                style={modalStyle}
            >
                <Modal.Header>
                    {this.state.date.format('MMMM Do, YYYY')}
                </Modal.Header>
                <Modal.Content>
                    <Header size='small'>Todo:</Header>
                    {this.getTodoRows()}
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