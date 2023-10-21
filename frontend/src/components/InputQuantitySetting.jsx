import * as React from 'react';
import JimTable from './JimTable';
import MButton from './MButton';
import QuantityInput from './QuantityInput';

/**
 * This component is responsible for rendering an input quantity setting with a title, a quantity input field, and an "Aggiorna" button.
 *
 * @class InputQuantitySetting
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.title - The title to be displayed in the centered paragraph.
 * @param {string} props.value - The current value of the quantity input.
 * @param {string} props.label - The label to be displayed for the quantity input.
 * @param {function} props.onChange - A callback function to be called when the quantity input value changes.
 * @param {function} props.onConfirm - A callback function to be called when the "Aggiorna" button is clicked.
 *
 * @return {JSX.Element} A component containing a centered paragraph, a quantity input field, and a button for updating the quantity setting.
 *
 * @example
 * // Example usage of the InputQuantitySetting component
 * <InputQuantitySetting
 *   title="Settings"
 *   value={quantityValue}
 *   label="Quantity Label"
 *   onChange={handleQuantityChange}
 *   onConfirm={handleConfirm}
 * />
 */

export default class InputQuantitySetting extends React.Component {
  render() {
    return (<JimTable>
      <p style={{textAlign: 'center'}}>{this.props.title}</p>
      <QuantityInput
        label={this.props.label}
        style={{width: '90%', margin: '5%', textAlign: 'center'}}
        value={this.props.value} onChange={this.props.onChange}
      />
      <MButton center text="Aggiorna" onClick={this.props.onConfirm}/>
    </JimTable>);
  }
}
