import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {NOTE_TYPE_OPTIONS as OPTIONS} from '../utils/Protocol';

/**
 * This component provides an Autocomplete input for selecting a note type.
 *
 * @class NoteTypeInput
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.onChange - A callback function to handle changes in the selected note type.
 *
 * @returns {JSX.Element} The NoteTypeInput component for selecting a note type.
 *
 * @example
 * // Example usage of the NoteTypeInput component
 * <NoteTypeInput value={selectedNoteType} onChange={handleNoteTypeChange} />
 */

export default class NoteTypeInput extends React.Component {
  render() {
    return (<Autocomplete
      id="free-solo-demo"
      disableClearable
      options={OPTIONS}
      renderInput={(params) => <TextField {...params} label="NoteType" />}
      value={this.props.value}
      onInputChange={(e, value) => {
        if (OPTIONS.includes(value)) {
          this.props.onChange({target: {value: value}});
        }
      }
      }
      data-testid="note-type-input"
    />);
  }
}
