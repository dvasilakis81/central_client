import React, { useCallback } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Popover from '@material-ui/core/Popover';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import { Box, List, ListItem, Grid, Paper, Typography, Button } from '@material-ui/core';

function Actions(props) {
  const navigate = useNavigate();
  
  const [navigateToNew, setNavigateToNew] = useState(false);
  const [navigateToEdit, setNavigateToEdit] = useState(false);
  const [variant, setVariant] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  const handleClose = useCallback(
    () => {
      setOpenPopover(false);
    },
    [], // Tells React to memoize regardless of arguments.
  );

  const handleOpen = useCallback(
    () => {
      setNavigateToNew(true);
      setNavigateToEdit(false);
    },
    [], // Tells React to memoize regardless of arguments.
  );

  const handleEdit = useCallback(
    () => {
      setNavigateToNew(false);
      setNavigateToEdit(true);
    },
    [], // Tells React to memoize regardless of arguments.
  );

  if (navigateToNew === true) {
    navigate(props.navigatepage, { state: { isNew: 1 }})
    // return <Navigate push to={props.navigatepage} />
  } if (navigateToEdit === true) {

    navigate(props.navigatepage, { state: { isNew: 2, itemtype: props.itemtype } });
    //return <Navigate push to={props.navigatepage} isEdit={true} />
  }
  else {
    return <Grid item>
      <Paper style={{ padding: '0px' }} square={true}>
        <Button
          size="small"
          variant="contained"
          style={{ margin: '5px', background: 'lightgrey' }}
          onClick={handleOpen}>
          <AddIcon />
          ΠΡΟΣΘΗΚΗ
        </Button>
        <Button
          size="small"
          variant="contained"
          style={{ margin: '5px', background: 'lightgrey' }}
          onClick={handleEdit}>
          <AddIcon />
          ΕΠΕΞΕΡΓΑΣΙΑ
        </Button>
        {props.itemname ? <Dialog
          open={openDeleteDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Διαγραφή"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Θέλετε να διαγράψετε τo <b>«{props.itemname}»</b> και ο,τιδήποτε έχει σχέσει με αυτό;
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Ακύρωση
            </Button>
          </DialogActions>
        </Dialog> : <></>}
      </Paper>
    </Grid>
  }
}

export default Actions