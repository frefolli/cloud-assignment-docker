import React from 'react';
import DedicatedTable from './DedicatedTable';

const COLUMNS = [
  {title: 'Immagine', key: 'icon', sortable: false},
  {title: 'Nome', key: 'name'},
  {title: 'Quantita\'', key: 'quantity'},
];

/**
 * The RecipeIngredientTableReadOnly component displays a read-only table of ingredients for a recipe. It allows users to view ingredients with icons, names, and quantities.
 *
 * @class RecipeIngredientTableReadOnly
 *
 * @param {Object} props - The component's properties.
 * @param {Array} props.ingredients - An array of ingredients for the recipe.
 *
 * @returns {JSX.Element} The RecipeIngredientTableReadOnly component.
 *
 * @example
 * // Example usage of the RecipeIngredientTableReadOnly component
 * <RecipeIngredientTableReadOnly ingredients={recipe.ingredients} />
 */

export default class RecipeIngredientTableReadOnly extends React.Component {
  render() {
    const rows = this.props.ingredients.map((ingredient) => {
      return {
        key: ingredient.ingredientID,
        icon: (<img
          className="shoppingImage"
          src={`../../icons/inventory-icons/${ingredient.name}.png`}
          alt={ingredient.name}
          onError={(e) => {
            e.target.src = '../../icons/inventory-icons/sconosciuto.png';
          }}
        />),
        name: ingredient.name,
        quantity: ingredient.quantity,
      };
    });
    return <DedicatedTable rows={rows} columns={COLUMNS}/>;
  }
}
