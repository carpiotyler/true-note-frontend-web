import React from 'react';
import {Input} from 'semantic-ui-react';

function SearchBar(props) {
    const componentStyle = {
        width: '70%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '14px'
    }
    const searchStyle = {
        width: '90%',
        borderRadius: '20px',
        borderWidth: '1px',
        borderColor: '#141115',
        outline: 'none',
        color: '#141115'
    }

    return (
        <div style={componentStyle}>
            <Input placeholder="Search..." style={searchStyle}/>
        </div>
    )
}

export default SearchBar;