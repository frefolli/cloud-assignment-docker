import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TablePagination, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Box } from '@mui/system';
import JimTable from './JimTable';

/**
 * This component provides a dedicated table for displaying tabular data with various features such as sorting and pagination.
 * 
 * @class DedicatedTable
 * 
 * @param {Object} props - The component's properties.
 * @param {Array} props.columns - An array of column definitions with keys, titles, and other options.
 * @param {Array} props.rows - An array of row data to display in the table.
 * @param {ReactNode} props.pivotRow - An optional pivot row to be displayed at the end of the table.
 * 
 * @return {JSX.Element} A table component for displaying tabular data with sorting and pagination features.
 * 
 * @example
 * // Example usage of the DedicatedTable component
 * <DedicatedTable
 *   columns={tableColumns}
 *   rows={tableData}
 *   pivotRow={pivotRowData}
 * />
 */

export default class DedicatedTable extends React.Component {
    constructor(props) {
        super(props);
        let firstSortableColumn = "";
        this.columns = this.props.columns.map((column) => {
            if (column.align === undefined)
                column.align = "center";
            if (column.sortable === undefined)
                column.sortable = true;
            if (column.sortable && firstSortableColumn === "")
                firstSortableColumn = column.key;
            return column;
        })
        this.state = {
            rowsPerPage: 10, page: 0,
            order: 'asc', orderBy: firstSortableColumn
        }
    }

    descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }
      
      getComparator = (order, orderBy) => {
        return order === 'desc'
          ? (a, b) => this.descendingComparator(a, b, orderBy)
          : (a, b) => -this.descendingComparator(a, b, orderBy);
      }
      
    stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) {
            return order;
          }
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    setOrderBy = (orderBy) => {
        this.setState({orderBy});
    }

    setOrder = (order) => {
        this.setState({order});
    }

    setPage = (page) => {
        this.setState({page});
    }

    setRowsPerPage = (rowsPerPage) => {
        this.setState({rowsPerPage});
    }

    handleChangePage = (event, newPage) => {
        this.setPage(newPage);
    }
    
    handleChangeRowsPerPage = (event) => {
        console.log(event);
        this.setRowsPerPage(+event.target.value);
        this.setPage(0);
    }

    handleRequestSort = (event, property) => {
        const isAsc = this.state.orderBy === property && this.state.order === 'asc';
        this.setOrder(isAsc ? 'desc' : 'asc');
        this.setOrderBy(property);
    }

    createSortHandler = (property) => (event) => {
        this.handleRequestSort(event, property);
    }

    render() {
        const columnRow = this.columns.map((column) => {
            if (column.sortable) {
                return (
                    <TableCell sx={{ fontSize: 30 }} key={column.key} align={column.align}
                                sortDirection={this.state.orderBy === column.key ? this.state.order : false}
                    >
                        <TableSortLabel
                            active={this.state.orderBy === column.key}
                            direction={this.state.orderBy === column.key ? this.state.order : 'asc'}
                            onClick={this.createSortHandler(column.key)}
                            >
                            {column.title}
                            {this.state.orderBy === column.key ? (
                                <Box component="span" sx={visuallyHidden}>
                                {this.state.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                );
            } else {
                return (
                    <TableCell sx={{ fontSize: 30 }} key={column.key} align={column.align}>
                            {column.title}
                    </TableCell>
                );
            }
        })

        const pageRange = {
            start: this.state.page * this.state.rowsPerPage,
            end: (this.state.page + 1) * this.state.rowsPerPage
        }

        const tableRows = this.stableSort(this.props.rows, this.getComparator(this.state.order, this.state.orderBy))
                            .slice(pageRange.start, pageRange.end)
                            .concat(this.props.pivotRow || [])
                            .map((row, rowIndex) => {
            return (
                <TableRow key={row.key}>
                    {this.columns.map((column) => {
                        return (<TableCell key={column.key} align={column.align}>{row[column.key]}</TableCell>);
                    })}
                </TableRow>
            );
        })

        return (
            <JimTable width="93.5%" sx={{ overflow: 'hidden' }}>
            <TableContainer>
                <Table sx={{ margin: 0 }} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columnRow}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableRows}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={this.props.rows.length}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                    backIconButtonProps={{"aria-label": "Pagina Precedente"}}
                    nextIconButtonProps={{"aria-label": "Pagina Successiva"}}
                    SelectProps={{"aria-label": "Righe per Pagina"}}
                />
            </TableContainer>
            </JimTable>
        );
    }
}