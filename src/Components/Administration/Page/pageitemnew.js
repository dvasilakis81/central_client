import { useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import { Checkbox } from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';
import { getHostUrl, getServerErrorResponseMessage } from '../../../Helper/helpermethods';
import { addPageItem, editPageItem } from '../../../Redux/Actions/index';
import HomeWrapper from '../../Home/homewrapper';
import store from '../../../Redux/Store/store';

//import ReactQuill from 'react-quill';
//import 'react-quill/dist/quill.snow.css';
//import EditorToolbar, { modules, formats } from '../../Quill/EditorToobar';
//import Editor from '../../QuillResizeImage/EditorWithUseQuill';
import { Editor } from '@tinymce/tinymce-react';
import * as React from "react";

import Autocomplete from '@material-ui/lab/Autocomplete';
// TinyMCE wants to be in global scope, even if loaded from npm module
// We're manually importing theme, icons and plugins because otherwise TinyMCE tries to resolve 
// them himself and load throught http, but this won't work with chrome extension
// Theme

// import tinymce from 'tinymce/tinymce.min.js';
// window.tinymce = tinymce;
// import 'tinymce/themes/silver/theme.min.js';
// import 'tinymce/icons/default/icons.min.js';
// import 'tinymce/plugins/paste/plugin.min.js';
// import 'tinymce/plugins/link/plugin.min.js';
// import 'tinymce/plugins/lists/plugin.min.js';
// import 'tinymce/plugins/advlist/plugin.min.js';
// import 'tinymce/plugins/anchor/plugin.min.js';
// import 'tinymce/plugins/autolink/plugin.min.js';
// import 'tinymce/plugins/charmap/plugin.min.js';
// import 'tinymce/plugins/code/plugin.min.js';
// import 'tinymce/plugins/codesample/plugin.min.js';
// import 'tinymce/plugins/colorpicker/plugin.min.js';
// import 'tinymce/plugins/table/plugin.min.js';
// import 'tinymce/plugins/wordcount/plugin.min.js';
// import 'tinymce/plugins/textcolor/plugin.min.js';
// import 'tinymce/plugins/image/plugin.min.js';
// import 'tinymce/plugins/imagetools/plugin.min.js';
// import 'tinymce/plugins/contextmenu/plugin.min.js';

// We're also importing styles manually and later attach them to editor. `?raw` here means that we're not using 
// any kind of style-loader (webpack) and just want to import content of file as plain string
// This requires additional setup in webpack and might look different for other build systems
// import contentCss from 'tinymce/skins/content/default/content.min.css?raw';
// import contentUiCss from 'tinymce/skins/ui/oxide/content.min.css?raw';

// import 'tinymce/tinymce';
// import 'tinymce/icons/default';
// import 'tinymce/themes/silver';
// //import 'tinymce/plugins/paste';
// import 'tinymce/plugins/link';
// import 'tinymce/plugins/image';
// import 'tinymce/plugins/table';
// import 'tinymce/skins/ui/oxide/skin.min.css';
// import 'tinymce/skins/ui/oxide/content.min.css';
// import 'tinymce/skins/content/default/content.min.css';

//import 'suneditor/src/assets/css/suneditor.css'

export default function PageItemNew(props) {

  const dispatch = useDispatch();
  const editorRef = useRef(null);
  let navigate = useNavigate();
  let location = useLocation();
  let pageItemsList = useSelector((state) => state.page_reducer.pageItemsList);
  let itemDetails2 = useSelector((state) => state.page_reducer.pageItemDetails);
  var selectedTabs = [];
  let pageItemDetails;

  const [pageTitle, setPageTitle] = useState(pageItemDetails?.Title || '');
  const [pageUrl, setPageUrl] = useState(pageItemDetails?.Url || '');
  const [pageBodyInitial, setPageBodyInitial] = useState(pageItemDetails?.Body || '');
  const [pageBody, setPageBody] = useState(pageItemDetails?.Body || '');
  const [hasComments, setHasComments] = useState(pageItemDetails?.HasComments || '');
  const [isConsultation, setIsConsultation] = useState(pageItemDetails?.IsConsultation || '');

  useEffect(() => {

    if (location.state && location.state.isNew === 2) {

      pageItemDetails = itemDetails2;

      setPageId(pageItemDetails?.Id || '');
      setPageTitle(pageItemDetails?.Title || '');
      setPageUrl(pageItemDetails?.Url || '');
      setPageBodyInitial(pageItemDetails?.Body || '');
      setPageBody(pageItemDetails?.Body || '');
      setHasComments(pageItemDetails?.HasComments || '');
      setIsConsultation(pageItemDetails?.IsConsultation || '')

      if (pageItemsList && pageItemDetails && pageItemDetails.tabsInfo) {
        var tabsInfoOrdered = [...pageItemDetails.tabsInfo].sort((a, b) => a.taborder < b.taborder ? -1 : 1);
        for (var t = 0; t < tabsInfoOrdered.length; t++) {
          for (var p = 0; p < pageItemsList.length; p++) {
            if (pageItemsList[p].Id === tabsInfoOrdered[t].tabid) {
              selectedTabs.push(pageItemsList[p]);
              break;
            }
          }
        }
      }
    }
  }, []);

  //const [open, setOpen] = useState(props.open);
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState(100);
  const [variant, setVariant] = useState('');
  const [openMessage, setOpenMessage] = useState(false);
  const [pageId, setPageId] = useState(pageItemDetails?.Id || '');
  const [tabs, setTabs] = useState(selectedTabs || []);
  let pageItemsRejected = useSelector((state) => state.page_reducer.pageItemsRejected);
  let newPageAdded = useSelector((state) => state.page_reducer.newPageAdded);

  const handleSaveClick = () => {

    var data = {};
    data.Id = pageId;
    data.Title = pageTitle;
    data.Body = pageBody;
    data.Url = pageUrl;
    data.HasComments = hasComments;
    data.IsConsultation = isConsultation;
    data.Tabs = [];
    tabs.map((item) => {
      data.Tabs.push(item);
    })

    if (location && location.state && location.state.isNew === 2) {
      editPageItem(dispatch, data).then(res => {
        var snackbarInfo = {}
        snackbarInfo.openMessage = true;
        snackbarInfo.message = 'H σελίδα επεξεργάστηκε επιτυχώς!!!'
        snackbarInfo.variant = 'success';
        store.dispatch({ type: 'SHOW_SNACKBAR', payload: snackbarInfo });

        // setMessage('H σελίδα επεξεργάστηκε επιτυχώς!!!');
        // setVariant('success');
        // setOpenMessage(true);

        navigate(-1);
        //this.setState({ message: 'Ο λογαριασμός επεξεργάστηκε επιτυχώς!!!', openMessage: true, variant: 'success', submitButtonDisabled: false });
      }).catch(error => {
        setMessage(<><div>Αποτυχία επεξεργασίας λογαριασμών!</div><div>{getServerErrorResponseMessage(error)}</div></>);
        setVariant('error');
        setOpenMessage(true)
        //this.setState({ , openMessage: true, variant: 'error', submitButtonDisabled: false });
      });;
    }
    else
      dispatch(addPageItem(data));

    // appendItem(data, dispatch).then(() => {
    //   if (pageItemsRejected)
    //     console.log('pageItemsRejected:' + pageItemsRejected);
    //   else
    //     navigate(-1);
    // })
  };

  if (newPageAdded === true) {
    dispatch(dispatch({ type: 'SET_ADDED_NEWPAGE', payload: false }));
    navigate(-1);
  }
  else
    return <div style={{ width: '100%', height: '100%', overflow: 'hidden', background: 'white' }}>
      <HomeWrapper>
        <div style={{ display: 'flex', flex: 1, flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%', overflowY: 'hidden', background: 'lightgrey' }}>
          <div style={{ display: 'flex', flexFlow: 'row', overflowY: 'hidden', overflowX: 'hidden', height: 'auto', textAlign: 'right', marginTop: '30px' }}>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: '5px', textTransform: 'none', fontSize: '16px' }}
              onClick={handleSaveClick}>
              <SaveAltIcon />
              Αποθήκευση
            </Button>
            <Button
              variant="contained"
              style={{ margin: '5px', background: 'orangered', textTransform: 'none', fontSize: '16px' }}
              onClick={() => { navigate(-1); }}>
              <CancelIcon />
              Ακύρωση
            </Button>
          </div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', height: 'auto', overflowY: 'scroll', overflowX: 'hidden' }}>
            {/* 1st column */}
            <div style={{ height: '100%', display: 'flex', flexFlow: 'column', flex: '1' }}>
              <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'auto', overflowX: 'hidden', margin: '0px', padding: '0px' }}>
                <div style={{ display: 'flex', flexFlow: 'column', flex: '1' }}>
                  <div style={{ padding: '10px' }}>
                    <TextField
                      label="Τίτλος Σελίδας"
                      fullWidth
                      required={true}
                      id={pageTitle}
                      value={pageTitle}
                      onChange={(e) => {
                        setPageTitle(e.target.value);
                      }}
                      variant="outlined"
                      inputLabelProps={{ background: "white", shrink: true }}
                      InputLabelProps={{ shrink: true }} />
                  </div>
                  <div style={{ padding: '10px' }}>
                    <TextField label="URL Σελίδας" fullWidth multiline={false} required={true} id={pageUrl} value={pageUrl}
                      onChange={(e) => {
                        setPageUrl(e.target.value);
                      }}
                      variant="outlined" InputLabelProps={{ shrink: true }}
                    />
                  </div>
                  <div style={{ padding: '10px' }}>
                    <div style={{ margin: '5px', border: '1px solid black', width: '100%' }}>
                      <div style={{ backgroundColor: 'white' }}>
                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={pageItemsList || []}
                          getOptionLabel={item => item.Title}
                          onChange={(event, value) => setTabs(value)}
                          filterSelectedOptions
                          defaultValue={tabs}
                          ChipProps={{ color: "primary" }}
                          style={{ flex: '1', padding: '0px' }}
                          renderInput={params => (
                            <TextField
                              {...params}
                              variant="standard"
                              placeholder="Tab (Καρτέλα)"
                              fullWidth
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: '10px' }}>
                    <div style={{ display: 'flex', flexFlow: 'row', overflowY: 'hidden', overflowX: 'hidden' }}>
                      <div style={{ fontSize: 24, padding: 20, textAlign: 'left' }}>
                        <Checkbox
                          defaultChecked={false}
                          color='primary'
                          checked={hasComments}
                          onChange={e => setHasComments(e.target.checked)}
                          inputProps={{ 'aria-label': 'controlled' }} />
                        <span>Επιτρέπονται Σχόλια</span>
                      </div>                      
                    </div>
                  </div>
                  <div style={{ padding: '10px', height: '700px', minHeight: '500px' }}>
                    <Editor
                      tinymceScriptSrc={getHostUrl() + '/js/tinymce/tinymce.min.js'}
                      init={{
                        plugins: "lists link image code table media links indent fontsize",
                        //plugins: 'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap mentions quickbars linkchecker emoticons advtable export',
                        height: '700px',
                        toolbar: "undo redo | bold italic underline | fontsize fontfamily | outdent indent | alignleft aligncenter alignright | numlist bullist | link | image | media | table | code",
                        content_style: "body { font-size: 14pt; font-family: Arial; }",
                        promotion: false
                      }}
                      style={{ height: '100%' }}
                      //apiKey='4aiolvhkus0kb3ozfykh468mo6cg294662inoca6bbp83wuv'                      
                      initialValue={pageBodyInitial}
                      value={pageBody}
                      onEditorChange={(newValue, editor) => setPageBody(newValue)}
                    />

                    {/* onEditorChange={handleChangePageBody} */}
                    {/* <SunEditor
                      setContents={pageBody}
                      onChange={handleChangePageBody}
                      setOptions={{
                        buttonList: [
                          ["undo", "redo"],
                          ["font", "fontSize"],
                          // ['paragraphStyle', 'blockquote'],
                          [
                            "bold",
                            "underline",
                            "italic",
                            "strike",
                            "subscript",
                            "superscript"
                          ],
                          ["fontColor", "hiliteColor"],
                          ["align", "list", "lineHeight"],
                          ["outdent", "indent"],
                          ["table", "horizontalRule", "link", "image", "video"],
                          // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
                          // ['imageGallery'], // You must add the "imageGalleryUrl".
                          // ["fullScreen", "showBlocks", "codeView"],
                          ["preview", "print"],
                          ["removeFormat"]
                          // ['save', 'template'],
                          // '/', Line break
                        ], // Or Array of button list, eg. [['font', 'align'], ['image']]
                        defaultTag: "div",
                        minHeight: "300px",
                        showPathLabel: false,
                        linkNoPrefix: true,
                        font: sortedFontOptions
                      }}
                    /> */}
                    {/* <hr />
                    <h2>Example value output:</h2>
                    <textarea
                      disabled
                      value={JSON.stringify(pageBody, null, 2)}
                      style={{ width: "100%", resize: "none", height: "600px" }}
                    /> */}
                  </div>
                  {/* //Image Resize <Editor placeholder={'Write something...'} />   */}
                  {/* <SlateEditor handleChangePageBody={handleChangePageBody}/> */}
                  {/* <ReactQuill
                      forwardedRef={quillRef}
                      value={pageBody}                      
                      onChange={handleChangePageBody}
                      modules={modules}
                      theme="snow"
                      height="100%"                                            
                      placeholder={"Write something awesome..."}                      
                      formats={formats}
                    /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeWrapper >
      {/* <ReactQuill theme="snow" value={pageBody} onChange={setPageBody} />; */}
    </div >
}

