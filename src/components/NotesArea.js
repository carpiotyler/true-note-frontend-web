import React, {Component, useState}from 'react';
import {BrowserView, MobileView, isMobile} from 'react-device-detect';
import Note from './Note';
import Request from './Request';
import Editor from './NotesEditor';
import CreateNoteButton from './CreateNoteButton';

class NotesArea extends Component {

    notesRowStyle = {
        width: '100%',
        display: 'flex',
        justifyContent: isMobile ? 'center': 'end'
    }

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            editor: {
                display: false,
                note: null
            }
        }
        this.request = new Request(props.id_token, props.access_token);
    }

    componentDidMount() {
        this.request.get('notes')
        .then(res => {
            this.setState({
                data: res.data.Items,
                editor: {
                    display: false,
                    note: null
                }
            })
        });
    }

    setEditor(editor) {
        this.setState({
            data: this.state.data,
            editor: editor
        });
    }

    getNoteRows(notes) {
        if(isMobile) {
            return (
                notes.map((note, index) => {
                    return (<div key={index} style={this.notesRowStyle}>
                        <Note key={note.uuid} note={note} setEditor={(editor) => this.setEditor(editor)} deleteNote={(note) => this.deleteNote(note)}/>
                    </div>)
                })
            )
        } else {
            let notesRowList = [];
            for(let i = 0; i < notes.length; i+=4) {
                let notesElemList = [];
                for(let j = i; j < i + 4 && j < notes.length; j++) {
                    notesElemList.push(<Note key={notes[j].uuid} note ={notes[j]} setEditor={(editor) => this.setEditor(editor)} deleteNote={(note) => this.deleteNote(note)}/>);
                }
                notesRowList.push(<div key={i/4} style={this.notesRowStyle}>
                    {notesElemList}
                </div>)
            }
            return notesRowList
        }
    }

    createNote(html) {
        this.request.post('notes', {html: html})
        .then(res => {
            let note = res.data;
            let data = this.state.data;
            data.unshift(note)
            this.setEditor({
                display: false,
                note: null
            })
        })
        .catch(err => {
            console.error(err);
        });
    }

    updateNote(note) {
        
    }

    deleteNote(note) {
        this.request.del('notes', `uuid=${note.uuid}`)
        .then(res => {
            this.setState({
                data: this.state.data.filter(x => x.uuid !== note.uuid),
                editor: {
                    display: false,
                    uuid: null
                }
            })
        });
    }

    handleEdit(html) {
        if(html) {
            let uuid = this.state.editor.uuid
            if(uuid) {
                // Update
                this.updateNote(uuid, html);
            } else {
                // Create
                this.createNote(html);
            }
        } else {
            // Just closing
            this.setState({
                data: this.state.data,
                editor: {
                    display: false,
                    uuid: null
                }
            })
        }
    }

    render() {
        let conditionalJSX = this.state.editor.display ? (<Editor note ={this.state.editor.note} onDone={(note) => this.handleEdit(note)}/>) : (<CreateNoteButton setEditor={(editor) =>this.setEditor(editor)}/>);
        return (
            <div>
                {this.getNoteRows(this.state.data)}
                {conditionalJSX}
            </div>
        )
    }
}

export default NotesArea;