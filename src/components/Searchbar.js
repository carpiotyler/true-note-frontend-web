import React from 'react';

function SearchBar(props) {
    const componentStyle = {
        width: '65%',
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    }

    const searchStyle = {
        width: '90%',
        borderRadius: '20px',
        borderWidth: '1px',
        borderColor: '#141115',
        outline: 'none',
        height: '60%',
        paddingLeft: '10px',
        color: '#141115'
    }

    return (
        <div style={componentStyle}>
            <input type='text' style={searchStyle} placeholder={`Search ${props.name}(s)`}/>
        </div>
    )
}

export default SearchBar;