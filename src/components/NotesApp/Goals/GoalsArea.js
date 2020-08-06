import React, {Component}from 'react';
import {isMobile} from 'react-device-detect';
import Goal from './Goal';
import Request from '../../utils/Request';
import Editor from './GoalsEditor';
import {Loader, Dimmer} from 'semantic-ui-react'
import CreateGoalButton from './CreateGoalButton';

class GoalsArea extends Component {

    goalsRowStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: isMobile ? 'center': 'end'
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            editor: {
                display: false,
                goal: null
            },
            loading: false
        }
        this.request = new Request(props.id_token, props.access_token);
    }

    componentDidMount() {
        this.request.get('goals')
        .then(res => {
            this.setData(res.data.Items);
            this.setLoading(false);
        });
        this.setLoading(true);
    }

    setData(data) {
        this.setState(Object.assign({}, this.state, {data: data}));
    }

    setEditor(editor) {
        this.setState(Object.assign({}, this.state, {editor: editor}));
    }

    setLoading(bool) {
        this.setState(Object.assign({}, this.state, {loading: bool}));
    }

    setLoadingAndEditor(loading, editor) {
        this.setState(Object.assign({}, this.state, {loading: loading}, {editor: editor}));
    }

    getGoalRows(goals) {
        if(isMobile) {
            return (
                goals.map((goal, index) => {
                    return (<div key={index} style={this.goalsRowStyle}>
                        <Goal key={goal.uuid} goal={goal} setEditor={(editor) => this.setEditor(editor)} deletegoal={(goal) => this.deletegoal(goal)}/>
                    </div>)
                })
            )
        } else {
            let goalsRowList = [];
            for(let i = 0; i < goals.length; i+=4) {
                let goalsElemList = [];
                for(let j = i; j < i + 4 && j < goals.length; j++) {
                    goalsElemList.push(<goal key={goals[j].uuid} goal ={goals[j]} setEditor={(editor) => this.setEditor(editor)} deletegoal={(goal) => this.deletegoal(goal)}/>);
                }
                goalsRowList.push(<div key={i/4} style={this.goalsRowStyle}>
                    {goalsElemList}
                </div>)
            }
            return goalsRowList
        }
    }

    createGoal(html) {
        this.request.post('goals', {html: html})
        .then(res => {
            let goal = res.data;
            let data = this.state.data;
            data.unshift(goal)
            this.setLoading(false);
        });
        this.setLoadingAndEditor(true, {
            display: false,
            goal: null
        });
    }

    updateGoal(uuid, html) {
        this.request.patch('goals', {uuid: uuid, html: html})
        .then(res => {
            console.log(res.data);
            let goal = res.data;
            let data = this.state.data;
            let existinggoal = data.find(x => x.uuid === goal.uuid);
            Object.assign(existinggoal, goal);
            this.setLoading(false);
        });
        this.setLoadingAndEditor(true, {
            display: false,
            goal: null
        });
    }

    deleteGoal(goal) {
        this.request.del('goals', `uuid=${goal.uuid}`)
        .then(res => {
            this.setState({
                data: this.state.data.filter(x => x.uuid !== goal.uuid),
                editor: {
                    display: false,
                    goal: null
                }
            });
            this.setLoading(false);
        });
        this.setLoading(true);
    }

    handleEdit(html) {
        if(html) {
            let uuid = this.state.editor.goal?.uuid
            if(uuid) {
                // Update
                this.updategoal(uuid, html);
            } else {
                // Create
                this.creategoal(html);
            }
        } else {
            // Just closing
            this.setState({
                data: this.state.data,
                editor: {
                    display: false,
                    uuid: null
                }
            })
        }
    }

    style = {
        overflow: 'auto',
        height: '95vh'
    }

    render() {
        let conditionalJSX = this.state.editor.display ? (<Editor goal ={this.state.editor.goal} onDone={(goal) => this.handleEdit(goal)}/>) : (<CreateGoalButton setEditor={(editor) =>this.setEditor(editor)}/>);
        return (
            <div style={this.style}>
                <Dimmer active={this.state.loading} style={{opacity: '0.3'}}>
                    <Loader active={this.state.loading} />
                </Dimmer>
                {this.getGoalRows(this.state.data)}
                {conditionalJSX}
            </div>
        )
    }
}

export default GoalsArea;