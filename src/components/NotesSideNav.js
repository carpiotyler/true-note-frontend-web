import React from 'react';
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import FontAwesome from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
 
function NotesSideNav() {
    const componentStyle = {
        width: '10%',
        paddingLeft: '5px'
    }

    const buttonStyle = {
        color: '#fe5f55',
        cursor: 'pointer'
    }

    const navStyle = {

    }

    const handleSelect = function(selected) {

    }
    
    return (
        <div style= {componentStyle}>
            <SideNav onSelect={(selected) => handleSelect(selected)}>
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="notes">
                    <NavItem eventKey="notes">
                        <NavIcon>
                            <i className="fa fa-fw fa-sticky-note" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Notes
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="goals">
                        <NavIcon>
                            <i className="fa fa-fw fa-bullseye" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Goals
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="trends">
                        <NavIcon>
                            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Trends
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </div>
    )
}

export default NotesSideNav