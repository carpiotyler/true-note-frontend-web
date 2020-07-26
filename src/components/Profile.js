import React from 'react';
import Button from './Button';

function Profile() {
    const componentStyle = {
        width: '20%'
    }

    const buttonStyle = {
        float: 'right',
        marginRight: '5px',
        width: '100px',
        height: '30px',
        backgroundColor: '#fe5f55'
    }

    return (
        <div style = {componentStyle}>
            <Button style={buttonStyle} text='placeholder'/>
        </div>
    )
}

export default Profile;