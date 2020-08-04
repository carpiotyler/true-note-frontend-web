import React, {Component} from 'react';
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import FontAwesome from 'react-fontawesome';
import faStyles from 'font-awesome/css/font-awesome.css';
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
}