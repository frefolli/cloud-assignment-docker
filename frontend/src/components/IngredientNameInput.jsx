import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {INGREDIENT_NAME_OPTIONS as OPTIONS} from '../utils/Protocol';

/**
 * This component is responsible for rendering an input field with autocomplete functionality for selecting ingredient names.
 *
 * @class IngredientNameInput
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.value - The current value of the input field.
 * @param {function} props.onChange - A callback function to be called when the input value changes.
 *
 * @return {JSX.Element} An Autocomplete component with a freeSolo input field for selecting ingredient names.
 *
 * @example
 * // Example usage of the IngredientNameInput component
 * <IngredientNameInput value={ingredientName} onChange={handleIngredientNameChange} />
 */

export default class IngredientNameInput extends React.Component {
  render() {
    return (<Autocomplete
      id="free-solo-demo"
      freeSolo
      options={OPTIONS}
      renderInput={(params) => <TextField {...params} label="Ingredient Name" />}
      value={this.props.value}
      onInputChange={(e, value) => {
        this.props.onChange({target: {value: value}});
      }
      }
      data-testid="ingredient-name-input"
    />);
  }
}
