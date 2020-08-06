import React from 'react';
import {Card} from 'semantic-ui-react'
import {isMobile} from 'react-device-detect';
import moment from 'moment';

function Goal(props) {
    const goal = props.goal;
    
    const style = {
        backgroundColor: '#fcfcfc',
        height: '400px',
        width: isMobile ? '95%' : '23%',
        margin: isMobile? '2.5%': '1%'
    }

    const cardstyle = {
        height: '100%',
        width: '100%'
    }

    return (
        <div style={style}>
            <Card style={cardstyle}>

            </Card>
        </div>
    )

}

export default Goal;