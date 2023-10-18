import React from "react";
import DedicatedTable from "./DedicatedTable";
import IngredientNameInput from "./IngredientNameInput";
import QuantityInput from "./QuantityInput";
import IconButton from '@mui/material/IconButton';
import { Tooltip } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const COLUMNS = [
    {title: "Nome", key: "name"},
    {title: "Quantita'", key: "quantity"},
    {title: "Azioni", key: "toolbox", sortable: false}
]

/**
 * The ShoppingIngredientTable component displays a table of shopping ingredients.
 *
 * @class ShoppingIngredientTable
 *
 * @param {Object} props - The component's properties.
 * @param {Array} props.ingredients - An array of shopping ingredients to display in the table.
 * @param {string} props.newIngredientName - The name of a new shopping ingredient to add.
 * @param {string} props.newIngredientQuantity - The quantity of a new shopping ingredient to add.
 * @param {Function} props.editQuantity - A callback function to handle editing the quantity of a shopping ingredient.
 * @param {Function} props.deleteIngredient - A callback function to handle deleting a shopping ingredient.
 * @param {Function} props.setNewIngredientName - A callback function to set the name of a new shopping ingredient.
 * @param {Function} props.setNewIngredientQuantity - A callback function to set the quantity of a new shopping ingredient.
 * @param {Function} props.addIngredient - A callback function to add a new shopping ingredient.
 *
 * @returns {JSX.Element} The ShoppingIngredientTable component.
 *
 * @example
 * // Example usage of the ShoppingIngredientTable component
 * <ShoppingIngredientTable
 *   ingredients={shoppingIngredients}
 *   newIngredientName={newName}
 *   newIngredientQuantity={newQuantity}
 *   editQuantity={(name, event) => handleEditQuantity(name, event)}
 *   deleteIngredient={(name) => handleDeleteIngredient(name)}
 *   setNewIngredientName={(event) => handleSetNewName(event)}
 *   setNewIngredientQuantity={(event) => handleSetNewQuantity(event)}
 *   addIngredient={() => handleAddIngredient()}
 * />
 */

export default class ShoppingIngredientTable extends React.Component {
    render() {
        const rows = this.props.ingredients.map((ingredient) => {
            return {
                key: ingredient.name,
                name: ingredient.name,
                quantity: (<QuantityInput label="Quantity" value={ingredient.quantity} onChange={(event) => this.props.editQuantity(ingredient.name, event)}/>),
                toolbox: (<div>
                    <Tooltip title="Elimina">
                        <IconButton aria-label="Elimina" onClick={() => this.props.deleteIngredient(ingredient.name)}>
                            <RemoveShoppingCartIcon />
                        </IconButton>
                    </Tooltip>
                </div>)
            }
        })
        const pivotRow = {
            key: "",
            name: (<IngredientNameInput value={this.props.newIngredientName} onChange={this.props.setNewIngredientName}/>),
            quantity: (<QuantityInput label="Quantity" value={this.props.newIngredientQuantity} onChange={this.props.setNewIngredientQuantity}/>),
            toolbox: (<Tooltip title="Aggiungi">
                        <IconButton aria-label="Aggiungi" onClick={() => this.props.addIngredient()}>
                            <AddShoppingCartIcon />
                        </IconButton>
                    </Tooltip>)
        };

        return <DedicatedTable rows={rows} columns={COLUMNS} pivotRow={pivotRow}/>
    }
}