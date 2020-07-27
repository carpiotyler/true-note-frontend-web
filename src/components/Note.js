import React from 'react';
import {isMobile} from 'react-device-detect';
import MarkdownIt from 'markdown-it';

function Note({note}) {
    const md = new MarkdownIt();

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
        <div style={style} dangerouslySetInnerHTML={{__html: md.render(note.markdown)}}>
            
        </div>
    )

}

export default Note;