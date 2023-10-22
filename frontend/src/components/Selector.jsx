import React from 'react';
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';

/**
 * The Selector component displays a select input field with a label and a list of options.
 *
 * @class Selector
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.label - The label to display for the select input.
 * @param {Array} props.options - An array of options for the select input, each containing a name and a value.
 * @param {string} props.value - The currently selected value of the select input.
 * @param {Function} props.onChange - A callback function to handle changes to the select input value.
 * @param {boolean} [props.optional=false] - Indicates whether an empty ("") option should be included as an optional choice. Defaults to false.
 *
 * @returns {JSX.Element} The Selector component.
 *
 * @example
 * // Example usage of the Selector component
 * <Selector
 *   label="Select an option"
 *   options={[
 *     { name: "Option 1", value: "option1" },
 *     { name: "Option 2", value: "option2" },
 *   ]}
 *   value={selectedOption}
 *   onChange={(event) => handleOptionChange(event)}
 *   optional={true}
 * />
 */

export default class Selector extends React.Component {
  render() {
    const options = this.props.options.map((option) => {
      return (<MenuItem value={option.value} key={option.name}>{option.name}</MenuItem>);
    });
    if (this.props.optional) {
      options.push((<MenuItem value={''} key={''}>{''}</MenuItem>));
    }
    return (
      <FormControl
        sx={{textAlign: 'center'}} fullWidth>
        <InputLabel id={`selector-${this.props.label}`}>{this.props.label}</InputLabel>
        <Select
          labelId={`selector-${this.props.label}`}
          label={this.props.label}
          value={this.props.value}
          onChange={this.props.onChange}
        >
          {options}
        </Select>
      </FormControl>
    );
  }
}
