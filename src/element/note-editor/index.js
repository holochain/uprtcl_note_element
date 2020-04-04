import { LitElement, html } from 'lit-element';
import { moduleConnect } from '@uprtcl/micro-orchestrator';
import { ApolloClientModule } from '@uprtcl/graphql';
import gql from 'graphql-tag'

export class NoteEditor extends moduleConnect(LitElement) {
  static get properties() {
    return {
      listNotes: { type: Array },
      editingNoteId: { type: String }
    };
  }

  async firstUpdated() {
    this.apolloClient = this.request(ApolloClientModule.bindings.Client)
    this.loadNotes()
  }

  render() { 
    if (this.listNotes === undefined ) {
      return html`<p>No Notes</p>`
    }
    return html`
      ${this.listNotes.map(note => this.renderNote(note))}
      ${this.renderEditNote({ title: '', content: '' })}
    `;
  }

  renderNote (note) {
    if (note.id === this.editingNoteId) {
      return this.renderEditNote(note)
    }
    return html`
      <div className='note-card' data-testid='note-card'>
        <h3>${note.title}</h3>
        <div className='note-content'>${note.content}</div>
        <button className='button' @click=${() => this.editingNoteId=note.id}>Edit</button>
        <button @click=${() => removeNote({ variables: { note } })}>Remove</button>
      </div>
    `;
  }

  renderEditNote (note) {
    return html`
      <mwc-textfield label="Title" id="title" .value=${note.title} @change=${ e => { this.currentTitle = e.target.value }}></mwc-textfield>
      <mwc-textarea outlined label="Content" id="content" .value=${note.content} @change=${ e => { this.currentContent = e.target.value }}></mwc-textarea>
      <mwc-button outlined label="outlined" @click=${() => this.editNote(note)}></mwc-button>
    `;
  }

  async loadNotes () {
    this.listNotes = await this.apolloClient.query({ query: gql`{listNotes {id}}`})
  }

  async editNote (note) {
    if (note.id !== undefined) {
      const newNote = await this.apolloClient.mutation({ mutation: gql`{createNote (note_input)}`, variables: {note_input: NoteInput}})
      this.listNotes.push(newNote)
      this.requestUpdate()
    } else {
      const existingNote = this.listNotes.find(listNote => listNote.id === note.id )
      existingNote.title = this.currentTitle
      existingNote.content = this.currentContent
      // Check result worked.
      await this.apolloClient.mutation({ mutation: gql`{updateNote (note)}`, variables: {existingNote: Note}})
      this.requestUpdate()
    }

  }
}
