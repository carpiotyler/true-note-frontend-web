import React from 'react';
import {isMobile} from 'react-device-detect';

function Note({note}) {

    const style = {
        backgroundColor: '#fcfcfc',
        borderRadius: '5px',
        height: '400px',
        width: '18%',
        margin: '1%',
        padding: '2.5%',
        boxShadow: '0 1px 6px #888888'
    }

    return (
        <div style={style} dangerouslySetInnerHTML={{__html: note.html}}>
            
        </div>
    )

}

export default Note;