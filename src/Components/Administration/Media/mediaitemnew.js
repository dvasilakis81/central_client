import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { addNewMediaItem } from '../../../Redux/Actions/index';
import HomeWrapper from '../../Home/homewrapper';
import { useStyles } from '../../Styles/styles';
import { showSnackbarInfoMessage } from '../../Common/methods';

export default function MediaItemNew(props) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [fileData, setFileData] = useState('');
  let navigate = useNavigate();
  const newItemAdded = useSelector(state => ({ newItemAdded: state.central_reducer.newItemAdded }));
  const { categoriesList } = useSelector(state => ({ categoriesList: state.parametricdata_reducer.categoriesList }));
  const { mediaItemDetails } = useSelector(state => ({ mediaItemDetails: state.media_reducer.mediaItemDetails }));
  const [categories, setCategories] = useState(mediaItemDetails?.categoriesInfo || '');

  const handleClick = () => {

    const formData = new FormData();
    formData.append('file', fileData);
    if (categories)
      categories.forEach(category => formData.append('categories[]', category.Id))
    // formData.append('categories', categories);
    dispatch(addNewMediaItem(formData)).then(res => {
      if (res && res.value && res.value.info === true)
        showSnackbarInfoMessage(res.value.message);
        
      // showSnackbarMessage(response, 'H υποβολή σχολίου έγινε επιτυχώς!' + (pageInfo.CommentNeedsApproval === 1 ? 'Αναμένεται έγκριση!' : ''))            
      var x = 1;
    });
  };

  if (newItemAdded === true) {
    dispatch(dispatch({ type: 'SET_ADDED_NEWITEM', payload: false }));
    navigate(-1);
  }
  else
    return <HomeWrapper>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
        <span style={{ textAlign: 'center', fontSize: 46, margin: '50px' }}>Προσθήκη Αρχείου</span>
        <Autocomplete
          options={categoriesList || []}
          filterSelectedOptions
          multiple
          getOptionLabel={item => ((item && item.Name ? item.Name : ''))}
          onChange={(event, value) => setCategories(value)}
          defaultValue={categories || []}
          style={{ padding: '0px', flexWrap: 'wrap', width: '800px' }}
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
    </HomeWrapper>
}