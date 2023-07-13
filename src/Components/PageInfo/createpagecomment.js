import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';

// import { LoadingButton } from '@material-ui/core';
import { inputTextfieldStyle } from '../Styles/styles';
import { addPageComment } from '../../Redux/Actions/index';
import store from '../../Redux/Store/store';
import { getPageInfo } from '../../Redux/Actions';
import { showSnackbarMessage } from '../Common/methods';

export default function CreatePageComment(props) {
  const dispatch = useDispatch();
  let pageInfo = useSelector((state) => state.page_reducer.pageInfo);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [direction, setDirection] = useState('');
  const [department, setDepartment] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState('');

  const classes = inputTextfieldStyle();

  if (pageInfo && pageInfo.CanComment === 1)
    return <form style={{ display: 'flex', flexDirection: 'column', border: '1px dashed blue', padding: '10px' }}
      onSubmit={(e) => {
        e.preventDefault();

        setLoading(true);
        if (content && content !== '<p><br></p>') {

          var data = {};
          data.pageid = pageInfo.Id;
          data.firstname = firstname;
          data.lastname = lastname;
          data.direction = direction;
          data.department = department;
          data.content = content;
          data.isapproved = pageInfo.CommentNeedsApproval === 0 ? 1 : 0;
          data.url = pageInfo.Url;

          dispatch(addPageComment(data)).then(response => {
            showSnackbarMessage(response, 'H υποβολή σχολίου έγινε επιτυχώς!' + (pageInfo.CommentNeedsApproval === 1 ? 'Αναμένεται έγκριση!' : ''))            
            setLoading(false);
            setFirstname('');
            setLastname('');
            setDirection('');
            setDepartment('');

            var data = {};
            data.url = pageInfo.Url;
            dispatch(getPageInfo(data));
          }).catch(error => {

            var msg = 'Αποτυχία σύνδεσης στον διακομιστή!';
            var snackbarInfo = {};
            snackbarInfo.openMessage = true;
            snackbarInfo.message = <div>{msg}</div>;
            snackbarInfo.variant = 'error';

            setLoading(false);
            setFirstname('');
            setLastname('');
            setDirection('');
            setDepartment('');
            store.dispatch({ type: 'SHOW_SNACKBAR', payload: snackbarInfo });
          });
        } else {
          setLoading(false);
          showSnackbarMessage(undefined, 'Παρακάλω συμπληρώστε κάποιο σχόλιο');
        }
      }}>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
        <TextField          
          type="text"
          label="Όνομα"
          variant='outlined'
          value={firstname}
          style={{ width: '300px' }}
          onChange={(e) => { setFirstname(e.target.value); }}
          className={classes.root}
          inputProps={{ className: classes.root }}
        />
        <TextField          
          type="text"
          label="Επώνυμο"
          variant='outlined'
          value={lastname}
          style={{ width: '300px', marginLeft: '15px' }}
          onChange={(e) => { setLastname(e.target.value); }}
          className={classes.root}
          inputProps={{ className: classes.root }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
        <TextField
          type="text"
          label="Διεύθυνση"
          variant='outlined'
          value={direction}
          style={{ width: '500px' }}
          onChange={(e) => { setDirection(e.target.value); }}
          className={classes.root}
          inputProps={{ className: classes.root }}
        />
        <TextField
          type="text"
          label="Τμήμα"
          variant='outlined'
          value={department}
          style={{ width: '500px', marginLeft: '15px' }}
          onChange={(e) => { setDepartment(e.target.value); }}
          className={classes.root}
          inputProps={{ className: classes.root }}
        />
      </div>
      <div style={{ marginTop: '30px' }}>
        <ReactQuill
          value={content}
          onChange={(e) => { setContent(e); }}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button          
          type='submit'
          style={{
            fontSize: '18px',
            textAlign: 'center',
            backgroundColor: 'blue', 
            color: 'white'
          }}>
          {loading && <CircularProgress size={18} style={{ color: 'white' }} />}
          {!loading && 'ΥΠΟΒΟΛΗ NEOY ΣΧΟΛΙΟΥ'}
        </Button>
      </div>
    </form>
  else
    <></>
}