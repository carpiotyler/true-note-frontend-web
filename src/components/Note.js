import React from 'react';
import FontAwesome from 'react-fontawesome';
import {isMobile} from 'react-device-detect';
import faStyles from 'font-awesome/css/font-awesome.css';

function Note(props) {
    const note = props.note;

    const style = {
        backgroundColor: '#fcfcfc',
        borderRadius: '5px',
        height: '400px',
        width: '23%',
        margin: '1%',
        boxShadow: '0 1px 6px #888888'
    }

    const headerStyle = {
        width: '100%',
        display: 'flex',
        height: '10%'
    }

    const titleStyle = {
        width: '90%',
        height: '100%',
        paddingLeft: '10px',
        verticalAlign: 'middle'
    }

    const actionStyle = {
        width: '10%',
        height: '100%',
        verticalAlign: '-webkit-baseline-middle',
        textAlign: 'center'
    }

    const faStyle = {
        cursor: 'pointer',
        fontSize: '24px',
        color: '#fdfdfd',
        WebkitTextStrokeWidth: '1px',
        WebkitTextStrokeColor: 'lightgrey',
        textShadow: '0 1px 2px #888888'
    }

    const noteStyle = {
        height: '90%',
        width: '100%',
        marginLeft: '2%',
        maringRight: '2%'
    }

    return (
        <div style={style}>
            <div style={headerStyle}>
                <div style={titleStyle}>
                    <h2>Placeholder</h2>
                </div>
                <div style={actionStyle}>
                    <FontAwesome name='times' style={faStyle} onClick={() => props.deleteNote(note)} />    
                </div>
                <div style={actionStyle}>
                    <FontAwesome name='ellipsis-v' style={faStyle} onClick={() => props.setEditor({display: true, note: note})}/>
                </div>
            </div>
            <div style={noteStyle} dangerouslySetInnerHTML={{__html: note.html}}>

            </div>
        </div>
    )

}

export default Note;