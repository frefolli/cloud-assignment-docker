import React from 'react';
import DedicatedTable from './DedicatedTable';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Tooltip} from '@mui/material';

const COLUMNS = [
  {title: 'Immagine', key: 'icon', sortable: false},
  {title: 'Nome', key: 'name'},
  {title: 'Quantita\'', key: 'quantity'},
  {title: 'Azioni', key: 'toolbox', sortable: false},
];

/**
 * This component is responsible for rendering an inventory table that displays a list of items with their name, quantity, and an option to delete each item.
 *
 * @class InventoryTable
 *
 * @param {Object} props - The component's properties.
 * @param {Array} props.items - An array of items to display in the inventory table.
 * @param {function} props.handleDelete - A callback function to handle item deletion.
 *
 * @return {JSX.Element} A component representing an inventory table with item details and delete buttons.
 *
 * @example
 * // Example usage of the InventoryTable component
 * <InventoryTable
 *   items={inventoryItems}
 *   handleDelete={handleItemDeletion}
 * />
 */

export default class InventoryTable extends React.Component {
  render() {
    const rows = this.props.items.map((item) => {
      return {
        key: item.ingredientID,
        icon: (<img
          className="shoppingImage"
          src={`../../icons/inventory-icons/${item.name}.png`}
          alt={item.name}
          onError={(e) => {
            e.target.src = '../../icons/inventory-icons/sconosciuto.png';
          }}
        />),
        name: item.name,
        quantity: item.quantity,
        toolbox: (<div>
          <Tooltip title="Elimina">
            <IconButton aria-label="Elimina" onClick={() => this.props.handleDelete(item.ingredientID)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>),
      };
    });
    return <DedicatedTable rows={rows} columns={COLUMNS}/>;
  }
}
