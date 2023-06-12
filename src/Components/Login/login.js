import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Redux/Actions';
import store from '../../Redux/Store/store'
import { getTextField, getButton } from '../MaterialObjects/materialobjects'
import Body from '../../HOC/Body/body';
import MySnackbar from '../Common/MySnackbar';
import '../Common/templates';
import { getServerErrorResponseMessage } from '../../Helper/helpermethods';
import { useNavigate, useLocation } from 'react-router-dom';

const pageStyles = {
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  btnConnect: {
    position: 'relative',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    width: '30%',
    padding: '10px',
  },
  login: {
    display: 'flex',
    flexDirection: 'column',
    background: '#333',
    minWidth: '500px',
    padding: '20px',
    borderRadius: '20px'
  }
};

export default function Login(props) {

  const dispatch = useDispatch();
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  let navigate = useNavigate();
  const { token } = useSelector(state => ({ token: state.token_reducer.token }));
  const { tokenRejected } = useSelector(state => ({ tokenRejected: state.token_reducer.tokenRejected }));

  useEffect(() => {
    // dispatch(getMenuItems());
    // dispatch(getServiceItems());
    // if (pageItemsList) {
    // } else
    //   dispatch(getPageItems());
    // dispatch(getCategories());
    // dispatch(getMediaItems());
  }, [])

  function handleSubmit(e) {
    e.preventDefault();

    if (username === '' || password === '') {
      setLoginSuccess(false);
      setMessage(username === '' ? 'Εισάγετε όνομα χρήστη!' : 'Εισάγετε κωδικό!');
      setOpenMessage(true);
      setVariant('info');
    }
    else {
      var data = {}
      data.username = username;
      data.password = password;

      dispatch(loginUser(data)).then(response => {
        var snackbarInfo = {};
        if (response.value.success === false) {
          snackbarInfo.openMessage = true;
          snackbarInfo.message = response.value.message;
          snackbarInfo.variant = 'error';
          store.dispatch({ type: 'SHOW_SNACKBAR', payload: snackbarInfo });
        }        
      }).catch(error => {
        var msg = 'Αποτυχία σύνδεσης στον διακομιστή!';
        var snackbarInfo = {};
        snackbarInfo.openMessage = true;
        snackbarInfo.message = <div>{msg}</div>;
        snackbarInfo.variant = 'error';
        store.dispatch({ type: 'SHOW_SNACKBAR', payload: snackbarInfo });
      })
    }
  }

  function handleClose(event, reason) {
    //this.setState({ message: '', openMessage: false });
    //store.dispatch({ type: 'RESET_TOKEN_JWT_REJECTED', payload: undefined })
  };
  // function setTextValue(e) {
  //   this.setState({ [e.target.id]: e.target.value });
  // }

  function getLoginTemplate() {

    return (
      // <Body isLoginPage={true}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', marginTop: '-100px' }}>
        <div>
          <div style={pageStyles.login}>
            <img src={'img/moa.png'} alt="Δήμος Αθηναίων" width='183' height='85' style={{ marginBottom: '20px', padding: '10px' }} />
            <TextField
              disabled={false}
              required={true}
              type='text'
              id='username'
              label='Όνομα χρήστη'
              value={username}
              variant='filled'
              style={{ paddingBottom: '10px' }}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              InputProps={{ style: { fontFamily: 'Arial', color: 'blue', background: 'white' } }}
              size='normal'
            />
            <TextField
              disabled={false}
              required={true}
              type='password'
              id='password'
              label='Κωδικός'
              value={password}
              variant='filled'
              style={{ paddingBottom: '10px' }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              InputProps={{ style: { fontFamily: 'Arial', color: 'blue', background: 'white' } }}
              size='normal'
            />
            {getButton('contained', 'small', 'primary', pageStyles.btnConnect, handleSubmit, 'Σύνδεση', null, false)}
            <MySnackbar vertical='bottom' horizontal='right' useScreenDimensions={true} />
            {/* <MySnackbar state={this.state} duration={5000} handleClose={this.handleClose} vertical='bottom' horizontal='center' useScreenDimensions={false} /> */}
          </div>
        </div>
      </div>
      // </Body>
    )
  }

  if (token && token.success === true)
    navigate("/administration");
  else
    return (getLoginTemplate())
}
