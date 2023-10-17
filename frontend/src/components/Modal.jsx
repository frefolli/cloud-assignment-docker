import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import MButton from './MButton';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

/**
 * This component represents a modal dialog for displaying content.
 * 
 * @class Modal
 * 
 * @param {Object} props - The component's properties.
 * @param {boolean} props.showModal - If `true`, the modal is displayed; otherwise, it's hidden.
 * @param {function} props.setShowModal - A function to control the visibility of the modal.
 * @param {JSX.Element} props.children - The content to be displayed within the modal.
 * 
 * @return {JSX.Element} A modal dialog for displaying content.
 * 
 * @example
 * // Example usage of the Modal component
 * <Modal
 *   showModal={isModalVisible}
 *   setShowModal={setModalVisibility}
 * >
 *   <div>
 *     <h2>Modal Content</h2>
 *     <p>This is the content of the modal dialog.</p>
 *   </div>
 * </Modal>
 */

export default class Modal extends React.Component {
  render() {
    return (
        <Dialog
          open={this.props.showModal}
          onClose={() => this.props.setShowModal(false)}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          fullWidth={true}
          maxWidth={'md'}
          className='modale'
          aria-label='Modal'
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          </DialogTitle>
          <DialogContent>
          {this.props.children}
          </DialogContent>
          <DialogActions>
            <MButton autoFocus onClick={() => this.props.setShowModal(false)} text="Cancel"/>
          </DialogActions>
        </Dialog>
    );
  }
}
