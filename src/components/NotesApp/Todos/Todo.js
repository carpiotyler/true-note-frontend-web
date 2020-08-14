import React from 'react';
import {Card, Button, Icon} from 'semantic-ui-react'
import {isMobile} from 'react-device-detect';
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
            return day.format('MM-DD-YYYY');
        }
    }

    const handleEditButton = function() {
        return render(<TodosEditor open={true}/>)
    }

    return (
        <div style={style}>
            <Card style={cardstyle}>
                <Card.Content>
                    <Card.Header>
                        {getContextHeader()}
                        {props.onDone ? <Button style={editStyle} onClick={() => handleEditButton()}><Icon name='edit outline' size='large'/></Button> : undefined}
                    </Card.Header>
                </Card.Content>
            </Card>
        </div>
    )

}

export default Todo;