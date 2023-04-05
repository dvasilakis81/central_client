import Popover from '@material-ui/core/Popover';
import { useCallback, useState } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Header from '../../Header/header';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Checkbox } from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { useNavigate } from 'react-router-dom';

import { addNewMediaItem } from '../../../Redux/Actions/index';

function handleSubmit(e) {
  e.preventDefault();

  // this.setState({ submitButtonDisabled: true });
  // if (this.state.AccountId) {
  //   this.props.updateAccount(this.state, this.props.token.token).then(res => {
  //     this.setState({ message: 'Ο λογαριασμός επεξεργάστηκε επιτυχώς!!!', openMessage: true, variant: 'success', submitButtonDisabled: false });
  //     this.props.history.goBack();
  //   }).catch(error => {
  //     this.setState({ message: <><div>Αποτυχία επεξεργασίας λογαριασμών!</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
  //   });
  // }
  // else {
  //   this.props.createAccount(this.state, this.props.token.token).then(res => {
  //     this.setState({ AccountId: res.value.data[0].Id, message: 'Ο λογαριασμός δημιουργήθηκε επιτυχώς!!!', openMessage: true, variant: 'success', submitButtonDisabled: false });

  //     var snackbarInfo = {}
  //     snackbarInfo.openMessage = true;
  //     snackbarInfo.message = 'Ο ' + res.value.data[0].Number + 'ος λογαριασμός δημιουργήθηκε επιτυχώς!!!';
  //     snackbarInfo.variant = 'success';

  //     store.dispatch({ type: 'SHOW_SNACKBAR', payload: snackbarInfo });
  //     this.props.history.goBack();
  //   }).catch(error => {
  //     this.setState({ message: <><div>Αποτυχία δημιουργίας λογαριασμών!</div><div>{getServerErrorResponseMessage(error)}</div></>, openMessage: true, variant: 'error', submitButtonDisabled: false });
  //   })
  // }
}

export default function MediaItemNew(props) {

  const dispatch = useDispatch();
  const [fileData, setFileData] = useState('');
  let navigate = useNavigate();  
  let newItemAdded = useSelector((state) => state.media_reducer.newItemAdded);
  
  const handleClick = () => {

    const formData = new FormData();
    formData.append("file", fileData);
    formData.append("fileName", "asdf");
    dispatch(addNewMediaItem(formData));
  };

  if (newItemAdded === true) {
    dispatch(dispatch({ type: 'SET_ADDED_NEWITEM', payload: false }));
    navigate(-1);
  }
  else
    return <div style={{ height: '100%' }}>
      <Header
        title="Κεντρική Σελίδα Δήμου Αθηναίων"
        showAdministrationOption={false}
        showNewConsultationOption={false} />
      <div style={{ fontSize: 46, color: 'black', textAlign: 'center', flexGrow: 1, alignSelf: 'center' }}>
        <h5>Προσθήκη media</h5>
        <div className="form-group">
          <input
            type="file"
            style={{ fontSize: 26, padding: 20 }}
            onChange={(e) => {
              setFileData(e.target.files[0]);
            }} />
        </div>
        <Button style={{ fontSize: 20 }} variant="contained" color="primary" onClick={handleClick}>Upload</Button>  
      </div >
    </div >
}