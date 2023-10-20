import * as React from 'react';
import JimTable from './JimTable';
import Selector from './Selector';

/**
 * This component is responsible for rendering an input selector setting with a title, a selector component, and options.
 *
 * @class InputSelectorSetting
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.title - The title to be displayed in the centered paragraph.
 * @param {string} props.label - The label to be displayed for the selector.
 * @param {string} props.value - The current value of the selector.
 * @param {Array} props.options - An array of options for the selector.
 * @param {function} props.onChange - A callback function to be called when the selector value changes.
 *
 * @return {JSX.Element} A component containing a centered paragraph, a selector input field, and options.
 *
 * @example
 * // Example usage of the InputSelectorSetting component
 * <InputSelectorSetting
 *   title="Settings"
 *   label="Selector Label"
 *   value={selectorValue}
 *   options={selectorOptions}
 *   onChange={handleSelectorChange}
 * />
 */


export default class InputSelectorSetting extends React.Component {
  render() {
    return (<JimTable>
      <p style={{textAlign: 'center'}}>{this.props.title}</p>
      <Selector
        label={this.props.label}
        value={this.props.value}
        onChange={this.props.onChange}
        options={this.props.options}/>
    </JimTable>);
  }
}
