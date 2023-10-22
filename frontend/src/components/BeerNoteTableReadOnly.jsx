import React from 'react';
import {NOTE_TYPE_ICONS} from '../utils/Protocol';
import DedicatedTable from './DedicatedTable';

const COLUMNS = [
  {title: 'Tipo', key: 'noteType'},
  {title: 'Descrizione\'', key: 'description'},
];

/**
 * This class represents a read-only component for displaying beer notes in a table.
 * @class BeerNoteTableReadOnly
 *
 * @param {Object} props - The component's properties.
 * @param {Array<Object>} props.notes - An array of beer notes to display in the table.
 *
 * @returns {JSX.Element} The rendered BeerNoteTableReadOnly component.
 *
 * @example
 * // Example usage of the BeerNoteTableReadOnly component:
 * <BeerNoteTableReadOnly notes={noteList} />
 */

export default class BeerNoteTableReadOnly extends React.Component {
  render() {
    const rows = this.props.notes.map((note) => {
      return {
        key: note.noteID,
        noteType: (<p style={{textAlign: 'center', fontStyle: 'italic', fontSize: 20, vertialAlign: 'center', wordSpacing: 10}}>{NOTE_TYPE_ICONS[note.noteType]} {note.noteType}</p>),
        description: note.description,
      };
    });
    return <DedicatedTable rows={rows} columns={COLUMNS}/>;
  }
}
