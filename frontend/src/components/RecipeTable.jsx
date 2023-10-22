import {TextField, Tooltip} from '@mui/material';
import React from 'react';
import DedicatedTable from './DedicatedTable';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BirreIcon from '../svgicons/BirreIcon';

const COLUMNS = [
  {title: 'Nome', key: 'name'},
  {title: 'Descrizione', key: 'description'},
  {title: 'Azioni', key: 'toolbox', sortable: false},
];

/**
 * The RecipeTable component displays a table of recipes, allowing users to view, execute, edit, and delete recipes. It also provides the option to add new recipes.
 *
 * @class RecipeTable
 *
 * @param {Object} props - The component's properties.
 * @param {Array} props.recipes - An array of recipe objects to display.
 * @param {string} props.newRecipeName - The name of a new recipe to add.
 * @param {string} props.newRecipeDescription - The description of a new recipe to add.
 * @param {Function} props.handleView - A callback function to handle viewing a recipe.
 * @param {Function} props.handleExecute - A callback function to handle executing a recipe.
 * @param {Function} props.handleEdit - A callback function to handle editing a recipe.
 * @param {Function} props.handleDelete - A callback function to handle deleting a recipe.
 * @param {Function} props.setNewRecipeName - A function to set the name of the new recipe.
 * @param {Function} props.setNewRecipeDescription - A function to set the description of the new recipe.
 * @param {Function} props.addRecipe - A function to add a new recipe.
 *
 * @returns {JSX.Element} The RecipeTable component.
 *
 * @example
 * // Example usage of the RecipeTable component
 * <RecipeTable
 *   recipes={recipeData}
 *   newRecipeName={newRecipeName}
 *   newRecipeDescription={newRecipeDescription}
 *   handleView={handleViewRecipe}
 *   handleExecute={handleExecuteRecipe}
 *   handleEdit={handleEditRecipe}
 *   handleDelete={handleDeleteRecipe}
 *   setNewRecipeName={setNewRecipeName}
 *   setNewRecipeDescription={setNewRecipeDescription}
 *   addRecipe={addNewRecipe}
 * />
 */

export default class RecipeTable extends React.Component {
  render() {
    const rows = this.props.recipes.map((recipe) => {
      return {
        key: recipe.recipeID,
        name: recipe.name,
        description: recipe.description,
        toolbox: (<div>
          <Tooltip title="Dettagli">
            <IconButton aria-label="Dettagli" onClick={() => this.props.handleView(recipe)}>
              <VisibilityIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Esegui">
            <IconButton aria-label="Esegui" onClick={() => this.props.handleExecute(recipe)}>
              <BirreIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Modifica">
            <IconButton aria-label="Modifica" onClick={() => this.props.handleEdit(recipe)}>
              <EditIcon/>
            </IconButton>
          </Tooltip>
          <Tooltip title="Elimina">
            <IconButton aria-label="Elimina" onClick={() => this.props.handleDelete(recipe)}>
              <DeleteIcon/>
            </IconButton>
          </Tooltip>
        </div>),
      };
    });
    const pivotRow = {
      key: 'pivot',
      name: (<TextField label="Recipe Name" value={this.props.newRecipeName} style={{width: '90%', textAlign: 'center'}} onChange={ (event) => this.props.setNewRecipeName(event)}/>),
      description: (<TextField multiline label="Recipe Description" value={this.props.newRecipeDescription} style={{width: '90%', textAlign: 'center'}} onChange={ (event) => this.props.setNewRecipeDescription(event)}/>),
      toolbox: (<Tooltip title="Aggiungi">
        <IconButton aria-label="Aggiungi" onClick={() => this.props.addRecipe()}>
          <AddIcon />
        </IconButton>
      </Tooltip>),
    };

    return <DedicatedTable rows={rows} columns={COLUMNS} pivotRow={pivotRow}/>;
  }
}
