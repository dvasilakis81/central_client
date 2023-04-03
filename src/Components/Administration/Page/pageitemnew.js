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
import { Editor } from '@tinymce/tinymce-react';
import * as React from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';

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
  const [pageId, setPageId] = useState(pageItemDetails?.Id || '');
  const [tabs, setTabs] = useState(selectedTabs || []);
  let requestRejected = useSelector((state) => state.page_reducer.requestRejected);
  let newItemAdded = useSelector((state) => state.page_reducer.newItemAdded);
  let itemChanged = useSelector((state) => state.page_reducer.itemChanged);

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

  if (newItemAdded === true || itemChanged === true) {
    dispatch({ type: 'SET_ADDED_NEWPAGE', payload: false });
    navigate(-1);
  } else
    return <div style={{ width: '100%', height: '100%', overflow: 'hidden', background: 'white' }}>
      <HomeWrapper>
        <div style={{ display: 'flex', flex: 1, flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%', overflowY: 'hidden', background: 'lightgrey' }}>
          <div style={{ display: 'flex', flexFlow: 'row', overflowY: 'hidden', overflowX: 'hidden', height: 'auto', textAlign: 'right', marginTop: '30px' }}>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: '5px', textTransform: 'none', fontSize: '16px' }}
              onClick={() => {

                var data = {};
                data.Id = pageId;
                data.Title = pageTitle;
                data.Body = pageBody;
                data.Url = pageUrl;
                data.HasComments = hasComments;
                data.Tabs = [];
                tabs.map((item) => {
                  data.Tabs.push(item);
                })

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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeWrapper >
    </div >
}

