import React, {Component, useLayoutEffect, useState}from 'react';
import {BrowserView, MobileView, isMobile} from 'react-device-detect';
import Note from './Note';
import CreateNoteButton from './CreateNoteButton';
import axios from 'axios';

class NotesArea extends Component {

    style = {
        width: '100%',
        display: 'flex',
        justifyContent: isMobile ? 'center': 'end'
    }

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
        this.id_token= props.id_token;
        this.access_token= props.access_token;
    }

    componentDidMount() {
        axios.get(`https://am3jjrqi13.execute-api.us-east-2.amazonaws.com/prod/notes?id_token=${this.id_token}&access_token=${this.access_token}`, {headers: {"Access-Control-Allow-Origin": "*"}})
        .then(res => {
            console.log(res.data.Items)
            this.setState({
                data: res.data.Items
            })
        });
    }

    render() {
        return (
            <div style={this.style}>
                {this.state.data.map(note => {
                    return (
                        <Note key={note.uuid} note={note}/>
                    )
                })}
                <CreateNoteButton />
            </div>
        )
    }
}

export default NotesArea;