import React, {Component}from 'react';
import {isMobile} from 'react-device-detect';
import Note from './Note';
import Request from '../../utils/Request';
import {Loader, Dimmer} from 'semantic-ui-react'
import NotesEditor from './NotesEditor';

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

    setLoading(bool) {
        this.setState(Object.assign({}, this.state, {loading: bool}));
    }

    set(key, value) {
        let params = {};
        params[key]= value;
        this.setState(Object.assign({}, this.state, params));
    }

    getNoteRows(notes) {
        if(isMobile) {
            return (
                notes.map((note, index) => {
                    return (<div key={index} style={this.notesRowStyle}>
                        <Note key={note.uuid} note={note} editNote={(editorState) => this.handleEdit(editorState)} deleteNote={(note) => this.deleteNote(note)}/>
                    </div>)
                })
            )
        } else {
            let notesRowList = [];
            for(let i = 0; i < notes.length; i+=4) {
                let notesElemList = [];
                for(let j = i; j < i + 4 && j < notes.length; j++) {
                    notesElemList.push(<Note key={notes[j].uuid} note ={notes[j]} editNote={(editorState) => this.handleEdit(editorState)} deleteNote={(note) => this.deleteNote(note)}/>);
                }
                notesRowList.push(<div key={i/4} style={this.notesRowStyle}>
                    {notesElemList}
                </div>)
            }
            return notesRowList
        }
    }

    createNote(editorState) {
        this.request.post('notes', {title: editorState.title, html: editorState.html})
        .then(res => {
            let note = res.data;
            let data = this.state.data;
            data.unshift(note)
            this.set('loading', false);
        });
        this.set('loading', true);
    }

    updateNote(editorState) {
        this.request.patch('notes', {uuid: editorState.uuid, title: editorState.title, html: editorState.html})
        .then(res => {
            let note = res.data;
            let data = this.state.data;
            let existingNote = data.find(x => x.uuid === note.uuid);
            Object.assign(existingNote, note);
            this.set('loading', false)
        });
        this.set('loading', true)
    }

    deleteNote(note) {
        this.request.del('notes', `uuid=${note.uuid}`)
        .then(res => {
            this.set('data', this.state.data.filter(x => x.uuid !== note.uuid));
            this.set('loading', false);
        });
        this.set('loading', true);
    }

    handleEdit(editorState) {
        if(editorState) {
            let uuid = editorState.uuid;
            if(uuid) {
                // Update
                this.updateNote(editorState);
            } else {
                // Create
                this.createNote(editorState);
            }
        }
    }

    style = {
        overflow: 'auto',
        height: '95vh'
    }

    render() {
        return (
            <div style={this.style}>
                <Dimmer active={this.state.loading} style={{opacity: '0.3'}}>
                    <Loader active={this.state.loading} />
                </Dimmer>
                {this.getNoteRows(this.state.data)}
                <NotesEditor onDone={(editorState) => this.handleEdit(editorState)}/>
            </div>
        )
    }
}

export default NotesArea;