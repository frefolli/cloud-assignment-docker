import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

/**
 * This component represents a styled card for containing content.
 * 
 * @class ContentCard
 * 
 * @param {Object} props - The component's properties.
 * @param {ReactNode} props.children - The content to be displayed inside the card.
 *
 * @return {JSX.Element} A styled card containing the specified content.
 *
 * @example
 * // Example usage of the ContentCard component
 * <ContentCard>
 *   {/* Application content *\/}
 * </ContentCard>
 */

export default class ContentCard extends React.Component {
    render() {
        return (
            <Box style={{ margin: "4%", padding:"1%" }}>
                <Card variant="outlined" style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                    borderRadius: 2
                }}>
                    <CardContent>{this.props.children}</CardContent>
                </Card>
            </Box>
        );
    }
}
