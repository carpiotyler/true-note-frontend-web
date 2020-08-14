import React, {useRef} from 'react';
import {Sidebar, Button, Menu, Icon} from 'semantic-ui-react';
 
export default function NotesSidenav() {
    const navSelected = window.location.href.split('/')[window.location.href.split('/').length - 1];
    const [visible, setVisible] = React.useState(false)

    const navButtonStyle = {
        backgroundColor: '#fcfcfc',
        width: '60px'
    }

    const sideBarStyle = {
        backgroundColor: '#a333c8',
        transition: 'transform .25s ease'
    }

    const handleNav = function(nav) {
        if(nav === 'home') {
            window.location.href = '/'
        } else if(!window.location.href.endsWith(nav)) {
            window.location.href = `/app/${nav}`;
        }
    }


    return (
        <div>
            <Button style={navButtonStyle} onClick={() => setVisible(!visible)}>
                <Icon name='bars' size='big' color='purple' />
            </Button>
            <Sidebar
                as={Menu}
                icon='labeled'
                inverted
                onHide={() => setVisible(false)}
                vertical
                visible={visible}
                width='thin'
                style={sideBarStyle}
            >
                <Menu.Item as='a' onClick={() => handleNav('todos')}>
                    <Icon name='check circle outline' />
                    Todos
                </Menu.Item>
                <Menu.Item as='a' onClick={() => handleNav('notes')}>
                    <Icon name='sticky note outline' />
                    Notes
                </Menu.Item>
                <Menu.Item as='a' onClick={() => handleNav('goals')}>
                    <Icon name='target' />
                    Goals
                </Menu.Item>
                <Menu.Item as='a' onClick={() => handleNav('trends')}>
                    <Icon name='chart bar'/>
                    Trends
                </Menu.Item>
            </Sidebar>
        </div>
    )
}