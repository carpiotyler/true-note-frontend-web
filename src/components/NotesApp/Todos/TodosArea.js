import React, {Component}from 'react';
import {isMobile} from 'react-device-detect';
import Todo from './Todo';
import Request from '../../utils/Request';
import {Loader, Dimmer, Grid} from 'semantic-ui-react'
import TodosEditor from './TodosEditor';
const moment = require('moment');

class TodosArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            data: [],
            loading: false
        }
        this.request = new Request(props.id_token, props.access_token);
    }

    componentDidMount() {
        this.request.get('daily-todos')
        .then(res => {
            this.set({
                data: res.data.Items,
                loading: false
            })
        });
        this.set({loading: true});
    }

    set(params) {
        this.setState(Object.assign({}, this.state, params));
    }

    setLoadingAndEditor(loading, editor) {
        this.setState(Object.assign({}, this.state, {loading: loading}, {editor: editor}));
    }

    findTodo(dayMoment) {
        this.state.data.find(todo => {
            return dayMoment?.isSame(moment(todo.date), 'day');
        })
    }

    getTodosGrid() {
        let today = moment(this.state.date);
        let yesterday = moment(today).subtract(1, 'day');
        let tomorrow = moment(today).add(1, 'day');

        const faded = {
            opacity: '60%',
            height: '100%'
        }

        const primary = {
            height: '100%'
        }

        return (
            <Grid columns={3} padded style={{height: '100%'}}>
                <Grid.Column style={faded}>
                    <Todo todo={this.findTodo()} day={yesterday} date={yesterday}/>
                </Grid.Column>
                <Grid.Column style={primary}>
                    <Todo todo={this.findTodo(today)} date={today} onDone={(editorState) => this.putTodo(editorState)}/>
                </Grid.Column>
                <Grid.Column style={faded}>
                    <Todo todo={this.findTodo(tomorrow)} date={tomorrow}/>
                </Grid.Column>
            </Grid>
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