import React, {Component}from 'react';
import {isMobile} from 'react-device-detect';
import Todo from './Todo';
import Request from '../../utils/Request';
import {Loader, Dimmer, Grid, Button} from 'semantic-ui-react'
const moment = require('moment');

class TodosArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            data: [],
            goals: [],
            loading: false
        }
        this.request = new Request(props.id_token, props.access_token);
    }

    async componentDidMount() {
        let promise1 = this.request.get('daily-todos')
        let promise2 = this.request.get('goals');
        this.set({loading: true});
        let [res1, res2] = await Promise.all([promise1, promise2])
        this.set({
            loading: false,
            data: res1.data.Items,
            goals: res2.data.Items
        })
    }

    set(params) {
        this.setState(Object.assign({}, this.state, params));
    }

    findTodo(dayMoment) {
        return this.state.data.find(todo => {
            return dayMoment?.isSame(moment(new Date(todo.date)), 'day') ? todo : undefined;
        })
    }

    async putTodo(editorState) {
        this.set({loading: true});
        let existingTodo = this.findTodo(editorState.date);
        let newTodo = {
            date: (existingTodo ? new Date(existingTodo.date).toUTCString() : null) || editorState.date.toDate().toUTCString(),
            uuid: existingTodo?.uuid,
            todos: editorState.todos,
            done: editorState.done,
            goal: editorState.goal
        }
        await this.request.put('daily-todos', newTodo);
        if(existingTodo) {
            let index = this.state.data.findIndex(val => val.uuid === existingTodo.uuid);
            this.state.data[index] = newTodo;
        } else {
            this.state.data.push(newTodo);
        }
        this.set({loading: false});
    }

    getTodosGrid() {
        let today = moment(this.state.date);
        let yesterday = moment(today).subtract(1, 'day');
        let tomorrow = moment(today).add(1, 'day');

        const containerStyle = {
            height: '5%'
        }

        const navStyle = {
            height: '50%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }

        const faded = {
            opacity: '60%',
            height: '100%'
        }

        const primary = {
            height: '100%'
        }

        const leftButton = {
            marginLeft: '10px'
        }

        const rightButton = {
            marginRight: '10px'
        }

        return (
            <div style={{height: '100%'}}>
                <div style={containerStyle}>
                    <div style={{height: '50%'}}>
                        
                    </div>
                    <div style={navStyle}>
                        <Button style={leftButton} icon='arrow left' onClick={() => this.set({date: yesterday.toDate().toUTCString()})}></Button>
                        <Button style={rightButton} icon='arrow right' onClick={() => this.set({date: tomorrow.toDate().toUTCString()})}></Button>
                    </div>
                </div>
                <Grid columns={isMobile ? 1 : 3} padded style={{height: '95%'}}>
                    { !isMobile ? 
                        <Grid.Column style={faded}>
                            <Todo todo={this.findTodo(yesterday)} day={yesterday} date={yesterday}/>
                        </Grid.Column> : undefined
                    }
                    <Grid.Column style={primary}>
                        <Todo todo={this.findTodo(today)} date={today} onDone={(editorState) => this.putTodo(editorState)} goals={this.state.goals}/>
                    </Grid.Column>
                    { !isMobile ? 
                        <Grid.Column style={faded}>
                            <Todo todo={this.findTodo(tomorrow)} date={tomorrow}/>
                        </Grid.Column> : undefined
                    }
                </Grid>
            </div>
        )
    }

    style = {
        overflow: 'auto',
        height: '95vh'
    }

    render() {
        return (
            <div style={this.style}>
                <Dimmer active={this.state.loading} style={{opacity: '0.3'}}>
                    <Loader active={this.state.loading} />
                </Dimmer>
                {this.getTodosGrid()}
            </div>
        )
    }
}

export default TodosArea;