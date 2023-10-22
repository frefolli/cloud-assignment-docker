import React, {Component} from 'react';
import {Button} from '@mui/material';
import {Box} from '@mui/system';

/**
 * This component represents a button element that can be customized with different properties.
 *
 * @class MButton
 *
 * @param {Object} props - The component's properties.
 * @param {string} props.text - The text to display on the button.
 * @param {boolean} props.center - If `true`, the button will be centered within its container.
 * @param {function} props.onClick - The function to execute when the button is clicked.
 * @param {string} props.id - The HTML id attribute for the button element.
 * @param {string} props.className - The CSS class name for the button element.
 * @param {JSX.Element} props.startIcon - An optional icon element to display before the button text.
 * @param {JSX.Element} props.endIcon - An optional icon element to display after the button text.
 *
 * @return {JSX.Element} A customizable button component.
 *
 * @example
 * // Example usage of the MButton component
 * <MButton
 *   text="Click Me"
 *   center={true}
 *   onClick={handleButtonClick}
 *   startIcon={<IconStart />}
 *   endIcon={<IconEnd />}
 *   id="my-button"
 *   className="custom-button"
 * />
 */

class MButton extends Component {
  render() {
    const button = this.props.center === undefined ?
      (
        <Button
          style={{
            margin: 10,
          }}
          variant="contained"
          color="primary"
          onClick={this.props.onClick ?? (() => {})}
          startIcon={this.props.startIcon}
          endIcon={this.props.endIcon}
        >
          {this.props.text}
        </Button>
      ) : (
        <Box textAlign='center'>
          <Button
            variant="contained"
            color="primary"
            onClick={this.props.onClick ?? (() => {})}
            startIcon={this.props.startIcon}
            endIcon={this.props.endIcon}
          >
            {this.props.text}
          </Button>
        </Box>
      );
    if (this.props.id || this.props.className) {
      return (
        <div className={this.props.className ?? ''} id={this.props.id ?? ''}>
          {button}
        </div>
      );
    }
    return (button);
  }
}

export default MButton;
