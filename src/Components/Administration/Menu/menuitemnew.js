import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Checkbox } from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelAltIcon from '@material-ui/icons/Cancel';

import { useNavigate, useLocation } from 'react-router-dom';
import { addNewMenuItem, editNewMenuItem } from '../../../Redux/Actions/index';
import HomeWrapper from '../../Home/homewrapper';
import SelectImage from './selecticon';
import { Announcement } from '@mui/icons-material';

const styles = {
  textfield: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginTop: '5px',
    width: 800,
    background: 'white',
    borderRadius: '20px'
  }
}
export default function MenuItemNew(props) {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();

  //let menuItemDetails2 = useSelector((state) => state.menu_reducer.menuItemDetails);
  let menuItemDetails2 = useSelector((state) => {
    return location.state.itemtype === 0 ? state.menu_reducer.menuItemDetails : state.menu_reducer.serviceItemDetails;
  });
  let menuItemDetails;
  if (location.state && location.state.isNew === 2)
    menuItemDetails = menuItemDetails2;
  let newMenuAdded = useSelector((state) => state.menu_reducer.newMenuAdded);

  //const [open, setOpen] = useState(props.open);
  const [count, setCount] = useState(0);
  const [id, setId] = useState(menuItemDetails && menuItemDetails.Id || '');
  const [name, setName] = useState(menuItemDetails && menuItemDetails.Name || '');
  const [url, setUrl] = useState(menuItemDetails && menuItemDetails.Url || '');
  const [imageService, setImageService] = useState(menuItemDetails?.ImageService || '');
  const [imageMenu, setImageMenu] = useState(menuItemDetails?.ImageMenu || '');
  const [pageUrl, setPageUrl] = useState(menuItemDetails?.PageUrl || '');
  const [orderNo, setOrderNo] = useState(menuItemDetails?.OrderNo || 0);
  const [isdeleted, setIsdeleted] = useState(menuItemDetails?.isDeleted || false);
  const [hidden, setHidden] = useState((menuItemDetails?.Hidden === 1 ? true : false) || false);
  const [announce, setAnnounce] = useState(menuItemDetails?.Announce || 0);
  const [menuItem, setMenuItem] = useState(menuItemDetails?.MenuItem || 0);
  const [serviceItem, setServiceItem] = useState(menuItemDetails?.ServiceItem || 0);

  //let height = useSelector(state => state.parametricdata_reducer.screenDimensions.height);
  //let width = useSelector(state => state.parametricdata_reducer.screenDimensions.width);

  // const getPopoverTop = useCallback(
  //   () => {
  //     var ret = (height / 2) - 250;
  //     return ret;
  //   }, []
  // );
  // const getPopoverLeft = useCallback(
  //   () => {
  //     var ret = (width / 2) - 400;
  //     return ret;
  //   }, []
  // );  

  const handleClick = () => {

    //setCount(count + 1);
    //alert(name);
    var data = {};
    data.id = id;
    data.name = name;
    data.url = url;
    data.pageUrl = pageUrl;
    data.deleted = isdeleted;
    data.hidden = hidden;
    data.imageService = imageService;
    data.imageMenu = imageMenu;
    data.menuItem = menuItem || 0;
    data.serviceItem = serviceItem || 0;
    data.announce = announce || 0;
    data.orderNo = orderNo;

    if (location.state.isNew === 2)
      dispatch(editNewMenuItem(data));
    else
      dispatch(addNewMenuItem(data));

    navigate(-1);
    // appendItem(data, dispatch).then(() => {
    //   if (menuItemsRejected)
    //     console.log('menuItemsRejected:' + menuItemsRejected);
    //   else
    //     navigate(-1);
    // })
  };

  // const appendItem = (data, dispatch) => new Promise((resolve, reject) => {
  //   // do anything here
  //   dispatch(addNewMenuItem(data));
  //   resolve();
  // });

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
  };
  const handleChangeImageService = (e) => {
    setImageService(e);
  };
  const handleChangeImageMenu = (e) => {
    setImageMenu(e.target.value);
  };

  // const handleChangeMenuItem = (e) => {
  //   setMenuItem(e.target.value);
  // };

  if (newMenuAdded === true) {
    dispatch(dispatch({ type: 'SET_ADDED_NEWITEM', payload: false }));
    navigate(-1);
  } else {
    return <HomeWrapper>
      <div style={{ display: 'flex', flexFlow: 'column', flexWrap: 'wrap', overflowY: 'hidden', width: '100%', height: '100%', background: 'white', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
        {/* <div style={{ fontSize: 46, color: 'black', textAlign: 'center', flexGrow: 1, alignSelf: 'center', background:'red'  }}> */}
        <div style={{ display: 'flex', flex: '1', flexFlow: 'column', overflowY: 'hidden', overflowX: 'hidden', flexWrap: 'wrap', alignContent: 'center' }}>
          <div style={{ padding: '10px' }}>
            <TextField
              label="Όνομα"
              variant='outlined'
              type="text"
              style={styles.textfield}
              value={name}
              isRequired={true}
              onChange={handleChangeName}
              inputProps={{ style: { textAlign: 'Left' } }}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <TextField
              type="text"
              label="Εξωτερικό URL"
              variant='outlined'
              style={styles.textfield}
              value={url}
              isRequired={true}
              required={true}
              onChange={handleChangeUrl}
              inputProps={{ style: styles.textfield }}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <TextField
              type="text"
              label="Εσωτερικό URL"
              variant='outlined'
              style={styles.textfield}
              value={pageUrl}
              isRequired={true}
              required={true}
              onChange={(e) => { setPageUrl(e.target.value) }}
              inputProps={{ style: { textAlign: 'Left' } }}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <TextField
              type="number"
              label="Σειρά"
              variant='outlined'
              style={styles.textfield}
              value={orderNo}
              isRequired={true}
              required={true}
              onChange={(e) => { setOrderNo(e.target.value) }}
              InputLabelProps={{ shrink: true }}
              inputProps={{ style: { textAlign: 'Left' } }}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <SelectImage label="Εικονίδιο Υπηρεσίας" image={imageService} setImage={handleChangeImageService} customstyle={styles.textfield} imagetype={1} />
          </div>
          <div style={{ padding: '10px' }}>
            <SelectImage label="Εικονίδιο Μενού-fontawesome icon" image={imageMenu} setImage={handleChangeImageMenu} customstyle={styles.textfield} imagetype={2} />
          </div>
          <div style={{ display: 'flex', flexFlow: 'row', overflowY: 'hidden', overflowX: 'hidden' }}>
            <div style={{ fontSize: 24, padding: 20, textAlign: 'left' }}>
              <Checkbox
                label='Μενού'
                defaultChecked={false}
                color='primary'
                checked={menuItem}
                onChange={e => setMenuItem(e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }} />
              <span>Μενού</span>
            </div>
            <div style={{ fontSize: 24, padding: 20, textAlign: 'left' }}>
              <Checkbox
                label='Υπηρεσία'
                defaultChecked={false}
                color='primary'
                checked={serviceItem}
                onChange={e => setServiceItem(e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }} />
              <span>Υπηρεσία</span>
            </div>
            <div style={{ fontSize: 24, padding: 20, textAlign: 'left' }}>
              <Checkbox
                label='Ανακοίνωση'
                defaultChecked={false}
                color='primary'
                checked={announce}
                onChange={e => setAnnounce(e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <span>Ανακοίνωση</span>
            </div>
            <div style={{ fontSize: 24, padding: 20, textAlign: 'left' }}>
              <Checkbox
                label='Κρυφό'
                defaultChecked={false}
                color='primary'
                checked={hidden}
                onChange={e => setHidden(e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <span>Κρυφό</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexFlow: 'row', height: 'auto', textAlign: 'right', marginTop: '0px' }}>
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
              onClick={() => { navigate(-1); }}>
              <CancelAltIcon />
              Ακύρωση
            </Button>
          </div>
        </div>
      </div >
    </HomeWrapper>
  }
}