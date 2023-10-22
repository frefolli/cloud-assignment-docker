import {TextField} from '@mui/material';
import * as React from 'react';
import JimTable from './JimTable';
import MButton from './MButton';

/**
 * This component is responsible for rendering an input text area setting with a title, a text area input field, and an "Aggiorna" button.
 *
 * @class InputTextAreaSetting
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.title - The title to be displayed in the centered paragraph.
 * @param {string} props.label - The label to be displayed for the text area input.
 * @param {string} props.value - The current value of the text area input.
 * @param {function} props.onChange - A callback function to be called when the text area value changes.
 * @param {function} props.onConfirm - A callback function to be called when the "Aggiorna" button is clicked.
 *
 * @return {JSX.Element} A component containing a centered paragraph, a text area input field, and an "Aggiorna" button.
 *
 * @example
 * // Example usage of the InputTextAreaSetting component
 * <InputTextAreaSetting
 *   title="Settings"
 *   label="Text Area Label"
 *   value={textAreaValue}
 *   onChange={handleTextAreaChange}
 *   onConfirm={handleConfirm}
 * />
 */

export default class InputTextAreaSetting extends React.Component {
  render() {
    return (<JimTable>
      <p style={{textAlign: 'center'}}>{this.props.title}</p>
      <TextField
        label={this.props.label}
        multiline
        sx={{width: '90%', margin: '5%', textAlign: 'center'}}
        value={this.props.value}
        type="text" onChange={this.props.onChange}
      />
      <MButton center text="Aggiorna" onClick={this.props.onConfirm}/>
    </JimTable>);
  }
}
