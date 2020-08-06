import React, {Component} from 'react';
import UserContext from '../utils/UserContext';
import {Button, Dropdown} from 'semantic-ui-react';

export default class Profile extends Component {
    componentStyle = {
        width: '30%',
        float: 'right',
        marginRight: '2%'
    }

    buttonStyle = {
        maxWidth: '100px',
        width: '100%'
    }

    dropDownStyle = {
        width: '14px'
    }

    menuStyle = {
        width: '100%',
        height: '0'
    }

    constructor() {
        super()
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
                                <Button.Group style={this.componentStyle} color='purple'>
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