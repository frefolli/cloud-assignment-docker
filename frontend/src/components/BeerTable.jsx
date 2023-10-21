import React from 'react';
import DedicatedTable from './DedicatedTable';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Tooltip} from '@mui/material';

const COLUMNS = [
  {title: 'Nome', key: 'name'},
  {title: 'Azioni', key: 'toolbox', sortable: false},
];

/**
 * This class represents a component for displaying a table of beer data and associated actions.
 * @class BeerTable
 *
 * @param {Object} props - The component's properties.
 * @param {Array<Object>} props.beers - An array of beer objects to display in the table.
 * @param {function} props.handleView - A callback function to handle viewing details for a beer.
 * @param {function} props.handleEdit - A callback function to handle editing a beer.
 * @param {function} props.handleDelete - A callback function to handle deleting a beer.
 *
 * @returns {JSX.Element} The rendered BeerTable component.
 *
 * @example
 * // Example usage of the BeerTable component:
 * <BeerTable
 *   beers={beerList}
 *   handleView={handleViewBeer}
 *   handleEdit={handleEditBeer}
 *   handleDelete={handleDeleteBeer}
 * />
 */


export default class BeerTable extends React.Component {
  render() {
    const rows = this.props.beers.map((beer) => {
      return {
        key: beer.beerID,
        name: beer.name,
        toolbox: (<div>
          <Tooltip title="Dettagli">
            <IconButton aria-label="Dettagli" onClick={() => this.props.handleView(beer)}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Modifica">
            <IconButton aria-label="Modifica" onClick={() => this.props.handleEdit(beer)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Elimina">
            <IconButton aria-label="Elimina" onClick={() => this.props.handleDelete(beer)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>),
      };
    });
    return <DedicatedTable rows={rows} columns={COLUMNS}/>;
  }
}
