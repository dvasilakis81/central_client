import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelAltIcon from '@material-ui/icons/Cancel';
import { useNavigate, useLocation } from 'react-router-dom';
import Paper from "@material-ui/core/Paper";

import { addUser, editUser } from '../../../Redux/Actions/index';
import { useStyles } from '../../Administration/Styles/styles';
import HomeWrapper from '../../Home/homewrapper';
import store from '../../../Redux/Store/store';
import { getServerErrorResponseMessage } from '../../../Helper/helpermethods';
const styles = {
  textfield: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginTop: '5px',
    width: '100%',
    background: 'white',
    borderRadius: '20px',
    transform: "scale(1)"
  },
  smallTextfield: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginTop: '0px',
    width: 'auto',
    background: 'white',
    borderRadius: '20px'
  }
}

const CustomPaper = (props) => {
  return <Paper  {...props} style={{ width: 'auto', backgroundColor: 'lightgray', padding: '0px', margin: '0px' }} />;
};

export default function UserItemNew(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openMessage, setOpenMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');
  let navigate = useNavigate();
  let location = useLocation();

  let userItemDetails2 = useSelector((state) => { return state.user_reducer.userItemDetails });
  let userItemDetails;
  if (location.state && location.state.isNew === 2)
    userItemDetails = userItemDetails2;
  let newItemAdded = useSelector((state) => state.user_reducer.newItemAdded);
  let itemChanged = useSelector((state) => state.user_reducer.itemChanged);

  const [id, setId] = useState(userItemDetails && userItemDetails.Id || '');
  const [username, setUsername] = useState(userItemDetails && userItemDetails.Username || '');
  const [password, setPassword] = useState(userItemDetails && userItemDetails.Password || '');
  const [firstname, setFirstname] = useState(userItemDetails && userItemDetails.Firstname || '');
  const [lastname, setLastname] = useState(userItemDetails && userItemDetails.Lastname || '');
  //const [role, setRole] = useState(userItemDetails?.Role || false);  

  if (newItemAdded === true || itemChanged === true) {
    dispatch({ type: 'SET_ADDED_NEWUSER', payload: false });
    navigate(-1);
  } else {
    return <HomeWrapper>
      <form
        style={{
          display: 'flex',
          flexFlow: 'column',
          flex: 1,
          flexWrap: 'wrap',
          overflowY: 'scroll',
          height: '100%',
          background: 'white',
          justifyContent: 'start',
          alignItems: 'center',
        }}
        onSubmit={(e) => {
          e.preventDefault();

          var data = {};
          data.id = id;
          data.username = username;
          data.password = password;
          data.firstname = firstname;
          data.lastname = lastname;

          if (location.state.isNew === 2)
            dispatch(editUser(data)).then();
          else
            dispatch(addUser(data)).then(response => {
              var snackbarInfo = {};
              if (response.value.success === false) {
                snackbarInfo.openMessage = true;
                snackbarInfo.message = response.value.message;
                snackbarInfo.variant = 'error';
                store.dispatch({ type: 'SHOW_SNACKBAR', payload: snackbarInfo });
              }
            }).catch(error => {
              var snackbarInfo = {};
              snackbarInfo.openMessage = true;
              snackbarInfo.message = 'Αποτυχία σύνδεσης στον διακομιστή!';
              snackbarInfo.variant = 'error';
              store.dispatch({ type: 'SHOW_SNACKBAR', payload: snackbarInfo });

              // setMessage(<><div>{msg}</div><div>{getServerErrorResponseMessage(error)}</div></>);
              // setOpenMessage(true);
              // setVariant('error');
            })
        }}>
        <div style={{ fontSize: '36px', fontWeight: 'bold', marginTop: '20px' }}>
          Στοιχεία Νέου Χρήστη
        </div>
        <div
          style={{
            display: 'flex',
            flexFlow: 'row',
            background: 'white',
            justifyContent: 'start',
            alignItems: 'center'
          }}>
          <div style={{ margin: '20px' }}>
            <TextField
              required
              type="text"
              label="Username"
              variant='outlined'
              style={styles.textfield}
              value={username}
              onChange={(e) => { setUsername(e.target.value); }}
              inputProps={{ style: styles.textfield }}
            />
          </div>
          <div style={{ margin: '20px' }}>
            <TextField
              required
              type="password"
              label="Password"
              variant='outlined'
              style={styles.textfield}
              value={password}
              onChange={(e) => { setPassword(e.target.value); }}
              inputProps={{ style: styles.textfield }}
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexFlow: 'row',
            background: 'white',
            justifyContent: 'start',
            alignItems: 'center'
          }}>
          <div style={{ margin: '20px' }}>
            <TextField
              required
              type="text"
              label="Όνομα"
              variant='outlined'
              style={styles.textfield}
              value={firstname}
              onChange={(e) => { setFirstname(e.target.value); }}
              inputProps={{ style: styles.textfield }}
            />
          </div>
          <div style={{ margin: '20px' }}>
            <TextField
              required
              type="text"
              label="Επίθετο"
              variant='outlined'
              style={styles.textfield}
              value={lastname}
              onChange={(e) => { setLastname(e.target.value); }}
              inputProps={{ style: styles.textfield }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexFlow: 'column', overflowY: 'hidden', overflowX: 'hidden', marginTop: '20px' }}>
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', textAlign: 'right', marginTop: '20px' }}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              style={{ margin: '5px', textTransform: 'none', fontSize: '16px' }}>
              <SaveAltIcon />
              Αποθήκευση
            </Button>
            <Button
              variant="contained"
              style={{ margin: '5px', background: 'orangered', textTransform: 'none', fontSize: '16px' }}
              onClick={() => { navigate(-1); }}>
              <CancelAltIcon />
              Ακύρωση
            </Button>
          </div>
        </div>
      </form>
    </HomeWrapper >

    {/* <div style={{ padding: '10px' }}>
              <TextField
                required
                type="text"
                label="URL"
                variant='outlined'
                style={styles.textfield}
                value={url}
                onChange={(e) => { setUrl(e.target.value); }}
                inputProps={{ style: styles.textfield }}
              />
            </div> */}
    {/* <div style={{ padding: '5px', display: 'flex', direction: 'row', marginTop: '10px'  }}>
              <div style={{ display: 'flex', direction: 'row' }}>
                <div style={{ width: '30px', height: '30px', background: backgroundColor, padding: '1px', marginRight: '10px', border: '1px solid black' }}></div>
                <TextField
                  type="text"
                  label="Background Color"
                  variant='outlined'
                  styles={{ width: 'auto' }}
                  value={backgroundColor}
                  onChange={(e) => { setBackgroundColor(e.target.value) }}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ style: { textAlign: 'Left' } }}
                />
              </div>
              <div style={{ display: 'flex', direction: 'row', marginLeft: '20px' }}>
                <div style={{ width: '30px', height: '30px', background: color, padding: '1px', marginRight: '10px', border: '1px solid black' }}></div>
                <TextField
                  type="text"
                  label="Foreground Color"
                  variant='outlined'
                  value={color}
                  onChange={(e) => { setColor(e.target.value) }}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ style: { textAlign: 'Left' } }}
                />
              </div>
              <div style={{ display: 'flex', direction: 'row', marginLeft: '20px' }}>
                <TextField
                  type="number"
                  label="Σειρά"
                  variant='outlined'
                  style={styles.smallTextfield}
                  value={orderNo}
                  onChange={(e) => { setOrderNo(e.target.value) }}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ style: { textAlign: 'Left' } }}
                />
              </div>
            </div> */}
    {/* <div style={{ padding: '10px' }}>
              <SelectImage
                label="Εικονίδιο"
                image={imageFile}
                setImage={(e) => {
                  if (typeof e === 'object')
                    setImageFile(e.target.value);
                  else
                    setImageFile(e);
                }}
                customstyle={styles.textfield}
                imagetype={1} />
            </div>
            <div style={{ padding: '10px' }}>
              <SelectImage label="Εικονίδιο fontawesome"
                image={imageFontAwesome}
                setImage={(e) => {
                  if (typeof e === 'object')
                    setImageFontAwesome(e.target.value);
                  else
                    setImageFontAwesome(e);
                }}
                customstyle={styles.textfield}
                imagetype={2} />
            </div> */}
  }
}