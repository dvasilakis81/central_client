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
  const [url, setUrl] = useState(props.Url || '');
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [isdeleted, setIsdeleted] = useState(props.isDeleted || false);
  const [ishidden, setIshidden] = useState(props.isHidden || false);

  let navigate = useNavigate();
  let mediaItemDetails = useSelector((state) => state.media_reducer.mediaItemDetails);
  let requestRejected = useSelector((state) => state.media_reducer.requestRejected);
  let newMediaAdded = useSelector((state) => state.media_reducer.newMediaAdded);

  const handleClick = () => {

    const formData = new FormData();
    formData.append("file", fileData);
    formData.append("fileName", "asdf");
    dispatch(addNewMediaItem(formData));
  };

  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  if (newMediaAdded === true) {
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
        {/* <div className="form-group">
            <button className="btn btn-primary" type="submit">Upload</button>
          </div> */}


        {/* <form style={{ padding: '10px', position: 'relative' }} autoComplete="off" onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flex: '1', flexFlow: 'column', overflowY: 'hidden', overflowX: 'hidden', height: '100%' }}>
            <div style={{ display: 'flex', flex: '1', flexFlow: 'column', overflowY: 'hidden', overflowX: 'hidden', height: '100%' }}>
              <div style={{ display: 'flex', flex: '1', flexFlow: 'row', overflowY: 'hidden', overflowX: 'hidden', height: '100%' }}>
                <div style={{ fontSize: 24, padding: 10, fontWeight: 'bold', minWidth: 100, textAlign: 'right' }}>
                  Όνομα:
                </div>
                <div style={{ fontSize: 24, paddingLeft: 0, paddingTop: 10 }}>
                  <TextField
                    type="text"
                    style={{ width: 500 }}
                    value={name}
                    isRequired={true}
                    onChange={handleChangeName}
                    inputProps={{ style: { textAlign: 'Left' } }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flex: '1', flexFlow: 'row', overflowY: 'hidden', overflowX: 'hidden', height: '100%' }}>
                <div style={{ fontSize: 24, padding: 10, fontWeight: 'bold', minWidth: 100, textAlign: 'right' }}>
                  Url:
                </div>
                <div style={{ fontSize: 24, paddingLeft: 0, paddingTop: 10 }}>
                  <TextField
                    type="text"
                    style={{ width: 500 }}
                    value={url}
                    isRequired={true}
                    required={true}
                    onChange={handleChangeUrl}
                    inputProps={{ style: { textAlign: 'Left' } }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flex: '1', flexFlow: 'row', overflowY: 'hidden', overflowX: 'hidden', height: '100%' }}>
                <div style={{ fontSize: 24, padding: 10, fontWeight: 'bold', minWidth: 100, textAlign: 'right' }}>
                  Image:
                </div>
                <div style={{ fontSize: 24, paddingLeft: 0, paddingTop: 10 }}>
                  <TextField
                    type="text"
                    style={{ width: 500 }}
                    stateValue={name}
                    isRequired={true}
                    onChange={setName}
                    inputProps={{ style: { textAlign: 'Left' } }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flex: '1', flexFlow: 'row', overflowY: 'hidden', overflowX: 'hidden', height: '100%' }}>
                <div style={{ fontSize: 24, padding: 10, fontWeight: 'bold', minWidth: 100, textAlign: 'right' }}>
                  Hidden:
                </div>
                <div style={{ fontSize: 24, paddingLeft: 0, paddingTop: 10, textAlign: 'left' }}>
                  <Checkbox
                    checked={ishidden}
                    onChange={e => setIshidden(e.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flex: '1', flexFlow: 'row', overflowY: 'hidden', overflowX: 'hidden', height: '100%', textAlign: 'right' }}>
                <div></div>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ margin: '5px', textTransform: 'none', fontSize: '16px' }}
                  onClick={handleClick}>
                  <SaveAltIcon />
                  Αποθήκευση
                </Button>
                <Button
                  variant="contained"
                  style={{ margin: '5px', background: 'orangered', textTransform: 'none', fontSize: '16px' }}
                  onClick={() => {
                    navigate(-1);
                    // alert('clicked');
                  }}>
                  <SaveAltIcon />
                  Ακύρωση
                </Button>
              </div>
            </div>
          </div>
        </form> */}
      </div >
    </div >
}