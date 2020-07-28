import React, {Component, useLayoutEffect, useState}from 'react';
import {BrowserView, MobileView, isMobile} from 'react-device-detect';
import Note from './Note';
import Request from './Request';
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
        this.request = new Request(props.id_token, props.access_token);
    }

    componentDidMount() {
        this.request.get('notes')
        .then(res => {
            console.log(res.data.Items)
            this.setState({
                data: res.data.Items
            })
        });
    }

    addNote(note) {
        let data = this.state.data;
        data.unshift(note)
        this.setState({
          data: data
        })
    }

    updateNote(note) {

    }

    deleteNote(note) {

    }

    render() {
        return (
            <div style={this.style}>
                {this.state.data.map(note => {
                    return (
                        <Note key={note.uuid} note={note}/>
                    )
                })}
                <CreateNoteButton Request={this.request} AddNote={(note) => this.addNote(note)}/>
            </div>
        )
    }
}

export default NotesArea;