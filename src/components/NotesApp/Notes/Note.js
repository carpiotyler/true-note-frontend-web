import React from 'react';
import {Card, Icon} from 'semantic-ui-react'
import {isMobile} from 'react-device-detect';
import moment from 'moment';

function Note(props) {
    const note = props.note;
    
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
                    <Card.Header>Placeholder</Card.Header>
                    <Card.Meta><Icon name="calendar alternate outline"/> {formatDate(note.updated)}</Card.Meta>
                    <Card.Description>
                        <div dangerouslySetInnerHTML={{__html: note.html}}></div>
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
    )

}

export default Note;