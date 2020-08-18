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
            done: props.done,
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
        alignItems: 'center',
        marginTop: '4px',
        marginBottom: '4px'
    }

    render() {
        let checkboxStyle = {
            marginRight: '7px',
            marginLeft: '3px'
        }
    
        let inputStyle = {
            textDecoration: this.state.done ? 'line-through': 'none',
            marginRight: '12px',
            width: '400px'
        }
    
        let dropdownStyle = {
            width: '140px'
        }

        if(this.state.new) {
            return (
                <div style={this.rowStyle}>
                    <Icon name='plus' />
                    <Input style= {inputStyle} placeholder='List Item' value="" onChange={(event, selection) => {
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
                    <Checkbox checked={this.props.done} style={checkboxStyle} onChange={(event, checkbox) => this.props.handleTodoRowCheck(this.state.todo, checkbox.checked)}/>
                    <Input style={inputStyle} ref={(input) => { this.nameInput = input; }} placeholder="Todo Item" value={this.state.todo.text} onChange={(event, selection) => this.set({todo: Object.assign(this.state.todo, {text: selection.value})})}/>
                    <Dropdown style={dropdownStyle} selection options={this.options} defaultValue={this.state.todo?.goal} onChange={(event, selection) => this.state.todo.goal=selection.value} />
                </div>
            )
        }
    }
}