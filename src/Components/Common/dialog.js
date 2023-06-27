import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../../Redux/Actions/index';

export default function MyDialog(props) {

  const dispatch = useDispatch();

  const handleDelete = () => {
        
    var data = {};
    data.kind = 5;
    data.id = props.itemToDelete.Id;
    dispatch(deleteItem(data));
    //props.setOpenDialog(false);
  };

  const handleClose = () => {
    //props.setOpenDialog(false);
  };

  return <Dialog
    open={props.openDialog}
    // onClose={() => { props.openDialog(false); }}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title">ΜΗΝΥΜΑ</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Είστε σίγουροι οτι Θέλετε να διαγράψετε το {props.itemToDelete?.Name}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDelete} color="primary">
        Διαγραφή
      </Button>
      <Button onClick={handleClose} color="primary">
        Ακύρωση
      </Button>
    </DialogActions>
  </Dialog>
}