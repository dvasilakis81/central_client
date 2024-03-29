import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelAltIcon from '@material-ui/icons/Cancel';
import { useNavigate, useLocation } from 'react-router-dom';
import { addUser, editUser } from '../../../Redux/Actions/index';
import { useStyles } from '../../Styles/styles';
import HomeWrapper from '../../Home/homewrapper';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@mui/material/FormControlLabel';
import { showSnackbarMessage, showFailedConnectWithServerMessage } from '../../Common/methods';

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

export default function UserItemNew(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  let userItemDetails2 = useSelector((state) => { return state.user_reducer.userItemDetails });
  let userItemDetails;
  if (location.state && location.state.isNew === 2)
    userItemDetails = userItemDetails2;

  const { newItemAdded } = useSelector(state => ({ newItemAdded: state.user_reducer.newItemAdded }));
  const { itemChanged } = useSelector(state => ({ itemChanged: state.user_reducer.itemChanged }));

  const [id, setId] = useState(userItemDetails && userItemDetails.Id || '');
  const [username, setUsername] = useState(userItemDetails && userItemDetails.Username || '');
  const [password, setPassword] = useState(userItemDetails && userItemDetails.Password || '');
  const [firstname, setFirstname] = useState(userItemDetails && userItemDetails.Firstname || '');
  const [lastname, setLastname] = useState(userItemDetails && userItemDetails.Lastname || '');

  const [viewMenuItem, setViewMenuItem] = useState(getUserRightValue(userItemDetails, 'Κεντρικό Μενού', 'view'));
  const [createMenuItem, setCreateMenuItem] = useState(getUserRightValue(userItemDetails, 'Κεντρικό Μενού', 'create'));
  const [updateMenuItem, setUpdateMenuItem] = useState(getUserRightValue(userItemDetails, 'Κεντρικό Μενού', 'update'));
  const [deleteMenuItem, setDeleteMenuItem] = useState(getUserRightValue(userItemDetails, 'Κεντρικό Μενού', 'delete'));
  const [allMenuItem, setAllMenuItem] = useState(false);

  const [viewServiceItem, setViewServiceItem] = useState(getUserRightValue(userItemDetails, 'Υπηρεσίες', 'view'));
  const [createServiceItem, setCreateServiceItem] = useState(getUserRightValue(userItemDetails, 'Υπηρεσίες', 'create'));
  const [updateServiceItem, setUpdateServiceItem] = useState(getUserRightValue(userItemDetails, 'Υπηρεσίες', 'update'));
  const [deleteServiceItem, setDeleteServiceItem] = useState(getUserRightValue(userItemDetails, 'Υπηρεσίες', 'delete'));
  const [allServiceItem, setAllServiceItem] = useState(false);

  const [viewPageItem, setViewPageItem] = useState(getUserRightValue(userItemDetails, 'Σελίδες', 'view'));
  const [createPageItem, setCreatePageItem] = useState(getUserRightValue(userItemDetails, 'Σελίδες', 'create'));
  const [updatePageItem, setUpdatePageItem] = useState(getUserRightValue(userItemDetails, 'Σελίδες', 'update'));
  const [deletePageItem, setDeletePageItem] = useState(getUserRightValue(userItemDetails, 'Σελίδες', 'delete'));
  const [allPageItem, setAllPageItem] = useState(false);

  const [viewMediaItem, setViewMediaItem] = useState(getUserRightValue(userItemDetails, 'Αρχεία', 'view'));
  const [createMediaItem, setCreateMediaItem] = useState(getUserRightValue(userItemDetails, 'Αρχεία', 'create'));
  const [updateMediaItem, setUpdateMediaItem] = useState(getUserRightValue(userItemDetails, 'Αρχεία', 'update'));
  const [deleteMediaItem, setDeleteMediaItem] = useState(getUserRightValue(userItemDetails, 'Αρχεία', 'delete'));
  const [allMediaItem, setAllMediaItem] = useState(false);

  const [viewAnnouncementItem, setViewAnnouncementItem] = useState(getUserRightValue(userItemDetails, 'Ανακοινώσεις', 'view'));
  const [createAnnouncementItem, setCreateAnnouncementItem] = useState(getUserRightValue(userItemDetails, 'Ανακοινώσεις', 'create'));
  const [updateAnnouncementItem, setUpdateAnnouncementItem] = useState(getUserRightValue(userItemDetails, 'Ανακοινώσεις', 'update'));
  const [deleteAnnouncementItem, setDeleteAnnouncementItem] = useState(getUserRightValue(userItemDetails, 'Ανακοινώσεις', 'delete'));
  const [allAnnouncementItem, setAllAnnouncementItem] = useState(false);

  const [viewCategoryItem, setViewCategoryItem] = useState(getUserRightValue(userItemDetails, 'Κατηγορίες', 'view'));
  const [createCategoryItem, setCreateCategoryItem] = useState(getUserRightValue(userItemDetails, 'Κατηγορίες', 'create'));
  const [updateCategoryItem, setUpdateCategoryItem] = useState(getUserRightValue(userItemDetails, 'Κατηγορίες', 'update'));
  const [deleteCategoryItem, setDeleteCategoryItem] = useState(getUserRightValue(userItemDetails, 'Κατηγορίες', 'delete'));
  const [allCategoryItem, setAllCategoryItem] = useState(false);

  const [viewUserItem, setViewUserItem] = useState(getUserRightValue(userItemDetails, 'Χρήστες', 'view'));
  const [createUserItem, setCreateUserItem] = useState(getUserRightValue(userItemDetails, 'Χρήστες', 'create'));
  const [updateUserItem, setUpdateUserItem] = useState(getUserRightValue(userItemDetails, 'Χρήστες', 'update'));
  const [deleteUserItem, setDeleteUserItem] = useState(getUserRightValue(userItemDetails, 'Χρήστες', 'delete'));
  const [allUserItem, setAllUserItem] = useState(false);

  const [viewLogItem, setViewLogItem] = useState(getUserRightValue(userItemDetails, 'Logs', 'view'));
  const [deleteLogItem, setDeleteLogItem] = useState(getUserRightValue(userItemDetails, 'Logs', 'delete'));
  const [allLogItem, setAllLogItem] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0);

  function setRights(title, viewItem, setViewItem, createItem, setCreateItem, updateItem, setUpdateItem, deleteItem, setDeleteItem, allItem, setAllItems) {
    return <>
      <div style={{ margin: '5px', fontWeight: 'bold' }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', margin: '5px' }}>
        <FormControlLabel
          control={<Checkbox
            color='primary'
            checked={viewItem}
            onChange={e => {
              if (setViewItem)
                setViewItem(e.target.checked);
              // if (setCreateItem)
              //   setCreateItem(e.target.checked)
              // if (setUpdateItem)
              //   setUpdateItem(e.target.checked)
              // if (setDeleteItem)
              //   setDeleteItem(e.target.checked)
            }}
            inputProps={{ 'aria-label': 'controlled' }} />}
          label="Ανάγνωση" />
        <FormControlLabel
          control={<Checkbox
            disabled={createItem === undefined ? true : false}
            color='primary'
            checked={createItem}
            onChange={e => {
              if (setCreateItem)
                setCreateItem(e.target.checked);
            }}
            inputProps={{ 'aria-label': 'controlled' }} />}
          label="Δημιουργία" />
        <FormControlLabel
          control={<Checkbox
            disabled={updateItem === undefined ? true : false}
            color='primary'
            checked={updateItem}
            onChange={e => {
              if (setUpdateItem)
                setUpdateItem(e.target.checked);
            }}
            inputProps={{ 'aria-label': 'controlled' }} />}
          label="Ανάνεωση" />
        <FormControlLabel
          control={<Checkbox
            color='primary'
            checked={deleteItem}
            onChange={e => {
              if (setDeleteItem)
                setDeleteItem(e.target.checked);
            }}
            inputProps={{ 'aria-label': 'controlled' }} />}
          label="Διαγραφή" />

        <FormControlLabel
          control={<Checkbox
            color='primary'
            checked={allItem}
            onChange={e => {
              if (setAllItems) {
                if (setViewItem)
                  setViewItem(e.target.checked)
                if (setCreateItem)
                  setCreateItem(e.target.checked);
                if (setUpdateItem)
                  setUpdateItem(e.target.checked);
                if (setDeleteItem)
                  setDeleteItem(e.target.checked);
                if (setAllItems)
                  setAllItems(e.target.checked);
              }
            }
            }
            inputProps={{ 'aria-label': 'controlled' }} />}
          label="Όλα" />
      </div>
    </>
  }
  function getUserRightValue(userdetails, title, action) {

    if (userdetails && userdetails.rightsInfo && userdetails.rightsInfo.length === 1 && userdetails.rightsInfo[0].Rights) {
      var length = userdetails.rightsInfo[0].Rights.length;
      for (var i = 0; i < length; i++) {
        if (userdetails.rightsInfo[0].Rights[i].Title === title) {
          if (action === 'view')
            return userdetails.rightsInfo[0].Rights[i].View;
          else if (action === 'create')
            return userdetails.rightsInfo[0].Rights[i].Create;
          else if (action === 'update')
            return userdetails.rightsInfo[0].Rights[i].Update;
          else if (action === 'delete')
            return userdetails.rightsInfo[0].Rights[i].Delete;
        }
      }
    }

    return false;
  }

  const handleTabChange = (event, newValue) => { setSelectedTab(newValue) };
  const [hoveredKey, setHoveredKey] = useState(-1);
  const handleMouseEnter = (e, d) => { setHoveredKey(d); };
  const handleMouseLeave = () => { setHoveredKey(-1); };

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
          alignItems: 'center'
        }}
        onSubmit={(e) => {
          e.preventDefault();

          var data = {};
          data.id = id;
          data.username = username;
          data.firstname = firstname;
          data.lastname = lastname;
          data.password = password;
          data.rights = [];

          var centralMenu = {};
          centralMenu.Title = 'Κεντρικό Μενού';
          centralMenu.View = viewMenuItem;
          centralMenu.Create = createMenuItem;
          centralMenu.Update = updateMenuItem;
          centralMenu.Delete = deleteMenuItem;
          data.rights.push(centralMenu);

          var serviceMenu = {};
          serviceMenu.Title = 'Υπηρεσίες';
          serviceMenu.View = viewServiceItem;
          serviceMenu.Create = createServiceItem;
          serviceMenu.Update = updateServiceItem;
          serviceMenu.Delete = deleteServiceItem;
          data.rights.push(serviceMenu);

          var pages = {};
          pages.Title = 'Σελίδες';
          pages.View = viewPageItem;
          pages.Create = createPageItem;
          pages.Update = updatePageItem;
          pages.Delete = deletePageItem;
          data.rights.push(pages);

          var media = {};
          media.Title = 'Αρχεία';
          media.View = viewMediaItem;
          media.Create = createMediaItem;
          media.Update = updateMediaItem;
          media.Delete = deleteMediaItem;
          data.rights.push(media);

          var announcements = {};
          announcements.Title = 'Ανακοινώσεις';
          announcements.View = viewAnnouncementItem;
          announcements.Create = createAnnouncementItem;
          announcements.Update = updateAnnouncementItem;
          announcements.Delete = deleteAnnouncementItem;
          data.rights.push(announcements);

          var categories = {};
          categories.Title = 'Κατηγορίες';
          categories.View = viewCategoryItem;
          categories.Create = createCategoryItem;
          categories.Update = updateCategoryItem;
          categories.Delete = deleteCategoryItem;
          data.rights.push(categories);

          var users = {};
          users.Title = 'Χρήστες';
          users.View = viewUserItem;
          users.Create = createUserItem;
          users.Update = updateUserItem;
          users.Delete = deleteUserItem;
          data.rights.push(users);

          var logs = {};
          logs.Title = 'Logs';
          logs.View = viewLogItem;
          logs.Delete = deleteLogItem;
          data.rights.push(logs);

          if (location.state.isNew === 2)
            dispatch(editUser(data)).then(response => {
              showSnackbarMessage(response, 'H ενημέρωση χρήστη έγινε επιτυχώς!');
            }).catch(error => {
              showFailedConnectWithServerMessage(error);
            })
          else
            dispatch(addUser(data)).then(response => {
              showSnackbarMessage(response, 'Ο χρήστης δημιουργήθηκε επιτυχώς!');
            }).catch(error => {
              showFailedConnectWithServerMessage(error);
            })
        }}>
        <div style={{
          display: 'flex',
          flexFlow: 'column',
          overflowY: 'hidden',
          flex: 1,
          marginTop: '50px',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', flexDirection: 'row', height: 'auto', overflowY: 'hidden', overflowX: 'hidden', width: '100%', minWidth: '700px' }}>
            {<div
              className={selectedTab === 0 ? 'selected-tab' : (hoveredKey === 0 ? 'selected-tab' : 'tab')}
              onClick={(e) => { handleTabChange(e, 0) }}
              onMouseEnter={(e) => handleMouseEnter(e, 0)}
              onMouseLeave={handleMouseLeave}
              style={{ flex: 0.5 }}>
              Στοιχεία Χρήστη
            </div>}
            {<div
              className={selectedTab === 1 ? 'selected-tab' : (hoveredKey === 1 ? 'selected-tab' : 'tab')}
              onClick={(e) => { handleTabChange(e, 1) }}
              onMouseEnter={(e) => handleMouseEnter(e, 1)}
              onMouseLeave={handleMouseLeave}
              style={{ flex: 0.5 }}>
              Δικαιώματα
            </div>}
          </div>
          {selectedTab === 0 ?
            <div>
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
                    variant="outlined"
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
            </div>
            : <></>}
          {selectedTab === 1 ? <div style={{ display: 'flex', flexDirection: 'column', margin: '20px', background: 'lightblue' }}>
            {setRights('Κεντρικό Μενού', viewMenuItem, setViewMenuItem, createMenuItem, setCreateMenuItem, updateMenuItem, setUpdateMenuItem, deleteMenuItem, setDeleteMenuItem, allMenuItem, setAllMenuItem)}
            {setRights('Υπηρεσίες', viewServiceItem, setViewServiceItem, createServiceItem, setCreateServiceItem, updateServiceItem, setUpdateServiceItem, deleteServiceItem, setDeleteServiceItem, allServiceItem, setAllServiceItem)}
            {setRights('Σελίδες', viewPageItem, setViewPageItem, createPageItem, setCreatePageItem, updatePageItem, setUpdatePageItem, deletePageItem, setDeletePageItem, allPageItem, setAllPageItem)}
            {setRights('Αρχεία', viewMediaItem, setViewMediaItem, createMediaItem, setCreateMediaItem, updateMediaItem, setUpdateMediaItem, deleteMediaItem, setDeleteMediaItem, allMediaItem, setAllMediaItem)}
            {setRights('Ανακοινώσεις', viewAnnouncementItem, setViewAnnouncementItem, createAnnouncementItem, setCreateAnnouncementItem, updateAnnouncementItem, setUpdateAnnouncementItem, deleteAnnouncementItem, setDeleteAnnouncementItem, allAnnouncementItem, setAllAnnouncementItem)}
            {setRights('Κατηγορίες', viewCategoryItem, setViewCategoryItem, createCategoryItem, setCreateCategoryItem, updateCategoryItem, setUpdateCategoryItem, deleteCategoryItem, setDeleteCategoryItem, allCategoryItem, setAllCategoryItem)}
            {setRights('Χρήστες', viewUserItem, setViewUserItem, createUserItem, setCreateUserItem, updateUserItem, setUpdateUserItem, deleteUserItem, setDeleteUserItem, allUserItem, setAllUserItem)}
            {setRights('Logs', viewLogItem, setViewLogItem, undefined, undefined, undefined, undefined, deleteLogItem, setDeleteLogItem, allLogItem, setAllLogItem)}
          </div>
            : <></>}
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
        </div>
      </form>
    </HomeWrapper>
  }
}