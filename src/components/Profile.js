import React from 'react';
import Button from './Button';

function Profile() {
    const componentStyle = {
        width: '25%'
    }

    const buttonStyle = {
        float: 'right',
        marginRight: '5%',
        maxWidth: '100px',
        width: '100%',
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