import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelAltIcon from '@material-ui/icons/Cancel';

import { changePassword, checkPassword } from '../../../Redux/Actions/index';
import store from '../../../Redux/Store/store';
import { getScreenWidth, getScreenHeight } from '../../../Helper/helpermethods';
import { inputTextfieldStyle } from '../../Styles/styles'
import {showSnackbarMessage, showFailedConnectWithServerMessage, setOpenChangePassword } from '../../Common/methods';

// const styles = {
//   textfieldStyle: {
//     fontSize: '22px',
//     fontWeight: 'bold',
//     marginTop: '5px',
//     width: '100%',
//     background: 'white',
//     transform: "scale(1)"
//   },
//   textfield: {
//     fontSize: '22px',
//     fontWeight: 'bold',
//     marginTop: '5px',
//     width: '100%',
//     background: 'white',
//     borderRadius: '20px',
//     transform: "scale(1)"
//   },
//   smallTextfield: {
//     fontSize: '22px',
//     fontWeight: 'bold',
//     marginTop: '0px',
//     width: 'auto',
//     background: 'white',
//     borderRadius: '20px'
//   }
// }

export default function UserChangePassword() {
  const classes = inputTextfieldStyle();

  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const wrapperRef = useRef(null);
  const { openchangepassword } = useSelector(state => ({ openchangepassword: state.user_reducer.openchangepassword }));
  const { token } = useSelector(state => ({ token: state.token_reducer.token }));

  if (openchangepassword === true)
    return <div
      style={{
        width: getScreenWidth() / 2,
        height: getScreenHeight() / 2,
        position: 'absolute',
        left: getScreenWidth() / 4,
        right: getScreenHeight() / 2,
        margin: '0 auto',
        border: '5px solid green',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1
      }}>
      <form
        style={{
          display: 'flex',
          flexFlow: 'column',
          flexWrap: 'wrap',
          overflowY: 'hidden',
          height: '100%',
          background: 'white',
          justifyContent: 'start',
          alignItems: 'center'
        }}
        onSubmit={(e) => {
          e.preventDefault();

          var data = {};
          data.userid = token.userLoginInfo[0].Id;
          data.oldpassword = oldPassword;
          data.password = password;
          data.confirmpassword = confirmPassword;

          if (password !== confirmPassword) {
            var snackbarInfo = {};
            snackbarInfo.openMessage = true;
            snackbarInfo.message = 'Οι κωδικοί δεν είναι ίδιοι!';
            snackbarInfo.variant = 'info';
          } else {
            dispatch(changePassword(data)).then(response => {

              var snackbarInfo = {};
              snackbarInfo.openMessage = true;
              if (response.value.success === true) {
                snackbarInfo.message = 'Επιτυχής αλλαγή κωδικού!';
                snackbarInfo.variant = 'success';
              } else if (response.value.success === false) {
                snackbarInfo.message = 'H προσπάθεια για την αλλαγή του χρήστη απέτυχε! ' + (response.value.message || '');
                snackbarInfo.variant = 'error';
              }
              store.dispatch({ type: 'SHOW_SNACKBAR', payload: snackbarInfo });

              setOldPassword('');
              setPassword('');
              setConfirmPassword('');
            }).catch(error => {
              showFailedConnectWithServerMessage(error);
              setOpenChangePassword(false);
              setOldPassword('');
              setPassword('');
              setConfirmPassword('');
            })
          }
        }}>
        <div style={{ display: 'flex', flexFlow: 'column', width: '100%', overflowX: 'hidden' }}>
          <div style={{ background: 'green', color: 'white', width: '100%', fontSize: '24px', textAlign: 'center', padding: '20px' }}>Αλλαγή Κωδικού</div>
          <div style={{
            display: 'flex',
            flexFlow: 'column',
            overflowY: 'hidden',
            marginTop: '0px',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}>
            <div style={{ marginTop: '30px' }}>
              <TextField
                required
                type="password"
                label="Παλιός Κωδικός"
                variant='outlined'                
                value={oldPassword}
                onChange={(e) => { setOldPassword(e.target.value); }}
                className={classes.root}    
                inputProps={{ className: classes.root }}
              />
            </div>
            <div style={{ marginTop: '30px' }}>
              <TextField
                required
                type="password"
                label="Νέος Κωδικός"
                variant='outlined'                
                value={password}
                onChange={(e) => { setPassword(e.target.value); }}
                className={classes.root}    
                inputProps={{ className: classes.root }}
              />
            </div>
            <div style={{ marginTop: '30px' }}>
              <TextField
                required
                type="password"
                label="Νέος Κωδικός Επιβαίωση"
                variant='outlined'                
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); }}
                className={classes.root}    
                inputProps={{ className: classes.root }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '30px', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ margin: '20px' }}>
              <Button
                disabled={false}
                type='submit'
                style={{ fontSize: '18px', textAlign: 'center', backgroundColor: 'lightgreen' }}>
                ΑΛΛΑΓΗ ΚΩΔΙΚΟΎ
              </Button>
            </div>
            <div style={{ margin: '20px' }}>
              <Button
                disabled={false}
                style={{ fontSize: '18px', textAlign: 'center', backgroundColor: 'orangered' }}
                onClick={() => {
                  setOldPassword('');
                  setPassword('');
                  setConfirmPassword('');
                  setOpenChangePassword(false);                  
                }}>
                AKΥΡΩΣΗ
              </Button>
            </div>
          </div>
        </div>
      </form >
    </div >
  else
    <></>
}