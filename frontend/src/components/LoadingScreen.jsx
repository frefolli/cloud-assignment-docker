import { Backdrop, CircularProgress } from '@mui/material';
import React, { Component } from 'react';

/**
 * This component represents a loading screen that can be displayed during data loading or processing.
 * 
 * @class LoadingScreen
 * 
 * @param {Object} props - The component's properties.
 * @param {boolean} props.isLoading - A boolean value indicating whether the loading screen should be displayed.
 * 
 * @return {JSX.Element} A loading screen component that can be shown during data loading or processing.
 * 
 * @example
 * // Example usage of the LoadingScreen component
 * <LoadingScreen isLoading={isLoadingData} />
 */

class LoadingScreen extends Component {
    render() {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={this.props.isLoading}
            >
                <center>
                    <p>caricamento ...</p>
                    <CircularProgress color="inherit" />
                </center>
            </Backdrop>
        );
    }
}

export default LoadingScreen;