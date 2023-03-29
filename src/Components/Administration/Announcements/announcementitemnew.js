import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Checkbox } from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelAltIcon from '@material-ui/icons/Cancel';
//import Box from '@mui/material/Box';
import { Box } from '@material-ui/core';
import { useNavigate, useLocation } from 'react-router-dom';
import { addAnnouncement, editAnnouncement } from '../../../Redux/Actions/index';
import HomeWrapper from '../../Home/homewrapper';
import SelectImage from '../SelectImage/selectimage';
import { Editor } from '@tinymce/tinymce-react';
import { getHostUrl } from '../../../Helper/helpermethods';
import { SketchPicker } from 'react-color';

const styles = {
  textfield: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginTop: '5px',
    width: 800,
    background: 'white',
    borderRadius: '20px'
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
export default function AnnouncementItemNew(props) {

  const formRef = useRef();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();

  let announcementItemDetails2 = useSelector((state) => { return state.announcement_reducer.announcementItemDetails });
  let announcementItemDetails;
  if (location.state && location.state.isNew === 2)
    announcementItemDetails = announcementItemDetails2;
  let newAnnouncementAdded = useSelector((state) => state.announcement_reducer.newAnnouncementAdded);

  const [id, setId] = useState(announcementItemDetails && announcementItemDetails.Id || '');
  const [descriptionInitial, setDescriptionInitial] = useState(announcementItemDetails && announcementItemDetails.Description || '');
  const [description, setDescription] = useState(announcementItemDetails && announcementItemDetails.Description || '');
  const [url, setUrl] = useState(announcementItemDetails && announcementItemDetails.Url || '');
  const [color, setColor] = useState(announcementItemDetails?.Color || '');
  const [backgroundColor, setBackgroundColor] = useState(announcementItemDetails?.BackgroundColor || '');
  const [imageFile, setImageFile] = useState(announcementItemDetails?.Image || '');
  const [imageFontAwesome, setImageFontAwesome] = useState(announcementItemDetails?.Image || '');
  const [showonfirstpage, setShowonfirstpage] = useState(announcementItemDetails?.Showonfirstpage || false);
  const [hidden, setHidden] = useState(announcementItemDetails?.Hidden || false);
  const [orderNo, setOrderNo] = useState(announcementItemDetails?.OrderNo || 0);

  if (newAnnouncementAdded === true) {
    dispatch({ type: 'SET_ADDED_NEWANNOUNCEMENT', payload: false });
    navigate(-1);
  } else {
    return <HomeWrapper>
      <div style={{ display: 'flex', flexFlow: 'column', flexWrap: 'wrap', overflowY: 'hidden', width: '100%', height: '100%', background: 'white', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <div style={{ display: 'flex', flex: '1', flexFlow: 'column', overflowY: 'hidden', overflowX: 'hidden', flexWrap: 'wrap', alignContent: 'center' }}>
          <form onSubmit={(e) => {
            e.preventDefault();
            var data = {};
            data.id = id;
            data.description = description;
            data.url = url;
            data.color = color;
            data.backgroundColor = backgroundColor;
            data.image = (imageFile || imageFontAwesome || '');
            data.showonfirstpage = showonfirstpage || 0;
            data.hidden = hidden || 0;
            data.orderNo = orderNo;

            if (location.state.isNew === 2)
              dispatch(editAnnouncement(data));
            else
              dispatch(addAnnouncement(data));

            navigate(-1);
          }}>
            <div style={{ padding: '10px' }}>
              {/* <Editor
              tinymceScriptSrc={getHostUrl() + '/js/tinymce/tinymce.min.js'}
              init={{
                plugins: "lists link image code table media links indent fontsize",                
                height: '300px',
                width: 'auto',
                toolbar: "undo redo | bold italic underline | fontsize fontfamily | outdent indent | alignleft aligncenter alignright | numlist bullist | link | image | media | table | code",
                content_style: "body { font-size: 14pt; font-family: Arial; }",
                promotion: false
              }}
              style={{ height: '300px' }}
              initialValue={descriptionInitial}
              value={description}
              onEditorChange={(newValue, editor) => setDescription(newValue)}
            /> */}

              <TextField
                required
                label="Περιγραφή"
                variant='outlined'
                type="text"
                style={styles.textfield}
                value={description}
                onChange={(e) => { setDescription(e.target.value); }}
                inputProps={{ style: { textAlign: 'Left' } }}
              />
            </div>
            <div style={{ padding: '10px' }}>
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
            </div>
            {/* <div style={{ padding: '10px' }}>
              <TextField
                type="number"
                label="Σειρά"
                variant='outlined'
                style={styles.textfield}
                value={orderNo}
                onChange={(e) => { setOrderNo(e.target.value) }}
                InputLabelProps={{ shrink: true }}
                inputProps={{ style: { textAlign: 'Left' } }}
              />
            </div> */}
            <div style={{ padding: '10px', display: 'flex', direction: 'row' }}>
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
            </div>
            <div style={{ padding: '10px' }}>
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
            </div>
            <div style={{ display: 'flex', flexFlow: 'column', overflowY: 'hidden', overflowX: 'hidden' }}>
              <div style={{ fontSize: 24, padding: 20, textAlign: 'left' }}>
                <Checkbox
                  defaultChecked={false}
                  color='primary'
                  checked={showonfirstpage}
                  onChange={e => setShowonfirstpage(e.target.checked)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <span>Να φαίνεται στην πρώτη σελίδα</span>
              </div>
              <div style={{ fontSize: 24, padding: 20, textAlign: 'left' }}>
                <Checkbox
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
          </form>
        </div>
      </div >
    </HomeWrapper>
  }
}