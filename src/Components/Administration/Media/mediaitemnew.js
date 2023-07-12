import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { addMediaItem, editMediaItem } from '../../../Redux/Actions/index';
import HomeWrapper from '../../Home/homewrapper';
import { useStyles } from '../../Styles/styles';
import { showSnackbarInfoMessage, showFailedConnectWithServerMessage } from '../../Common/methods';

export default function MediaItemNew(props) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const [fileData, setFileData] = useState('');
  let navigate = useNavigate();
  const { processItem } = useSelector(state => ({ processItem: state.media_reducer.processItem }));
  const { categoriesList } = useSelector(state => ({ categoriesList: state.categories_reducer.categoriesList }));
  const { mediaItemDetails } = useSelector(state => ({ mediaItemDetails: state.media_reducer.mediaItemDetails }));
  const [categories, setCategories] = useState(mediaItemDetails?.categoriesInfo || '');
  const [title, setTitle] = useState(mediaItemDetails?.Title || '');

  const handleClick = () => {
    if (location.state.isNew !== 2) {
      if (fileData) {
        const formData = new FormData();
        formData.append('file', fileData);
        if (categories)
          categories.forEach(category => formData.append('categories[]', category.Id))
        dispatch(addMediaItem(formData)).then(res => {
          if (res && res.value && res.value.info === true)
            showSnackbarInfoMessage(res.value.message);
        }).catch(error => {
          showFailedConnectWithServerMessage(error);
        });
      } else
        showSnackbarInfoMessage('Παρακαλώ επιλέξτε κάποιο αρχείο');
    } else {
      var data = {};
      data.id = mediaItemDetails.Id;
      data.categories = categories;
      data.title = title;

      dispatch(editMediaItem(data)).then(res => {
        if (res && res.value && res.value.info === true)
          showSnackbarInfoMessage(res.value.message);
      }).catch(error => {
        showFailedConnectWithServerMessage(error);
      })
    }
  };
  function renderForm() {
    if (location.state.isNew !== 2) {
      return <div className="form-group">
        <input
          type="file"
          style={{ fontSize: 26, padding: 20, width: '400px' }}
          onChange={(e) => { setFileData(e.target.files[0]); }} />
      </div>
    }
  }
  if (processItem === true) {
    dispatch(dispatch({ type: 'SET_MEDIAITEM_STATUS', payload: false }));
    navigate(-1);
  } else
    return <HomeWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
        <span style={{ textAlign: 'center', fontSize: 46, margin: '50px' }}>Προσθήκη Αρχείου</span>
        <TextField
          type="text"
          label="Τίτλος"
          variant='outlined'
          value={title || ''}
          style={{ margin: '20px', width: '400px' }}
          isRequired={true}
          required={true}
          onChange={(e) => { setTitle(e.target.value) }}
          InputLabelProps={{ shrink: true }}
          inputProps={{ style: { textAlign: 'Left' } }}
        />
        <Autocomplete
          options={categoriesList || []}
          filterSelectedOptions
          multiple
          getOptionLabel={item => ((item && item.Name ? item.Name : ''))}
          onChange={(event, value) => setCategories(value)}
          defaultValue={categories || []}
          style={{ padding: '0px', flexWrap: 'wrap', width: '400px' }}
          renderOption={(props, option) => {
            const { Name } = props;
            return (<span style={{ backgroundColor: 'transparent', color: 'blue', padding: '5px' }}>
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
        {renderForm()}
        <Button style={{ fontSize: 20, marginTop: '25px', width: '250px' }} variant="contained" color="primary" onClick={handleClick}>
          {location.state.isNew === 2 ? 'Αποθήκευση' : 'Μεταφόρτωση'}
        </Button>
        <Button style={{ fontSize: 20, marginTop: '25px', width: '250px', backgroundColor: 'orangered' }} variant="contained" color="primary" onClick={(e) => { navigate(-1) }}>
          Ακύρωση
        </Button>
      </div >
    </HomeWrapper>
}