import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import { Checkbox } from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelAltIcon from '@material-ui/icons/Cancel';

import { useNavigate, useLocation } from 'react-router-dom';
import { addNewMenuItem, editNewMenuItem } from '../../../Redux/Actions/index';
import HomeWrapper from '../../Home/homewrapper';
import SelectImage from '../SelectImage/selectimage';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useStyles } from '../../Administration/Styles/styles';

const styles = {
  textfield: {
    fontSize: '16px',
    fontWeight: 'normal',
    marginTop: '5px',
    width: 800
  }
}
const CustomPaper = (props) => {
  return <Paper  {...props} style={{ width: 'auto', backgroundColor: 'lightgray', padding: '0px', margin: '0px' }} />;
};
export default function MenuItemNew(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();

  let pageItemsList = useSelector((state) => state.page_reducer.pageItemsList);
  let categoriesList = useSelector((state) => state.parametricdata_reducer.categoriesList);

  let menuItemDetails2 = useSelector((state) => {
    return location.state.itemtype === 1 ? state.menu_reducer.menuItemDetails : state.menu_reducer.serviceItemDetails;
  });
  let menuItemDetails;
  if (location.state && location.state.isNew === 2)
    menuItemDetails = menuItemDetails2;
  let newItemAdded = useSelector((state) => state.menu_reducer.newItemAdded);

  const [id, setId] = useState(menuItemDetails && menuItemDetails.Id || '');
  const [name, setName] = useState(menuItemDetails && menuItemDetails.Name || '');
  const [url, setUrl] = useState(menuItemDetails && menuItemDetails.Url || '');
  const [imageService, setImageService] = useState(menuItemDetails?.ImageService || '');
  const [imageMenu, setImageMenu] = useState(menuItemDetails?.ImageMenu || '');
  const [pageUrl, setPageUrl] = useState(menuItemDetails?.PageUrl || '');
  const [oldMenuOrderNo, setOldMenuOrderNo] = useState(menuItemDetails?.MenuOrderNo || 0);
  const [oldServiceOrderNo, setOldServiceOrderNo] = useState(menuItemDetails?.ServiceOrderNo || 0);
  const [menuOrderNo, setMenuOrderNo] = useState(menuItemDetails?.MenuOrderNo || 0);
  const [serviceOrderNo, setServiceOrderNo] = useState(menuItemDetails?.ServiceOrderNo || 0);
  const [isdeleted, setIsdeleted] = useState(menuItemDetails?.isDeleted || false);
  const [hidden, setHidden] = useState((menuItemDetails?.Hidden === 1 ? true : false) || false);
  const [announce, setAnnounce] = useState(menuItemDetails?.Announce || 0);
  const [menuItem, setMenuItem] = useState(menuItemDetails?.MenuItem === 1 ? true : false);
  const [serviceItem, setServiceItem] = useState(menuItemDetails?.ServiceItem === 1 ? true : false);
  const [categories, setCategories] = useState(menuItemDetails?.categoriesInfo || '');

  const handleClick = () => {

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
    data.oldServiceOrderNo = oldServiceOrderNo;
    data.serviceOrderNo = serviceOrderNo;
    data.oldMenuOrderNo = oldMenuOrderNo;
    data.menuOrderNo = menuOrderNo;
    data.categories = categories;
    if (location.state.isNew === 2)
      dispatch(editNewMenuItem(data));
    else
      dispatch(addNewMenuItem(data));

    navigate(-1);
  };

  if (newItemAdded === true) {
    dispatch(dispatch({ type: 'SET_ADDED_NEWITEM', payload: false }));
    navigate(-1);
  } else {
    return <HomeWrapper>
      <div style={{ display: 'flex', flexFlow: 'column', flexWrap: 'wrap', overflowY: 'hidden', width: '100%', height: '100%', background: 'white', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <div style={{ display: 'flex', flex: '1', flexFlow: 'column', overflowY: 'hidden', overflowX: 'hidden', flexWrap: 'wrap', alignContent: 'center' }}>
          <div style={{ padding: '10px' }}>
            <TextField
              label="Όνομα"
              variant='outlined'
              type="text"
              className={classes.root}
              style={styles.textfield}
              value={name}
              isRequired={true}
              onChange={(e) => { setName(e.target.value); }}
              inputProps={{ style: { textAlign: 'Left' } }}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <TextField
              type="text"
              label="Εξωτερικό URL"
              variant='outlined'
              className={classes.root}
              style={styles.textfield}
              value={url}
              isRequired={false}
              required={true}
              onChange={(e) => { setUrl(e.target.value); }}
              inputProps={{ style: styles.textfield }}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <Autocomplete
              options={pageItemsList || []}
              getOptionLabel={item => (item.Url || '')}
              onChange={(event, value) => setPageUrl(value)}
              filterSelectedOptions
              defaultValue={{ Url: pageUrl }}
              PaperComponent={CustomPaper}
              renderOption={(props, option) => {
                const { Url } = props;
                return (
                  <span style={{ backgroundColor: 'transparent', color: 'blue', padding: '5px' }}>
                    {/* <span style={{ fontSize: '10px' }}>{'\u2B24'}</span>  */}
                    <i class="fa fa-file" />
                    <span style={{ marginLeft: '10px' }}>{Url}</span>
                  </span>
                );
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  className={classes.root}
                  variant="outlined"
                  placeholder="Σελίδα"
                />
              )}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <Autocomplete
              options={categoriesList || []}
              filterSelectedOptions
              multiple
              getOptionLabel={item => (item.Name || '')}
              onChange={(event, value) => setCategories(value)}
              defaultValue={categories || []}
              PaperComponent={CustomPaper}
              ChipProps={{ color: 'red' }}
              style={{ flex: '1', padding: '0px', flexWrap: 'wrap', maxWidth: '800px' }}
              renderOption={(props, option) => {
                const { Name } = props;
                return (
                  <span style={{ backgroundColor: 'transparent', color: 'blue', padding: '5px' }}>
                    <i class="fa fa-tag" />
                    <span style={{ marginLeft: '10px' }}>{Name}</span>
                  </span>
                );
              }}
              renderInput={params => (
                <TextField
                  {...params}
                  className={classes.root}
                  variant="outlined"
                  placeholder="Κατηγορίες"
                  fullWidth
                />
              )}
            />
          </div>
          <div style={{ padding: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              {menuItem === true || menuItem === 1 ?
                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'nowrap' }}>
                  <TextField
                    type="number"
                    label="Σειρά στο Μενού"
                    variant='outlined'
                    className={classes.root}
                    value={menuOrderNo}
                    isRequired={true}
                    required={true}
                    onChange={(e) => { setMenuOrderNo(e.target.value) }}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ style: { textAlign: 'Left' } }}
                  />
                  <div style={{ marginLeft: '15px', display: 'flex', flex: 1 }}>
                    <SelectImage
                      label="Εικονίδιο Μενού-fontawesome icon"
                      image={imageMenu}
                      customstyle={{ flex: 1 }}
                      setImage={(e) => {
                        if (typeof e === 'object')
                          setImageMenu(e.target.value);
                        else
                          setImageMenu(e);
                      }}
                      imagetype={2} />
                  </div>
                </div> : <></>}
            </div>
          </div>
          <div style={{ padding: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              {serviceItem === 1 || serviceItem === true ?
                <div style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'nowrap' }}>
                  <TextField
                    type="number"
                    label="Σειρά Υπηρεσία"
                    variant='outlined'
                    className={classes.root}
                    value={serviceOrderNo}
                    isRequired={true}
                    required={true}
                    onChange={(e) => { setServiceOrderNo(e.target.value) }}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ style: { textAlign: 'Left' } }}
                  />
                  <div style={{ marginLeft: '15px', display: 'flex', flex: 1 }}>
                    <SelectImage label="Εικονίδιο Υπηρεσίας"
                      image={imageService}
                      customstyle={{ flex: 1 }}
                      setImage={(e) => {
                        if (typeof e === 'object')
                          setImageService(e.target.value);
                        else
                          setImageService(e);
                      }}
                      imagetype={1} />
                  </div>
                </div> : <></>}
            </div>
          </div>
          {/* <div style={{ padding: '10px' }}>
            <SelectImage
              label="Εικονίδιο Μενού-fontawesome icon"
              image={imageMenu}
              setImage={(e) => {
                if (typeof e === 'object')
                  setImageMenu(e.target.value);
                else
                  setImageMenu(e);
              }}
              customstyle={styles.textfield}
              imagetype={2} />
          </div> */}
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