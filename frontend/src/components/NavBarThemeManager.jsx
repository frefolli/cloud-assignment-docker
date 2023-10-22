import React from 'react';
import {NAVBAR_THEME_MANAGER_ESCAPE, NAVBAR_THEME_MANAGER_TRIGGER} from '../utils/Protocol';
import ThemeManager from './ThemeManager';

/**
 * This component is responsible for managing the theme of the navigation bar.
 *
 * @class NavBarThemeManager
 *
 * @param {Object} props - The component's properties.
 * @param {boolean} props.testThemeCookie - Set to true to test the theme cookie.
 *
 * @returns {JSX.Element} The NavBarThemeManager component for managing the navigation bar theme.
 *
 * @example
 * // Example usage of the NavBarThemeManager component
 * <NavBarThemeManager testThemeCookie={true}>
 *   {/* Application content *\/}
 * </NavBarThemeManager>
 */


export default class NavBarThemeManager extends React.Component {
  render() {
    return (
      <ThemeManager
        testThemeCookie={this.props.testThemeCookie}
        trigger={NAVBAR_THEME_MANAGER_TRIGGER}
        escape={NAVBAR_THEME_MANAGER_ESCAPE}
      >
        {this.props.children}
      </ThemeManager>
    );
  }
}
