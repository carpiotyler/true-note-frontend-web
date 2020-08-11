import React, {Component} from 'react';
import UserContext from '../utils/UserContext';
import {isMobile} from 'react-device-detect';
import {Button, Dropdown} from 'semantic-ui-react';

export default class Profile extends Component {
    componentStyle = {
        width: isMobile ? 'calc(40% - 20px)' : 'calc(10% - 20px)',
    }

    buttonGroupStyle = {
        float: 'right',
        marginRight: '10%'
    }

    buttonStyle = {
        width: '90%',
        paddingRight: 0,
        paddingLeft: '10px',
        overflowX: 'hidden',
        textOverflow: 'ellipsis'
    }

    dropDownStyle = {
        width: '14px'
    }

    menuStyle = {
        width: '100%',
        height: '0'
    }

    handleChange(selected) {
        // TODO actually logout
        window.location.href = '/'
    }

    render() {
        return (
            <div style = {this.componentStyle}>
                <UserContext.Consumer>
                    {
                        (state) => {
                            let text = state.context.user_data['cognito:username'];
                            let logout = {key: 'logout', icon: 'log out', text: 'Log Out'}
                            return (
                                <Button.Group style={this.buttonGroupStyle} color='purple'>
                                    <Button style={this.buttonStyle}>{text}</Button>
                                    <Dropdown style= {this.dropDownStyle} className = 'button icon' floating options={[logout]} trigger={<></>} onChange={(selected) => this.handleChange(selected)}/>
                                </Button.Group>
                            )
                        }
                    }
                </UserContext.Consumer>
            </div>
        )
    }
}