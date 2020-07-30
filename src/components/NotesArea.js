import React, {Component, useLayoutEffect, useState}from 'react';
import {BrowserView, MobileView, isMobile} from 'react-device-detect';
import Note from './Note';
import Request from './Request';
import CreateNoteButton from './CreateNoteButton';
import axios from 'axios';

class NotesArea extends Component {

    notesRowStyle = {
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
            this.setState({
                data: res.data.Items
            })
        });
    }

    getNoteRows(notes) {
        if(isMobile) {
            return (
                notes.map((note, index) => {
                    return (<div key={index} style={this.notesRowStyle}>
                        <Note key={note.uuid} note={note} updateNote={(note) => this.updateNote(note)} deleteNote={(note) => this.deleteNote(note)}/>
                    </div>)
                })
            )
        } else {
            let notesRowList = [];
            for(let i = 0; i < notes.length; i+=4) {
                let notesElemList = [];
                for(let j = i; j < i + 4 && j < notes.length; j++) {
                    notesElemList.push(<Note key={notes[j].uuid} note ={notes[j]} updateNote={(note) => this.updateNote(note)} deleteNote={(note) => this.deleteNote(note)}/>);
                }
                notesRowList.push(<div key={i/4} style={this.notesRowStyle}>
                    {notesElemList}
                </div>)
            }
            return notesRowList
        }
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
        this.request.del('notes', `uuid=${note.uuid}`)
        .then(res => {
            this.setState({
                data: this.state.data.filter(x => x.uuid !== note.uuid)
            })
        });
    }

    render() {
        return (
            <div>
                {this.getNoteRows(this.state.data)}
                <CreateNoteButton Request={this.request} AddNote={(note) => this.addNote(note)}/>
            </div>
        )
    }
}

export default NotesArea;