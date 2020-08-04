import React, {Component} from 'react';
import UserContext from './UserContext';
import Button from './Button';

export default class Profile extends Component {
    componentStyle = {
        width: '30%'
    }

    buttonStyle = {
        float: 'right',
        marginRight: '2%',
        maxWidth: '100px',
        width: '100%',
        height: '30px',
        backgroundColor: '#fe5f55'
    }

    render() {
        return (
            <div style = {this.componentStyle}>
                <UserContext.Consumer>
                    {
                        (state) => {
                            let text = state.context.user_data['cognito:username'];
                            return (
                                <Button style={this.buttonStyle} text={text}/>
                            )
                        }
                    }
                </UserContext.Consumer>
            </div>
        )
    }
}