import React from 'react';

function Button(props) {
    const style = Object.assign({
        color: '#fcfcfc',
        backgroundColor: '#7699d4',
        border: 0,
        height: '40px',
        width: '80px',
        borderRadius:'40px',
        outline: 'none',
        cursor: 'pointer',
    }, props.style);

    return (
        <button style={style} onClick={props.onClick}>{props.text}</button>
    );
}

export default Button;