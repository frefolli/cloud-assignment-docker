import React from "react";
import DedicatedTable from "./DedicatedTable";
import IngredientNameInput from "./IngredientNameInput";
import QuantityInput from "./QuantityInput";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { Tooltip } from "@mui/material";

const COLUMNS = [
    {title: "Nome", key: "name"},
    {title: "Quantita'", key: "quantity"},
    {title: "Azioni", key: "toolbox", sortable: false}
]

/**
 * The RecipeIngredientTable component displays a table of ingredients for a recipe. It allows users to view, edit, and delete existing ingredients and add new ones.
 *
 * @class RecipeIngredientTable
 *
 * @param {Object} props - The component's properties.
 * @param {Array} props.ingredients - An array of existing ingredients for the recipe.
 * @param {string} props.newIngredientName - The name of the new ingredient to be added.
 * @param {string} props.newIngredientQuantity - The quantity of the new ingredient to be added.
 * @param {function} props.editQuantity - A callback function to edit the quantity of an existing ingredient.
 * @param {function} props.setQuantity - A callback function to set the quantity of an existing ingredient.
 * @param {function} props.deleteIngredient - A callback function to delete an existing ingredient.
 * @param {function} props.setNewIngredientName - A callback function to set the name of the new ingredient.
 * @param {function} props.setNewIngredientQuantity - A callback function to set the quantity of the new ingredient.
 * @param {function} props.addIngredient - A callback function to add a new ingredient.
 *
 * @returns {JSX.Element} The RecipeIngredientTable component.
 *
 * @example
 * // Example usage of the RecipeIngredientTable component
 * <RecipeIngredientTable
 *   ingredients={recipe.ingredients}
 *   newIngredientName={newIngredientName}
 *   newIngredientQuantity={newIngredientQuantity}
 *   editQuantity={handleEditQuantity}
 *   setQuantity={handleSetQuantity}
 *   deleteIngredient={handleDeleteIngredient}
 *   setNewIngredientName={handleSetNewIngredientName}
 *   setNewIngredientQuantity={handleSetNewIngredientQuantity}
 *   addIngredient={handleAddIngredient}
 * />
 */

export default class RecipeIngredientTable extends React.Component {
    render() {
        const rows = this.props.ingredients.map((ingredient) => {
            return {
                key: ingredient.ingredientID,
                name: ingredient.name,
                quantity: (<QuantityInput label="Ingredient Quantity" value={ingredient.quantity} onChange={(event) => this.props.setQuantity(ingredient.ingredientID, event)}/>),
                toolbox: (<div>
                    <Tooltip title="Aggiorna">
                        <IconButton aria-label="V" onClick={() => this.props.editQuantity(ingredient.ingredientID)}>
                            <DoneIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Elimina">
                        <IconButton aria-label="X" onClick={() => this.props.deleteIngredient(ingredient.ingredientID)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>)
            }
        })
        const pivotRow = {
            key: "pivot",
            name: (<IngredientNameInput value={this.props.newIngredientName} onChange={this.props.setNewIngredientName}/>),
            quantity: (<QuantityInput label="Ingredient Quantity" value={this.props.newIngredientQuantity} onChange={this.props.setNewIngredientQuantity}/>),
            toolbox: (<Tooltip title="Aggiungi">
                        <IconButton aria-label="Aggiungi" onClick={() => this.props.addIngredient()}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>)
        };

        return <DedicatedTable rows={rows} columns={COLUMNS} pivotRow={pivotRow}/>
    }
}