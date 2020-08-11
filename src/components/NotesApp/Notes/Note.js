import React from 'react';
import {Card, Icon, Dropdown} from 'semantic-ui-react'
import {isMobile} from 'react-device-detect';
import moment from 'moment';
import { render } from '@testing-library/react';
import NotesEditor from './NotesEditor';

function Note(props) {
    const note = props.note;
    
    const style = {
        backgroundColor: '#fcfcfc',
        height: '400px',
        width: isMobile ? '97%' : '23%',
        margin: isMobile? '1.5%': '1%'
    }

    const cardstyle = {
        height: '100%',
        width: '100%'
    }

    const cardMenuStyle = {
        float: 'right'
    }

    const cardMenuPositionStyle = {
        right: '0',
        left: 'auto'
    }

    const formatDate = function(dateString) {
        let date = new Date(dateString);
        return `Updated ${moment(date).format('M/D h:mma')}`
    }

    const handleEditButton = function() {
        return render(<NotesEditor open={true} note={note} onDone={(editorState) => props.editNote(editorState)}/>);
    }

    const handleDelete = function() {
        props.deleteNote(note);
    }

    return (
        <div style={style}>
            <Card style={cardstyle}>
                <Card.Content>
                    <Card.Header>
                        {note.title}
                        <Dropdown icon="ellipsis vertical" style={cardMenuStyle}>
                            <Dropdown.Menu style={cardMenuPositionStyle}>
                                <Dropdown.Item icon='edit outline' text='Edit' onClick={() => handleEditButton()}/>
                                <Dropdown.Item icon='trash alternate outline' text='Delete' onClick={() => handleDelete()}/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Card.Header>
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