import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react';
import SideNav, {NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
 
export default class NotesSideNav extends Component {
    componentStyle = {
        width: '64px'
    }

    buttonStyle = {
        color: '#fe5f55',
        cursor: 'pointer'
    }

    navStyle = {
        backgroundColor: '#a333c8'
    }

    handleSelect = function(selected) {
        if(!window.location.href.endsWith(selected)) {
            window.location.href = `/app/${selected}`;
        }
    }
    
    render() {
        const navSelected = window.location.href.split('/')[window.location.href.split('/').length - 1];
        return (
            <div style= {this.componentStyle}>
                <SideNav style={this.navStyle} onSelect={(selected) => this.handleSelect(selected)}>
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected={navSelected}>
                        <NavItem eventKey="notes">
                            <NavIcon>
                                <Icon name="sticky note outline" size="large"/>
                            </NavIcon>
                            <NavText>
                                Notes
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="goals">
                            <NavIcon>
                                <Icon name="target" size="large"/>
                            </NavIcon>
                            <NavText>
                                Goals
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="trends">
                            <NavIcon>
                                <Icon name="chart bar" size="large"/>
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
}