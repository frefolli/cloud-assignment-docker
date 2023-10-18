import { TextField } from "@mui/material";
import React from "react";

const isValidQuantity = (quantity) => {
  return ((!isNaN(quantity)) && (quantity >= 0));
}

const isValidInput = (newValue) => {
  if (newValue === "")
    return true;
  const parsedValue = Number(newValue);
  return isValidQuantity(parsedValue);

}

/**
 * This component provides an input field for specifying a quantity, with validation to ensure non-negative numbers.
 *
 * @class QuantityInput
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.onChange - A callback function to handle changes in the input value.
 * @param {string} props.label - The label for the input field.
 * @param {Object} [props.style] - Optional CSS style to be applied to the input field.
 *
 * @returns {JSX.Element} The QuantityInput component for specifying a quantity.
 *
 * @example
 * // Example usage of the QuantityInput component
 * <QuantityInput value={quantity} onChange={handleQuantityChange} label="Quantity" style={{ width: "100%" }} />
 */

class QuantityInput extends React.Component {
  handleValue = (event) => {
    const newValue = event.target.value;
    if (isValidInput(newValue))
      this.props.onChange({target: {value: newValue}});
  }

  handleBlur = (event) => {
    let newValue = event.target.value;
    if (isValidInput(newValue))
      this.props.onChange({target: {value: ""+Number(newValue)}});
  }

  render() {
    const theStile = this.props.style || {width: "100%", textAlign:"center"}
    return (
        <TextField
          sx={theStile}
          type="text"
          data-testid="shopping-quantity"
          value={this.props.value}
          onChange={this.handleValue}
          onBlur={this.handleBlur}
          label={this.props.label}
        />
    );
  }
}

export default QuantityInput;