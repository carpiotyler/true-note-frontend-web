import React from 'react';
import {Card, Icon, Button, Dropdown} from 'semantic-ui-react'
import {isMobile} from 'react-device-detect';
import moment from 'moment';

function Goal(props) {
    const goal = props.goal;
    
    const style = {
        backgroundColor: '#fcfcfc',
        height: '200px',
        width: isMobile ? '95%' : '23%',
        margin: isMobile? '2.5%': '1%'
    }

    const cardstyle = {
        height: '100%',
        width: '100%'
    }

    const cardMenuStyle = {
        float: 'right'
    }

    const formatDate = function(dateString) {
        let date = new Date(dateString);
        return `Updated ${moment(date).format('M/D h:mma')}`
    }

    const handleEditButton = function() {

    }

    const handleDelete = function() {

    }

    return (
        <div style={style}>
            <Card style={cardstyle}>
                <Card.Content>
                    <Card.Header>
                        {goal.title}
                        <Dropdown icon="ellipsis vertical" style={cardMenuStyle}>
                            <Dropdown.Menu>
                                <Dropdown.Item icon='edit outline' text='Edit' onClick={() => handleEditButton()}/>
                                <Dropdown.Item icon='trash alternate outline' text='Delete' onClick={() => handleDelete()}/>
                            </Dropdown.Menu>
                        </Dropdown>    
                    </Card.Header>
                    <Card.Meta><Icon name="calendar alternate outline"/> {formatDate(goal.updated)}</Card.Meta>
                    <Card.Description>
                        <div dangerouslySetInnerHTML={{__html: goal.description}}></div>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                        <Icon name="clock outline" />
                        Goal: {goal.frequency}/{goal.period}
                </Card.Content>
            </Card>
        </div>
    )

}

export default Goal;