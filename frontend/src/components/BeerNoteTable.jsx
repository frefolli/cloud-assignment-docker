import {TextField, Tooltip} from '@mui/material';
import React from 'react';
import DedicatedTable from './DedicatedTable';
import NoteTypeInput from './NoteTypeInput';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';

const COLUMNS = [
  {title: 'Tipo', key: 'noteType'},
  {title: 'Descrizione\'', key: 'description'},
  {title: 'Azioni', key: 'toolbox', sortable: false},
];

/**
 * This class represents a component for displaying and managing beer notes in a table.
 * @class BeerNoteTable
 *
 * @param {Object} props - The component's properties.
 * @param {Array<Object>} props.notes - An array of beer notes to display in the table.
 * @param {string} props.newNoteType - The new note type for adding notes.
 * @param {string} props.newDescription - The new description for adding notes.
 * @param {function} props.setNewNoteType - A callback function to set the new note type.
 * @param {function} props.setNewDescription - A callback function to set the new description.
 * @param {function} props.editNote - A callback function to edit an existing note.
 * @param {function} props.deleteNote - A callback function to delete an existing note.
 * @param {function} props.handleNoteTypeChange - A callback function to handle changes to note types.
 * @param {function} props.handleDescriptionChange - A callback function to handle changes to note descriptions.
 * @param {function} props.addNote - A callback function to add a new note.
 *
 * @returns {JSX.Element} The rendered BeerNoteTable component.
 *
 * @example
 * // Example usage of the BeerNoteTable component:
 * <BeerNoteTable
 *   notes={noteList}
 *   newNoteType="New Type"
 *   newDescription="New Description"
 *   setNewNoteType={handleNewNoteType}
 *   setNewDescription={handleNewDescription}
 *   editNote={handleEditNote}
 *   deleteNote={handleDeleteNote}
 *   handleNoteTypeChange={handleTypeChange}
 *   handleDescriptionChange={handleDescriptionChange}
 *   addNote={handleAddNote}
 * />
 */

export default class BeerNoteTable extends React.Component {
  render() {
    const rows = this.props.notes.map((note) => {
      return {
        key: note.noteID,
        noteType: (<NoteTypeInput value={note.noteType} onChange={(event) => this.props.handleNoteTypeChange(event, note)}/>),
        description: (<TextField label="Description" multiline sx={{width: '90%'}} value={note.description} data-testid="note-type-textarea" onChange={(event) => this.props.handleDescriptionChange(event, note)}/>),
        toolbox: (<div>
          <Tooltip title="Aggiorna">
            <IconButton aria-label="V" onClick={() => this.props.editNote(note)}>
              <DoneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Elimina">
            <IconButton aria-label="X" onClick={() => this.props.deleteNote(note)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>),
      };
    });
    const pivotRow = {
      key: 'pivot',
      noteType: (<NoteTypeInput value={this.props.newNoteType} onChange={this.props.setNewNoteType}/>),
      description: (<TextField label="Description" multiline sx={{width: '90%'}} value={this.props.newDescription} data-testid="note-type-textarea" onChange={this.props.setNewDescription}/>),
      toolbox: (<Tooltip title="Aggiungi">
        <IconButton aria-label="Aggiungi" onClick={this.props.addNote}>
          <AddIcon />
        </IconButton>
      </Tooltip>),
    };

    return <DedicatedTable rows={rows} columns={COLUMNS} pivotRow={pivotRow}/>;
  }
}
