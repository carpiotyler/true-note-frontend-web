import React, {Component} from 'react';
import {Checkbox, Input, Dropdown, Icon} from 'semantic-ui-react';
const uuid = require('uuid');

export default class TodoRow extends Component {

    constructor(props) {
        super()
        this.options=props.options;
        this.focusedUuid = props.focusedUuid;
        this.state = {
            new: props.new,
            todo: props.todo || {}
        }
    }

    componentDidMount() {
        if(!this.state.new && this.state.todo && this.focusedUuid === this.state.todo.uuid) {
            this.nameInput.focus();
        }
    }

    set(params) {
        this.setState(Object.assign({}, this.state, params));
    }

    rowStyle = {
        display: 'flex',
        alignItems: 'center'
    }

    dropdownStyle = {
        height: '40px'
    }

    render() {
        if(this.state.new) {
            return (
                <div>
                    <Icon name='plus' />
                    <Input placeholder='List Item' value="" onChange={(event, selection) => {
                        this.props.addTodo({
                            uuid: uuid.v1(),
                            text: selection.value,
                            goal: undefined
                        });
                    }
                    }/>
                </div>
            )
        } else {
            return (
                <div style={this.rowStyle}>
                    <Checkbox checked={this.props.done} style={this.checkboxStyle} onChange={(event, checkbox) => this.props.handleTodoRowCheck(this.state.todo, checkbox.checked)}/>
                    <Input style={this.inputStyle} ref={(input) => { this.nameInput = input; }} placeholder="Todo Item" value={this.state.todo.text} onChange={(event, selection) => this.set({todo: Object.assign(this.state.todo, {text: selection.value})})}/>
                    <Dropdown style={this.dropdownStyle} selection options={this.options} defaultValue={this.state.todo?.goal} onChange={(event, selection) => this.state.todo.goal=selection.value} />
                </div>
            )
        }
    }
}