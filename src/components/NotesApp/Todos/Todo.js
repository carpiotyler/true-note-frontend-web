import React from 'react';
import {Card, Button, Icon, Checkbox, Label, Header} from 'semantic-ui-react'
import moment from 'moment';
import TodosEditor from './TodosEditor';
import { render } from '@testing-library/react';

function Todo(props) {
    const todo = props.todo;
    
    const style = {
        backgroundColor: '#fcfcfc',
        height: '90%',
        width: '100%'
    }

    const cardstyle = {
        height: '100%',
        width: '100%'
    }

    const editStyle = {
        float: 'right',
        padding: '0',
        backgroundColor: '#fcfcfc',
        margin: '0'
    }

    const getContextHeader = function() {
        let day = props.date;
        if(moment().subtract(1, 'day').isSame(day, 'day')) {
            return 'Yesterday'
        } else if(moment().isSame(day, 'day')) {
            return 'Today'
        } else if(moment().add(1, 'day').isSame(day, 'day')) {
            return 'Tomorrow'
        } else {
            return day.format('dddd - MMMM Do');
        }
    }

    const handleEditButton = function() {
        return render(<TodosEditor open={true} onDone={(editorState) => props.onDone(editorState)} todo={todo} date={props.date} goals={props.goals}/>)
    }

    const rowStyle = {
        display: 'flex',
        alignItems: 'center',
        marginTop: '4px',
        marginBottom: '4px'
    }

    const checkboxStyle = {
        marginRight: '6px'
    }

    const labelStyle = {
        marginLeft: '6px'
    }

    return (
        <div style={style}>
            <Card style={cardstyle}>
                <Card.Content>
                    <Card.Header>
                        {getContextHeader()}
                        {props.onDone ? <Button style={editStyle} onClick={() => handleEditButton()}><Icon name='edit outline' size='large'/></Button> : undefined}
                    </Card.Header>
                    <Card.Description>
                        <Header style={{marginTop: '16px'}}size='tiny'>Todo:</Header>
                        {
                            todo?.todos.map(td => {
                                let matchingGoal = props.goals?.find(val => val.uuid === td.goal);
                               return (
                                   <div key={td.uuid} style={rowStyle}>
                                       <Checkbox checked={false} style={checkboxStyle}/>
                                       {td.text}
                                       {matchingGoal ? <Label style={labelStyle} size='tiny'>{matchingGoal?.title}</Label> : <div />}
                                   </div>
                               ) 
                            })
                        }
                        <Header size='tiny'>Done:</Header>
                        {
                            todo?.done.map(td => {
                                let matchingGoal = props.goals?.find(val => val.uuid === td.goal);
                               return (
                                   <div key={td.uuid} style={rowStyle}>
                                       <Checkbox checked={true} style={checkboxStyle}/>
                                       <div style={{textDecoration: 'line-through'}}>
                                            {td.text}
                                        </div>
                                       {matchingGoal ? <Label style={labelStyle} size='tiny'>{matchingGoal?.title}</Label> : <div />}
                                   </div>
                               ) 
                            })
                        }
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    )

}

export default Todo;