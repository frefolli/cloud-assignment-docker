import { TextField } from '@mui/material';
import * as React from 'react';
import JimTable from './JimTable';
import MButton from './MButton';

/**
 * This component is responsible for rendering an input field with a label, a button, and a centered paragraph for displaying a title.
 * 
 * @class InputFieldSetting
 * 
 * @param {Object} props - The component's properties.
 * @param {string} props.title - The title to be displayed in the centered paragraph.
 * @param {string} props.value - The current value of the input field.
 * @param {string} props.label - The label to be displayed for the input field.
 * @param {function} props.onChange - A callback function to be called when the input value changes.
 * @param {function} props.onConfirm - A callback function to be called when the "Aggiorna" button is clicked.
 * 
 * @return {JSX.Element} A component containing a centered paragraph, an input field, and a button for updating the input value.
 * 
 * @example
 * // Example usage of the InputFieldSetting component
 * <InputFieldSetting
 *   title="Settings"
 *   value={settingValue}
 *   label="Setting Label"
 *   onChange={handleInputChange}
 *   onConfirm={handleConfirm}
 * />
 */

export default class InputFieldSetting extends React.Component {
    render() {
        return (<JimTable>
            <p style={{textAlign: "center"}}>{this.props.title}</p>
            <TextField
                sx={{width: "90%", margin: "5%", textAlign:"center"}}
                value={this.props.value} onChange={this.props.onChange}
                id="outlined-basic" label={this.props.label} variant="outlined"/>
            <MButton center text="Aggiorna" onClick={this.props.onConfirm}/>
        </JimTable>)
    }
}