import React from "react";
import MButton from '../components/MButton';

/**
 * This function displays a confirmation message for deleting a beer and a confirmation button.
 *
 * @class BeerDelete
 * 
 * @param {Object} props - The component's properties.
 * @param {function} props.onConfirm - The function to call when the delete action is confirmed.
 *
 * @returns {JSX.Element} The rendered BeerDelete component.
 *
 * @example
 * // Example usage of the BeerDelete component:
 * <BeerDelete onConfirm={handleDeleteConfirmation} />
 */

const BeerDelete = (props) => {
  return (
    <div>
      <center>
        <h4>Sei sicuro di voler eliminare questa birra?</h4>
        <MButton text="Conferma" onClick={props.onConfirm} />
      </center>
    </div>
  );
};

export default BeerDelete;
