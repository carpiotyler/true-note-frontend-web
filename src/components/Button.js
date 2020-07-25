import React from 'react';

function Button(props) {
    const style = {
        color: '#fcfcfc',
        backgroundColor: '#7699d4',
        border: 0,
        height: props.height || '40px',
        width: props.width || '80px',
        borderRadius: props.height || '40px',
        outline: 'none',
        cursor: 'pointer',
    };

    return (
        <button style={style} onClick={props.onClick}>{props.text}</button>
    );
}

export default Button;