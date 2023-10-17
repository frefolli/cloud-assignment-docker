import { Box } from "@mui/material";
import * as React from "react";

/**
 * This component is a grid layout container that organizes its children in a single column.
 * 
 * @class JimGrid
 * 
 * @param {Object} props - The component's properties.
 * @param {ReactNode} props.children - The child components to be displayed within the JimGrid container.
 * 
 * @return {JSX.Element} A component providing a grid layout container with a single column to organize its children.
 * 
 * @example
 * // Example usage of the JimGrid component
 * <JimGrid>
 *   <ChildComponent1 />
 *   <ChildComponent2 />
 * </JimGrid>
 */


export default class JimGrid extends React.Component {
    render() {
        return (<Box sx={{
            marginLeft: "5%",
            marginRight: "5%",
            marginTop: "2.5%",
            marginBottom: "2.5%",
            display: "grid",
            gridTemplateColumns: "100%"
          }}>
            {this.props.children}
        </Box>);
    }
}