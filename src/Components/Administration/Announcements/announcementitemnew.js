import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Checkbox } from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelAltIcon from '@material-ui/icons/Cancel';
import { useNavigate, useLocation } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from "@material-ui/core/Paper";

import { addAnnouncement, editAnnouncement } from '../../../Redux/Actions/index';
import { getBodyHeight, getHostUrl } from '../../../Helper/helpermethods';
import { useStyles } from '../../Styles/styles';
import HomeWrapper from '../../Home/homewrapper';
import SelectImage from '../SelectImage/selectimage';

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

export default function AnnouncementItemNew(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();

  let announcementItemDetails2 = useSelector((state) => { return state.announcement_reducer.announcementItemDetails });
  let announcementItemDetails;
  if (location.state && location.state.isNew === 2)
    announcementItemDetails = announcementItemDetails2;
  let newItemAdded = useSelector((state) => state.announcement_reducer.newItemAdded);
  let itemChanged = useSelector((state) => state.announcement_reducer.itemChanged);
  let categoriesList = useSelector((state) => {
    if (state.parametricdata_reducer.categoriesList) {
      const filteredItems = state.parametricdata_reducer.categoriesList.filter(
        (item) => item.HasSubCategories === 0
      );
      return filteredItems;
    }
    else
      return undefined;
  });

  const [id, setId] = useState(announcementItemDetails && announcementItemDetails.Id || '');
  const [descriptionInitial, setDescriptionInitial] = useState(announcementItemDetails && announcementItemDetails.Description || '');
  const [description, setDescription] = useState(announcementItemDetails && announcementItemDetails.Description || '');
  //const [url, setUrl] = useState(announcementItemDetails && announcementItemDetails.Url || '');
  const [title, setTitle] = useState(announcementItemDetails && announcementItemDetails.Title || '');
  //const [color, setColor] = useState(announcementItemDetails?.Color || '');
  //const [backgroundColor, setBackgroundColor] = useState(announcementItemDetails?.BackgroundColor || '');
  const [imageFile, setImageFile] = useState(announcementItemDetails?.Image || '');
  const [imageFontAwesome, setImageFontAwesome] = useState(announcementItemDetails?.Image || '');
  const [showonfirstpage, setShowonfirstpage] = useState(announcementItemDetails?.Showonfirstpage || false);
  const [hidden, setHidden] = useState(announcementItemDetails?.Hidden || false);
  //const [orderNo, setOrderNo] = useState(announcementItemDetails?.OrderNo || 0);
  const [categories, setCategories] = useState(announcementItemDetails?.categoriesInfo || '');

  if (newItemAdded === true || itemChanged === true) {
    dispatch({ type: 'SET_ADDED_NEWANNOUNCEMENT', payload: false });
    navigate(-1);
  } else {
    return <HomeWrapper>
      <form
        style={{
          display: 'flex',
          flexFlow: 'row',
          flex: 1,
          flexWrap: 'wrap',
          overflowY: 'scroll',
          height: '100%',          
          background: 'white',
          justifyContent: 'start',
          alignItems: 'stretch',
        }}
        onSubmit={(e) => {
          e.preventDefault();

          var data = {};
          data.id = id;
          data.title = title;
          data.description = description;
          //data.url = url;
          //data.color = color;
          //data.backgroundColor = backgroundColor;
          data.image = (imageFile || imageFontAwesome || '');
          data.showonfirstpage = showonfirstpage || 0;
          data.hidden = hidden || 0;
          data.categories = categories;
          //data.orderNo = orderNo;

          if (location.state.isNew === 2)
            dispatch(editAnnouncement(data));
          else
            dispatch(addAnnouncement(data));
        }}>       
          <div style={{
            width: '50%',            
            overflowX: 'hidden', 
            padding: '40px'            
          }}>
            <Editor
              tinymceScriptSrc={getHostUrl() + '/js/tinymce/tinymce.min.js'}
              init={{
                selector: 'textarea',
                resize: 'true',
                plugins: "lists link image code table media links indent fontsize autoresize",
                height: getBodyHeight() - 100,
                height: 'auto',
                min_height: 500,
                max_height: 500,
                width: 'auto',
                toolbar: "undo redo | bold italic underline | fontsize fontfamily | outdent indent | alignleft aligncenter alignright | numlist bullist | link | image | media | table | code",
                content_style: "body { font-size: 14pt; font-family: Arial; }",
                promotion: false
              }}
              initialValue={descriptionInitial}
              value={description}
              onEditorChange={(newValue, editor) => setDescription(newValue)}
            />
          </div>          
          <div style={{            
            overflowX: 'hidden',
            width: '50%',
            padding: '40px'
          }}>
            <div style={{ padding: '0px' }}>
              <Autocomplete
                options={categoriesList || []}
                filterSelectedOptions
                multiple
                getOptionLabel={item => (item.Name || '')}
                onChange={(event, value) => setCategories(value)}
                defaultValue={categories || []}
                PaperComponent={CustomPaper}
                ChipProps={{ color: 'red' }}
                style={{ width: '100%', flexWrap: 'wrap' }}
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
            <div style={{ marginTop: '10px' }}>
              <TextField
                required
                type="text"
                label="Τίτλος"
                variant='outlined'
                style={styles.textfield}
                value={title}
                onChange={(e) => { setTitle(e.target.value); }}
                inputProps={{ style: styles.textfield }}
              />
            </div>            
            <div style={{ display: 'flex', flexFlow: 'column', overflowY: 'hidden', overflowX: 'hidden', marginTop: '20px' }}>
              <div style={{ fontSize: 24, textAlign: 'left' }}>
                <Checkbox
                  defaultChecked={false}
                  color='primary'
                  checked={showonfirstpage}
                  style={{ transform: "scale(2)" }}
                  onChange={e => setShowonfirstpage(e.target.checked)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <span>Να φαίνεται στην πρώτη σελίδα</span>
              </div>
                <div style={{ fontSize: 24, marginTop: '20px', textAlign: 'left' }}>
                  <Checkbox
                    defaultChecked={false}
                    color='primary'
                    checked={hidden}
                    style={{ transform: "scale(2)" }}
                    onChange={e => setHidden(e.target.checked)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <span>Κρυφό</span>
                </div>
              </div>
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
    </HomeWrapper>

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