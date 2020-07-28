import React from 'react';
import {isMobile} from 'react-device-detect';

function Note({note}) {

    const style = {
        backgroundColor: '@fcfcfc',
        borderRadius: '20px',
        height: '400px',
        width: isMobile? '90%': '15%',
        margin: '2.5%',
        minWidth: '',
        backgroundColor: 'lightgrey',
        padding: '2.5%'
    }

    return (
        <div style={style} dangerouslySetInnerHTML={{__html: note.html}}>
            
        </div>
    )

}

export default Note;