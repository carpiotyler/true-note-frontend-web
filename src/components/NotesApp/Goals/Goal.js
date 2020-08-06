import React from 'react';
import {Card} from 'semantic-ui-react'
import {isMobile} from 'react-device-detect';
import moment from 'moment';

function Goal(props) {
    const goal = props.goal;
    console.log(goal);
    
    const style = {
        backgroundColor: '#fcfcfc',
        height: '400px',
        width: isMobile ? '95%' : '23%',
        margin: isMobile? '2.5%': '1%'
    }

    const cardstyle = {
        height: '100%',
        width: '100%'
    }

    const formatDate = function(dateString) {
        let date = new Date(dateString);
        return `Updated ${moment(date).format('M/D h:mma')}`
    }

    return (
        <div style={style}>
            <Card style={cardstyle}>
                <Card.Content>
                    <Card.Header>{goal.title}</Card.Header>
                    <Card.Meta>{formatDate(goal.updated)}</Card.Meta>
                </Card.Content>
                <Card.Content>
                    <Card.Description>
                        <div dangerouslySetInnerHTML={{__html: goal.description}}></div>
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    )

}

export default Goal;