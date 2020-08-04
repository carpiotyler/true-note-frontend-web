import React, {Component, useContext}from 'react';
import {BrowserView, MobileView, isMobile} from 'react-device-detect';
import Note from './Note';
import Request from './Request';
import Editor from './NotesEditor';
import LoadingOverlay from 'react-loading-overlay';
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
            },
            loading: false
        }
        this.request = new Request(props.id_token, props.access_token);
    }

    componentDidMount() {
        this.request.get('notes')
        .then(res => {
            this.setData(res.data.Items);
            this.setLoading(false);
        });
        this.setLoading(true);
    }

    setData(data) {
        this.setState(Object.assign({}, this.state, {data: data}));
    }

    setEditor(editor) {
        this.setState(Object.assign({}, this.state, {editor: editor}));
    }

    setLoading(bool) {
        this.setState(Object.assign({}, this.state, {loading: bool}));
    }

    setLoadingAndEditor(loading, editor) {
        this.setState(Object.assign({}, this.state, {loading: loading}, {editor: editor}));
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
            this.setLoading(false);
        });
        this.setLoadingAndEditor(true, {
            display: false,
            note: null
        });
    }

    updateNote(uuid, html) {
        this.request.patch('notes', {uuid: uuid, html: html})
        .then(res => {
            console.log(res.data);
            let note = res.data;
            let data = this.state.data;
            let existingNote = data.find(x => x.uuid === note.uuid);
            Object.assign(existingNote, note);
            this.setLoading(false);
        });
        this.setLoadingAndEditor(true, {
            display: false,
            note: null
        });
    }

    deleteNote(note) {
        this.request.del('notes', `uuid=${note.uuid}`)
        .then(res => {
            this.setState({
                data: this.state.data.filter(x => x.uuid !== note.uuid),
                editor: {
                    display: false,
                    note: null
                }
            });
            this.setLoading(false);
        });
        this.setLoading(true);
    }

    handleEdit(html) {
        if(html) {
            let uuid = this.state.editor.note?.uuid
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

    style = {
        overflow: 'auto',
        height: '95vh'
    }

    render() {
        let conditionalJSX = this.state.editor.display ? (<Editor note ={this.state.editor.note} onDone={(note) => this.handleEdit(note)}/>) : (<CreateNoteButton setEditor={(editor) =>this.setEditor(editor)}/>);
        return (
            <LoadingOverlay active={this.state.loading} spinner text='Loading...'>
                <div style={this.style}>
                        {this.getNoteRows(this.state.data)}
                        {conditionalJSX}
                </div>
            </LoadingOverlay>
        )
    }
}

export default NotesArea;