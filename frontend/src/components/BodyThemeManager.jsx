import React from 'react';
import {THEME_MANAGER_ESCAPE, THEME_MANAGER_TRIGGER} from '../utils/Protocol';
import BackgroundManager from './BackgroundManager';
import ThemeManager from './ThemeManager';

/**
 * This component is responsible for managing the theme and background of the body content.
 *
 * @class BodyThemeManager
 *
 * @param {Object} props - The component's properties.
 * @param {boolean} props.testThemeCookie - Set to true to test the theme cookie.
 * @param {boolean} props.testBackgroundCookie - Set to true to test the background cookie.
 *
 * @example
 * // Example usage of the BodyThemeManager component
 * <BodyThemeManager
 *   testThemeCookie={true}
 *   testBackgroundCookie={true}
 * >
 *   {/* Application content *\/}
 * </BodyThemeManager>
 *
 * @return {JSX.Element} The BodyThemeManager component for managing body theme and background.
 */

export default class BodyThemeManager extends React.Component {
  render() {
    return (
      <ThemeManager
        testThemeCookie={this.props.testThemeCookie}
        trigger={THEME_MANAGER_TRIGGER}
        escape={THEME_MANAGER_ESCAPE}
      >
        <BackgroundManager
          testBackgroundCookie={this.props.testBackgroundCookie}
        >
          {this.props.children}
        </BackgroundManager>
      </ThemeManager>
    );
  }
}
