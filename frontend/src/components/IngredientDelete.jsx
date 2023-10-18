import React from "react";
import MButton from '../components/MButton';

/**
 * This component is responsible for displaying a confirmation message when deleting an ingredient.
 * 
 * @class IngredientDelete
 * 
 * @param {Object} props - The component's properties.
 * @param {function} props.onConfirm - A callback function to be called when the deletion is confirmed.
 * 
 * @return {JSX.Element} A confirmation message with a "Conferma" button.
 * 
 * @example
 * // Example usage of the IngredientDelete component
 * <IngredientDelete onConfirm={handleIngredientDeletion} />
 */


const IngredientDelete = (props) => {
  return (
    <div>
      <center>
        <h4>Sei sicuro di voler eliminare questo ingrediente?</h4>
        <MButton text="Conferma" onClick={props.onConfirm} />
      </center>
    </div>
  );
};

export default IngredientDelete;