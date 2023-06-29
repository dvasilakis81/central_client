import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import Button from '@material-ui/core/Button';

import PageTabs from './Tabs/tabs';
import { approveOrRejectComment } from '../../../Redux/Actions/index';
import { showSnackbarMessage, showFailedConnectWithServerMessage, renderComments } from '../../Common/methods';

export default function PageItemDetails(props) {
  let pageItemDetails = useSelector((state) => state.page_reducer.pageItemDetails);

  const [approvedButtonBackgroundColor, setApprovedButtonBackgroundColor] = useState('transparent');
  const [approvedButtonColor, setApprovedButtonColor] = useState('green');
  const [rejectedButtonBackgroundColor, setRejectedButtonBackgroundColor] = useState('transparent');
  const [rejectedButtonColor, setRejectedButtonColor] = useState('orangered');
  const [buttonItem, setButtonItem] = useState();    
  const [selectedTab, setSelectedTab] = useState(0);
  const [hoveredKey, setHoveredKey] = useState(-1);
  const [numberOfApprovedComments, setNumberOfApprovedComments] = useState(0);
  const [numberOfRejectedComments, setNumberOfRejectedComments] = useState(0);
  const [numberOfCommentsToBeApproved, setNumberOfCommentsToBeApproved] = useState(0);
  
  const dispatch = useDispatch();

  useEffect(() => {
    getNumberOfApprovedRejectedComments();
  }, [pageItemDetails])

  function getItem(key, index, pageItemDetails) {
    var ret = <></>;
    var val = '';
    val = pageItemDetails[key];

    if (key !== 'Body' && key != 'tabsInfo' && key != 'comments')
      ret = <div key={index} style={{ flex: 1, borderBottom: '1px solid black', paddingBottom: '15px' }}>
        <div style={{ fontSize: 16, padding: 10, fontWeight: 'bold', background: 'lightBlue' }}>
          {key}
        </div>
        <div style={{ fontSize: 16, paddingLeft: 0, paddingTop: 10 }}>
          {val}
        </div>
      </div>

    return ret;
  }
  function renderApprovedButton(page, item) {
    if (page.CommentNeedsApproval === 1) {
      if ((item.isapproved === 0 && item.isrejected === 0) || item.isrejected === 1) {
        return <Button
          style={{
            width: '100px',
            backgroundColor: buttonItem === item ? approvedButtonBackgroundColor : 'transparent',
            color: buttonItem === item ? approvedButtonColor: 'green',
            border: '1px solid green',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => {
            setButtonItem(item);
            setApprovedButtonBackgroundColor('green');
            setApprovedButtonColor('white');
          }}
          onMouseLeave={(e) => {
            setApprovedButtonBackgroundColor('transparent');
            setApprovedButtonColor('green');
          }}
          onClick={() => {

            var data = {};
            data.id = item.commentid;
            data.isapproved = 1;
            data.isrejected = 0;
            data.url = page.Url;
            dispatch(approveOrRejectComment(data)).then(response => {
              showSnackbarMessage(response, 'Το σχόλιο εγκρίθηκε!');
            }).catch(error => {
              showFailedConnectWithServerMessage(error);
            });
          }}>
          ΕΓΚΡΙΣΗ
        </Button>
      }
    }
  }
  function renderRejectedButton(page, item) {
    if (page.CommentNeedsApproval === 1) {
      if ((item.isapproved === 0 && item.isrejected === 0) || item.isapproved === 1) {
        return <Button
          style={{ 
            backgroundColor: buttonItem === item ? rejectedButtonBackgroundColor : 'transparent',
            color: buttonItem === item ? rejectedButtonColor: 'orangered',            
            width: '100px',             
            fontWeight: 'bold', 
            border: '1px solid orangered' }}
          onMouseEnter={(e) => {
            setButtonItem(item);
            setRejectedButtonBackgroundColor('orangered');
            setRejectedButtonColor('white');
          }}
          onMouseLeave={(e) => {
            setRejectedButtonBackgroundColor('transparent');
            setRejectedButtonColor('orangered');
          }}
          onClick={() => {

            var data = {};
            data.id = item.commentid;
            data.isapproved = 0;
            data.isrejected = 1;
            data.url = page.Url;
            dispatch(approveOrRejectComment(data)).then(response => {
              showSnackbarMessage(response, 'Το σχόλιο απορρίφθηκε!');
            }).catch(error => {
              showFailedConnectWithServerMessage(error);
            });
          }}>
          ΑΠΟΡΡΙΨΗ
        </Button>
      }
    }
  }

  function getNumberOfApprovedRejectedComments() {
    var approvedComments = 0;
    var rejectedComments = 0;
    var commentsToBeApproved = 0;

    if (pageItemDetails && pageItemDetails.comments) {
      pageItemDetails.comments.map((item, index) => {
        if (item.isapproved === 1)
          approvedComments += 1;
        if (item.isrejected === 1)
          rejectedComments += 1;
        if (item.isapproved === 0 && item.isrejected === 0)
          commentsToBeApproved += 1;
      })
    }

    setNumberOfApprovedComments(approvedComments);
    setNumberOfRejectedComments(rejectedComments);
    setNumberOfCommentsToBeApproved(commentsToBeApproved);
  }
  function renderTab(tabValue, tabTitle, numberOfComments) {
    var classValue = selectedTab === tabValue ? 'selected-tab' : (hoveredKey === 3 ? 'hovered-tab' : 'tab')

    if (pageItemDetails.CommentNeedsApproval === 0) {
      if (tabValue === 1)
        return <div
          className={classValue}
          onClick={(e) => { setSelectedTab(tabValue); }}
          onMouseEnter={(e) => setHoveredKey(tabValue)}
          onMouseLeave={(e) => { setHoveredKey(-1) }}>
          ({numberOfComments || 0}) ΕΓΚΕΚΡΙΜΜΕΝΑ ΣΧΟΛΙΑ
        </div>
    } else {
      {
        return <div
          className={classValue}
          onClick={(e) => { setSelectedTab(tabValue); }}
          onMouseEnter={(e) => setHoveredKey(1)}
          onMouseLeave={(e) => { setHoveredKey(-1) }}>
          ({numberOfComments || 0}) {tabTitle}
        </div>
      }
    }
  }
  function getTabContent() {
    if (selectedTab === 0) {
      if (pageItemDetails) {
        return (
          <div style={{ display: 'flex', flex: 1, flexFlow: 'column', overflowY: 'hidden', overflowX: 'auto', width: '100%' }}>
            <div style={{ display: 'flex', flex: 0.1, flexFlow: 'row', flexWrap: true, alignItems: 'stretch', width: '100%', height: '150px' }}>
              {
                Object.keys(pageItemDetails).map((key, index) => {
                  return (getItem(key, index, pageItemDetails));
                })
              }
            </div>
            <div style={{ display: 'flex', flex: 1, flexFlow: 'column', overflowY: 'auto' }}>
              <PageTabs />
              <div style={{ fontSize: 16, paddingLeft: 0, paddingTop: 10 }}>
                <div>{pageItemDetails['Body'] ? parse(pageItemDetails['Body']) : ""}</div>
              </div>
              {renderComments(pageItemDetails, selectedTab, true, renderApprovedButton, renderRejectedButton)}
            </div>
          </div >
        )
      } else
        return <></>
    }
    else
      return <div style={{ display: 'flex', flexDirection: 'column', flex: '1', marginBottom: '10px', overflowY: 'auto' }}>
        {renderComments(pageItemDetails, selectedTab, true, renderApprovedButton, renderRejectedButton)}
      </div>
  }

  return <div style={{ display: 'flex', flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%', overflowY: 'hidden' }}>
    <div style={{ display: 'flex', flexDirection: 'row', height: 'auto', overflowY: 'hidden', overflowX: 'hidden' }}>
      {<div
        className={selectedTab === 0 ? 'selected-tab' : (hoveredKey === 0 ? 'hovered-tab' : 'tab')}
        onClick={(e) => { setSelectedTab(0) }}
        onMouseEnter={(e) => setHoveredKey(0)}
        onMouseLeave={(e) => { setHoveredKey(-1) }}>
        ΠΕΡΙΕΧΟΜΕΝΟ
      </div>}
      {renderTab(1, 'ΕΓΚΕΚΡΙΜΜΕΝΑ ΣΧΟΛΙΑ', pageItemDetails && pageItemDetails.comments && pageItemDetails.CommentNeedsApproval === 0 ?
        pageItemDetails.comments.length : numberOfApprovedComments)}
      {renderTab(2, 'ΑΠΟΡΡΙΠΤΕΑ ΣΧΟΛΙΑ', numberOfRejectedComments)}
      {renderTab(3, 'ΣΧΟΛΙΑ ΠΡΟΣ ΕΓΚΡΙΣΗ', numberOfCommentsToBeApproved)}
    </div>
    {getTabContent()}
  </div>
}