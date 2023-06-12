import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import store from '../../../Redux/Store/store';
import Categories from '../Categories/categories';
import { deleteItem } from '../../../Redux/Actions/index';

export default function Actions(props) {

  const announcementItemDetails = useSelector((state) => state.announcement_reducer.announcementItemDetails);
  const mediaItemDetails = useSelector((state) => state.media_reducer.mediaItemDetails);
  const menuItemDetails = useSelector((state) => state.menu_reducer.menuItemDetails);
  const serviceItemDetails = useSelector((state) => state.menu_reducer.serviceItemDetails);
  const pageItemDetails = useSelector((state) => state.page_reducer.pageItemDetails);
  const userItemDetails = useSelector((state) => state.user_reducer.userItemDetails);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navigateToNew, setNavigateToNew] = useState(false);
  const [navigateToEdit, setNavigateToEdit] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  function showDeleteMessage() {

    if (props.contenttype === "mediaitem")
      return "Θέλετε να διαγράψετε τo αρχείο «" + mediaItemDetails?.Name + "»;";
    else if (props.contenttype === "pageitem")
      return "Θέλετε να διαγράψετε την σελίδα «" + pageItemDetails?.Title + "»;";
    else if (props.contenttype === "menuitem") {
      if (props.itemtype === 1)
        return "Θέλετε να διαγράψετε τo μενού «" + menuItemDetails?.Name + "»;";
      else if (props.itemtype === 2)
        return "Θέλετε να διαγράψετε την υπηρεσία «" + serviceItemDetails?.Name + "»;";
    } else if (props.contenttype === "announcement")
      return "Θέλετε να διαγράψετε την ανακοίνωση «" + announcementItemDetails?.Description + "»;";
     else if (props.contenttype === "user")
      return "Θέλετε να διαγράψετε τον χρήστη «" + userItemDetails?.Firstname + " " + userItemDetails?.Lastname + " »;";
  }
  const handleOpen = useCallback(
    () => {
      setNavigateToNew(true);
      setNavigateToEdit(false);
    },
    [], // Tells React to memoize regardless of arguments.
  )
  const handleEdit = useCallback(
    () => {
      setNavigateToNew(false);
      setNavigateToEdit(true);
    },
    [], // Tells React to memoize regardless of arguments.
  )
  if (navigateToNew === true) {
    navigate(props.navigatepage, { state: { isNew: 1 } })
    // return <Navigate push to={props.navigatepage} />
  } if (navigateToEdit === true) {
    navigate(props.navigatepage, { state: { isNew: 2, itemtype: props.itemtype } });
    //return <Navigate push to={props.navigatepage} isEdit={true} />
  } else {
    return <div style={{ display: 'flex', height: '50px', justifyContent: 'flex-end' }}>
      <Button
        size="small"
        variant="contained"
        style={{ margin: '5px', background: 'lightgreen' }}
        onClick={handleOpen}>
        <AddIcon />
        ΠΡΟΣΘΗΚΗ
      </Button>
      <Button
        size="small"
        variant="contained"
        style={{ margin: '5px', background: '#2a9df4' }}
        onClick={handleEdit}>
        <AddIcon />
        ΕΠΕΞΕΡΓΑΣΙΑ
      </Button>
      <Button
        size="small"
        variant="contained"
        style={{ margin: '5px', background: 'red', color: 'white' }}
        onClick={() => { setOpenDeleteDialog(true); }}>
        <DeleteIcon />
        ΔΙΑΓΡΑΦΗ
      </Button>
      <Dialog
        open={openDeleteDialog}
        onClose={() => { setOpenDeleteDialog(false); }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"ΜΗΝΥΜΑ"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {showDeleteMessage()}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            var data = {}
            if (props.contenttype === "announcement") {
              data.kind = 4;
              data.id = announcementItemDetails.Id;
            } else if (props.contenttype === "menuitem") {
              data.kind = 1;
              if (props.itemtype === 1)
                data.id = menuItemDetails.Id;
              else
                data.id = serviceItemDetails.Id;
            } else if (props.contenttype === "pageitem") {
              data.kind = 2;
              data.id = pageItemDetails.Id;
            } else if (props.contenttype === "mediaitem") {
              data.kind = 3;
              data.id = mediaItemDetails.Id;
            }

            dispatch(deleteItem(data));
            setOpenPopover(false);
            setOpenDeleteDialog(false);
          }} color="primary" autoFocus>
            Διαγραφή
          </Button>
          <Button onClick={() => {
            setOpenPopover(false);
            setOpenDeleteDialog(false);
          }} color="primary" autoFocus>
            Ακύρωση
          </Button>
        </DialogActions>
      </Dialog>
      <span style={{ textAlign: 'center' }}>
        <Button
          variant='contained'
          style={{ margin: '5px', background: '#F3FCFF', color: '#000' }}
          onClick={() => {
            store.dispatch({ type: 'OPEN_CATEGORIES', payload: true })
          }}>
          ΚΑΤΗΓΟΡΙΕΣ
        </Button>
        <Categories />        
      </span>
    </div>
  }
}