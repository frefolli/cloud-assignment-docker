import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

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
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          </DialogTitle>
          <DialogContent>
          {this.props.children}
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => this.props.setShowModal(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}
