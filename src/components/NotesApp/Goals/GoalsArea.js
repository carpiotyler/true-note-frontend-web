import React, {Component}from 'react';
import {isMobile} from 'react-device-detect';
import Goal from './Goal';
import Request from '../../utils/Request';
import {Loader, Dimmer} from 'semantic-ui-react'
import GoalsEditor from './GoalsEditor';

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
                        <Goal key={goal.uuid} goal={goal} editGoal={(goal) => this.updateGoal(goal)} deleteGoal={(goal) => this.deleteGoal(goal)}/>
                    </div>)
                })
            )
        } else {
            let goalsRowList = [];
            for(let i = 0; i < goals.length; i+=4) {
                let goalsElemList = [];
                for(let j = i; j < i + 4 && j < goals.length; j++) {
                    goalsElemList.push(<Goal key={goals[j].uuid} goal ={goals[j]} editGoal={(goal) => this.updateGoal(goal)} deleteGoal={(goal) => this.deleteGoal(goal)}/>);
                }
                goalsRowList.push(<div key={i/4} style={this.goalsRowStyle}>
                    {goalsElemList}
                </div>)
            }
            return goalsRowList
        }
    }

    createGoal(editorState) {
        this.request.post('goals', {
            title: editorState.title,
            description: editorState.description,
            frequency: editorState.frequency,
            period: editorState.period
        })
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

    updateGoal(goal) {
        this.request.patch('goals', {
            uuid: goal.uuid,
            title: goal.title,
            description: goal.description,
            frequency: goal.frequency,
            period: goal.period
        })
        .then(res => {
            console.log(res.data);
            let goal = res.data;
            let data = this.state.data;
            let existingGoal = data.find(x => x.uuid === goal.uuid);
            Object.assign(existingGoal, goal);
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

    handleEdit(editorState) {
        if(editorState) {
            let uuid = this.state.editor.goal?.uuid
            if(uuid) {
                // Update
                this.updateGoal(uuid, editorState);
            } else {
                // Create
                this.createGoal(editorState);
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

    createNoteStyle = {
        position: 'fixed',
        bottom: '2%',
        right: '2%',
        fontSize: '16px',
        width: '120px'
    }

    render() {
        return (
            <div style={this.style}>
                <Dimmer active={this.state.loading} style={{opacity: '0.3'}}>
                    <Loader active={this.state.loading} />
                </Dimmer>
                {this.getGoalRows(this.state.data)}
                <GoalsEditor buttonStyle={this.createNoteStyle} onDone={(editorState) => this.handleEdit(editorState)}/>
            </div>
        )
    }
}

export default GoalsArea;