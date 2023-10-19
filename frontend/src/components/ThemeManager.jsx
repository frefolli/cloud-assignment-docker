import React from 'react';
import themes from '../theme/themes';
import { DEFAULT_THEME, LAST_USED_THEME_LOCALSTORAGE_KEY } from '../utils/Protocol';
import { ThemeProvider } from '@mui/material';
import SettingsManager from '../utils/SettingsManager';

/**
 * The ThemeManager component handles the management of application themes. It allows users to switch between different themes
 * and persist the selected theme in local storage.
 *
 * @class ThemeManager
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.trigger - The cookie value to trigger the theme change.
 * @param {string} props.escape - The cookie value to escape from the theme change.
 * @param {boolean} props.testThemeCookie - A flag to test the theme cookie.
 * @param {ReactNode} props.children - The child components to be rendered within the themed context.
 *
 * @returns {JSX.Element} The `ThemeManager` component.
 *
 * @example
 * // Example usage of the ThemeManager component
 * <ThemeManager trigger="themeChange" escape="themeEscape" testThemeCookie={true}>
 *   <App />
 * </ThemeManager>
 */

export default class ThemeManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentTheme: localStorage.getItem(LAST_USED_THEME_LOCALSTORAGE_KEY) || DEFAULT_THEME};
        this.settingsManager = new SettingsManager();
    }
    
    triggerReload() {
        return new Promise((acc, rej) => {
            this.settingsManager.getSetting("color")
            .then(data => {
                this.setTheme(data.value);
                acc();
            })
            .catch(() => {this.setTheme()})
        })
    }

    setTheme(theme) {
        if (theme === undefined || themes[theme] === undefined)
            theme = DEFAULT_THEME;
        localStorage.setItem(LAST_USED_THEME_LOCALSTORAGE_KEY, theme);
        this.setState({currentTheme: theme});
    }
    
    componentDidMount() {
        if (this.props.testThemeCookie) {
            document.cookie = this.props.trigger;
        }
        this.triggerReload()
            .then(this.saveTheme)
    }

    render() {
        if (document.cookie.includes(this.props.trigger)) {
            document.cookie = this.props.escape;
            this.triggerReload();
        }
        return (
            <ThemeProvider
                theme={themes[this.state.currentTheme]}
            >
                {this.props.children}
            </ThemeProvider>
        );
    }
}
