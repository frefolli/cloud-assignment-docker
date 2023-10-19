import React from 'react';
import backgrounds from '../theme/backgrounds';
import { BACKGROUND_MANAGER_ESCAPE, BACKGROUND_MANAGER_TRIGGER, DEFAULT_BACKGROUND, LAST_USED_BACKGROUND_LOCALSTORAGE_KEY } from '../utils/Protocol';
import SettingsManager from '../utils/SettingsManager';

/**
 * Manages and displays background images for the application.
 * 
 * @class BackgroundManager
 * 
 * @param {Object} props - The component's properties.
 * @param {boolean} props.testBackgroundCookie - Set to true to test the background cookie.
 * 
 * @returns {JSX.Element} The rendered BackgroundManager component.
 * 
 * @example
 * // Example usage of the BackgroundManager component:
 * <BackgroundManager testBackgroundCookie={true}>
 *   {/* Application content *\/}
 * </BackgroundManager>
 */

export default class BackgroundManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.settingsManager = new SettingsManager();
    }

    triggerReload = () => {
        return new Promise((acc, rej) => {
            this.settingsManager.getSetting("background")
            .then((response) => {
                if (response.status >= 400 && response.status <= 600) {
                    return {value: DEFAULT_BACKGROUND}
                }
                return response.json();
            })
            .then(data => {
                let value = data.value;
                if (backgrounds[value] === undefined)
                    value = "default";
                localStorage.setItem(LAST_USED_BACKGROUND_LOCALSTORAGE_KEY, value);
                document.body.style.backgroundImage = `url("/backgrounds/${backgrounds[value]}")`;
                this.setState({});
                acc()
            })
            .catch(() => acc())
        });
    }

    componentDidMount() {
        if (this.props.testBackgroundCookie) {
            document.cookie = BACKGROUND_MANAGER_TRIGGER;
        }
        document.body.style.backgroundImage = `url("/backgrounds/${backgrounds[localStorage.getItem(LAST_USED_BACKGROUND_LOCALSTORAGE_KEY) || DEFAULT_BACKGROUND]}")`;
        document.body.style.backgroundSize = "cover";
        this.triggerReload();
    }

    render() {
        if (document.cookie.includes(BACKGROUND_MANAGER_TRIGGER)) {
            document.cookie = BACKGROUND_MANAGER_ESCAPE;
            this.triggerReload();
        }
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
