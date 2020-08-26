import React, {Component} from 'react';
import {isMobile} from 'react-device-detect';
import {Loader, Dimmer} from 'semantic-ui-react'
import Request from '../../utils/Request';
import Plot from 'react-plotly.js';


export default class TrendsArea extends Component {
    
    style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '95vh'
    }

    constructor(props) {
        super(props);
        this.state = {
            topGoalsByTodos: [],
            goals: [],
            loading: false
        }
        this.request = new Request(props.id_token, props.access_token);
    }

    async componentDidMount() {
        let promise1 = this.request.get('statistics/top-goals-by-todos');
        let promise2 = this.request.get('goals');
        this.set({loading: true});
        let [res1, res2] = await Promise.all([promise1, promise2])
        this.set({
            loading: false,
            topGoalsByTodos: res1.data,
            goals: res2.data.Items
        })
    }

    set(params) {
        this.setState(Object.assign({}, this.state, params));
    }

    findGoal(uuid) {
        return this.state.goals.find(goal => goal.uuid === uuid);
    }

    style = {
        overflow: 'auto',
        height: isMobile ? '90vh' : '95vh'
    }

    render() {
        return (
            <div style={this.style}>
                <Dimmer active={this.state.loading} style={{opacity: '0.3'}}>
                    <Loader active={this.state.loading} />
                </Dimmer>
                { this.state.goals.length && this.state.topGoalsByTodos?
                    <Plot 
                        data={[{
                            labels: Object.keys(this.state.topGoalsByTodos).map(key => this.findGoal(key)?.title),
                            values: Object.values(this.state.topGoalsByTodos),
                            type: 'pie',
                            mode: 'markers'
                        }]}
                        layout={{title: 'Top Goals By Todos'}}
                    /> : <div />
                }
            </div>
        )
    }
}

