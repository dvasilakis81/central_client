import { useState, useRef, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Checkbox } from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';
import { getHostUrl } from '../../../Helper/helpermethods';
import { addPageItem, editPageItem } from '../../../Redux/Actions/index';
import HomeWrapper from '../../Home/homewrapper';
import { Editor } from '@tinymce/tinymce-react';
import * as React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useStyles } from '../../Styles/styles';

export default function PageItemNew(props) {
  const classes = useStyles();

  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  let pageItemsList = useSelector((state) => state.page_reducer.pageItemsList);
  let itemDetails2 = useSelector((state) => state.page_reducer.pageItemDetails);
  
  let pageItemDetails;

  const [pageTitle, setPageTitle] = useState('');
  const [pageUrl, setPageUrl] = useState('');
  const [pageBodyInitial, setPageBodyInitial] = useState('');
  const [pageBody, setPageBody] = useState('');  
  const [canComment, setCanComment] = useState(false);
  const [commentNeedsApproval, setCommentNeedsApproval] = useState(false);
  const [pageId, setPageId] = useState('');
  const [tabs, setTabs] = useState([]);
  let newItemAdded = useSelector((state) => state.page_reducer.newItemAdded);
  let itemChanged = useSelector((state) => state.page_reducer.itemChanged);

  useEffect(() => {
    var selectedTabs = [];
    if (location.state && location.state.isNew === 2) {

      pageItemDetails = itemDetails2;

      setPageId(pageItemDetails?.Id || '');
      setPageTitle(pageItemDetails?.Title || '');
      setPageUrl(pageItemDetails?.Url || '');
      setPageBodyInitial(pageItemDetails?.Body || '');
      setPageBody(pageItemDetails?.Body || '');      
      setCanComment(pageItemDetails?.CanComment || 0);
      setCommentNeedsApproval(pageItemDetails?.CommentNeedsApproval || 0);
      
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
      setTabs(selectedTabs);
    }
  }, []);

  if (newItemAdded === true || itemChanged === true) {
    dispatch({ type: 'SET_ADDED_NEWPAGE', payload: false });
    navigate(-1);
  } else
    return <div style={{ width: '100%', height: '100%', overflow: 'hidden', background: 'lightgrey' }}>
      <HomeWrapper>
        <div style={{ display: 'flex', flex: 1, flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%', overflowY: 'hidden', background: 'lightgrey' }}>
          <div style={{ display: 'flex', flexFlow: 'row', overflowY: 'hidden', overflowX: 'hidden', height: 'auto', textAlign: 'right', marginTop: '30px' }}>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: '5px', textTransform: 'none', fontSize: '16px' }}
              onClick={() => {

                var data = {};
                data.id = pageId;
                data.title = pageTitle;
                data.body = pageBody;
                data.url = pageUrl;
                data.cancomment = canComment;
                data.commentneedsapproval = commentNeedsApproval;
                data.tabs = [];
                tabs.map((item) => { data.tabs.push(item); })

                if (location && location.state && location.state.isNew === 2)
                  dispatch(editPageItem(data));
                else
                  dispatch(addPageItem(data));
              }}>
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
                      className={classes.root}
                      label="Τίτλος Σελίδας"
                      fullWidth
                      required={true}
                      id={pageTitle}
                      value={pageTitle}
                      onChange={(e) => { setPageTitle(e.target.value); }}
                      variant="outlined"
                    />
                  </div>
                  <div style={{ padding: '10px' }}>
                    <TextField
                      className={classes.root}
                      label="URL Σελίδας"
                      fullWidth
                      multiline={false} required={true} id={pageUrl} value={pageUrl}
                      onChange={(e) => {
                        var newValue = e.target.value.replace(' ', '-');
                        setPageUrl(newValue);
                      }}
                      variant="outlined"
                    />
                  </div>
                  <div style={{ padding: '10px' }}>
                    <div style={{ border: '1px solid black', width: '100%', backgroundColor: 'white' }}>
                      <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={pageItemsList || []}
                        getOptionLabel={item => item.Title}
                        onChange={(event, value) => setTabs(value)}
                        filterSelectedOptions
                        value={tabs}                        
                        ChipProps={{ color: "primary" }}
                        style={{ flex: '1', padding: '0px' }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Tab (Καρτέλα)"
                            className={classes.root}
                            fullWidth
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div style={{ padding: '10px' }}>
                    <div style={{ display: 'flex', flexFlow: 'row', overflowY: 'hidden', overflowX: 'hidden' }}>                      
                      <div style={{ fontSize: 24, padding: 20, textAlign: 'left' }}>
                        <Checkbox
                          defaultChecked={false}
                          color='primary'
                          checked={canComment}
                          onChange={e => setCanComment(e.target.checked)}
                          inputProps={{ 'aria-label': 'controlled' }} />
                        <span>Επιτρέπονται Σχόλια</span>
                      </div>
                      <div style={{ fontSize: 24, padding: 20, textAlign: 'left' }}>
                        <Checkbox
                          defaultChecked={false}
                          color='primary'
                          checked={commentNeedsApproval}
                          onChange={e => setCommentNeedsApproval(e.target.checked)}
                          inputProps={{ 'aria-label': 'controlled' }} />
                        <span>Απαιτείται Έγκριση</span>
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
                        promotion: false
                      }}
                      style={{ height: '100%' }}
                      //apiKey='4aiolvhkus0kb3ozfykh468mo6cg294662inoca6bbp83wuv'                      
                      initialValue={pageBodyInitial}
                      value={pageBody}
                      onEditorChange={(newValue, editor) => setPageBody(newValue)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeWrapper >
    </div >
}
