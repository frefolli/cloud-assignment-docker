import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

/**
 * The TitleCard component represents a card with a title and content.
 *
 * @class TitleCard
 *
 * @param {Object} props - The component's properties.
 * @param {ReactNode} props.children - The content to be
 * displayed within the card.
 *
 * @returns {JSX.Element} The `TitleCard` component.
 *
 * @example
 * // Example usage of the TitleCard component
 * <TitleCard>
 *   <h2>Card Title</h2>
 *   <p>This is the card content.</p>
 * </TitleCard>
 */

export default class TitleCard extends React.Component {
  static propTypes = {
    children: PropType.object,
  };
  render() {
    return (
      <Box style={{margin: '1.5%', padding: '1%'}}>
        <Card variant="outlined" style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          borderRadius: 2,
        }}>
          <CardContent>{this.props.children}</CardContent>
        </Card>
      </Box>
    );
  }
}
