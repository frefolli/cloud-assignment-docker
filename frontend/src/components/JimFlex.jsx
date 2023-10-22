import {Box} from '@mui/material';
import * as React from 'react';

/**
 * This component is a flexible layout container that displays its children in a grid or flex layout based on the screen size.
 *
 * @class JimFlex
 *
 * @param {Object} props - The component's properties.
 * @param {ReactNode} props.children - The child components to be displayed within the JimFlex container.
 *
 * @return {JSX.Element} A component providing a flexible layout container that adjusts between grid and flex layouts based on the screen size.
 *
 * @example
 * // Example usage of the JimFlex component
 * <JimFlex>
 *   <ChildComponent1 />
 *   <ChildComponent2 />
 * </JimFlex>
 */

export default class JimFlex extends React.Component {
  render() {
    return (<Box sx={{
      display: {md: 'grid', sx: 'flex'},
      gridTemplateColumns: '50% 50%',
      gap: '',
    }}>
      {this.props.children}
    </Box>);
  }
}
