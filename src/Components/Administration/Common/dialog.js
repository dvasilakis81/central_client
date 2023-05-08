import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

export default function MyDialog(props) {

  const dispatch = useDispatch();

  return <Dialog
    open={props.openDialog}
    onClose={() => { props.openDialog(false); }}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title">ΜΗΝΥΜΑ</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {/* {showDeleteMessage()} */}
        asdfasdf
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => {
        var data = {}
        // if (props.contenttype === "announcement") {
        //   data.kind = 4;
        //   data.id = announcementItemDetails.Id;
        // } else if (props.contenttype === "menuitem") {
        //   data.kind = 1;
        //   if (props.itemtype === 1)
        //     data.id = menuItemDetails.Id;
        //   else
        //     data.id = serviceItemDetails.Id;
        // } else if (props.contenttype === "pageitem") {
        //   data.kind = 2;
        //   data.id = pageItemDetails.Id;
        // } else if (props.contenttype === "mediaitem") {
        //   data.kind = 3;
        //   data.id = mediaItemDetails.Id;
        // }

        //dispatch(deleteItem(data));
        props.setOpenDialog(false);
      }} color="primary" autoFocus>
        Διαγραφή
      </Button>
      <Button onClick={() => { props.setOpenDialog(false); }} color="primary" autoFocus>
        Ακύρωση
      </Button>
    </DialogActions>
  </Dialog>
}