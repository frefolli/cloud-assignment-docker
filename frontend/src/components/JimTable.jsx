import { Box } from '@mui/system';
import * as React from 'react';

/**
 * This component represents a table-like container with customizable width, background, and shadow.
 * 
 * @class JimTable
 * 
 * @param {Object} props - The component's properties.
 * @param {ReactNode} props.children - The child components to be displayed within the JimTable.
 * @param {string} [props.width] - The width of the JimTable (default: "90%").
 * 
 * @return {JSX.Element} A component providing a table-like container with customizable width, background, and shadow to organize its children.
 * 
 * @example
 * // Example usage of the JimTable component
 * <JimTable width="80%">
 *   <ChildComponent1 />
 *   <ChildComponent2 />
 * </JimTable>
 */

export default class JimTable extends React.Component {
    render() {
        return (<Box sx={{
            width: (this.props.width ?? "90%"),
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "30px",
            marginBottom: "30px",
            border: "5px",
            padding: "1.5%"
        }}>
            {this.props.children}
        </Box>);
    }
}