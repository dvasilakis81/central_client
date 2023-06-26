import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import PageTabs from './Tabs/tabs';
import { getDateFormat } from '../../../Helper/helpermethods';
import Button from '@material-ui/core/Button';

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
function renderApprovedButton(item) {
  if (item.isapproved === 0) {
    return <Button style={{ backgroundColor: 'green', width: '100px', color: 'white', fontWeight: 'bold' }}>
      ΕΓΚΡΙΣΗ
    </Button>
  }
}
function renderRejectedButton(item) {
  if (item.isapproved === 0) {
    return <Button style={{ background: 'orangered', width: '100px', color: 'white', fontWeight: 'bold' }}>
      ΑΠΟΡΡΙΨΗ
    </Button>
  }
}

function renderComments(pageItemDetails, selectedTab) {
  if (pageItemDetails && pageItemDetails.comments) {
    var commentsToRender = [];
    if (selectedTab === 1)
      commentsToRender = pageItemDetails.comments.filter(comment => comment.isapproved === 1)
    else if (selectedTab === 2)
      commentsToRender = pageItemDetails.comments.filter(comment => comment.isrejected === 1)
    else if (selectedTab === 3)
      commentsToRender = pageItemDetails.comments.filter(comment => comment.isapproved === 0 && comment.isrejected === 0)

    if (commentsToRender) {
      return commentsToRender.map((item, index) => {
        return <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', flex: '1', background: '#0072A0', paddisdfng: '5px', fontWeight: 'bold', fontSize: '1rem', padding: '10px' }}>
            <span style={{ color: 'white' }}>{item.firstname} {item.lastname}<i>{getDateFormat(item.created)}</i></span>
          </div>
          <span>{parse(item.content)}</span>
          <div className="flex-row">
            {renderApprovedButton(item)}
            <span style={{ marginLeft: '15px' }}></span>
            {renderRejectedButton(item)}
          </div>
        </div>
      })
    }
    else
      return <></>
  }
}



export default function PageItemDetails(props) {
  let pageItemDetails = useSelector((state) => state.page_reducer.pageItemDetails);
  const [selectedTab, setSelectedTab] = useState(0);
  const [hoveredKey, setHoveredKey] = useState(-1);
  const [numberOfApprovedComments, setNumberOfApprovedComments] = useState(0);
  const [numberOfRejectedComments, setNumberOfRejectedComments] = useState(0);
  const [numberOfCommentsToBeApproved, setNumberOfCommentsToBeApproved] = useState(0);

  useEffect(() => {
    getNumberOfApprovedRejectedComments();
  }, [pageItemDetails])

  function getNumberOfApprovedRejectedComments() {
    var approvedComments = 0;
    var rejectedComments = 0;
    var commentsToBeApproved = 0;

    if (pageItemDetails && pageItemDetails.comments) {
      pageItemDetails.comments.map((item, index) => {
        if (item.isapproved === 1)
          approvedComments += 1;
        console.log('item.isrejected: ' + item.isrejected);
        if (item.isrejected === 1) {
          console.log('item.isrejected: ' + rejectedComments);
          rejectedComments += 1;
        }
        if (item.isapproved === 0 && item.isrejected === 0)
          commentsToBeApproved += 1;
      })
    }

    console.log('approvedComments: ' + approvedComments);
    console.log('rejectedComments: ' + rejectedComments);
    console.log('commentsToBeApproved: ' + commentsToBeApproved);

    setNumberOfApprovedComments(approvedComments);
    setNumberOfRejectedComments(rejectedComments);
    setNumberOfCommentsToBeApproved(commentsToBeApproved);
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
              {renderComments(pageItemDetails, selectedTab)}
            </div>
          </div >
        )
      } else
        return <></>
    }
    else
      return <div style={{ display: 'flex', flexDirection: 'column', flex: '1', marginBottom: '10px', overflowY: 'auto' }}>
        {renderComments(pageItemDetails, selectedTab)}
      </div>
  }

  return <div style={{ display: 'flex', flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%', overflowY: 'hidden' }}>
    <div style={{ display: 'flex', flexDirection: 'row', height: 'auto', overflowY: 'hidden', overflowX: 'hidden' }}>
      {<div
        className={selectedTab === 0 ? 'selected-tab' : (hoveredKey === 0 ? 'hovered-tab' : 'tab')}
        onClick={(e) => {
          setSelectedTab(0)
        }}
        onMouseEnter={(e) => setHoveredKey(0)}
        onMouseLeave={(e) => { setHoveredKey(-1) }}>
        ΠΕΡΙΕΧΟΜΕΝΟ
      </div>}
      {<div
        className={selectedTab === 1 ? 'selected-tab' : (hoveredKey === 1 ? 'hovered-tab' : 'tab')}
        onClick={(e) => { setSelectedTab(1); }}
        onMouseEnter={(e) => setHoveredKey(1)}
        onMouseLeave={(e) => { setHoveredKey(-1) }}>
        ({numberOfApprovedComments || 0}) ΕΓΚΕΚΡΙΜΜΕΝΑ ΣΧΟΛΙΑ
      </div>}
      {<div
        className={selectedTab === 2 ? 'selected-tab' : (hoveredKey === 2 ? 'hovered-tab' : 'tab')}
        onClick={(e) => { setSelectedTab(2); }}
        onMouseEnter={(e) => setHoveredKey(2)}
        onMouseLeave={(e) => { setHoveredKey(-1) }}>
        ({numberOfRejectedComments || 0}) ΑΠΟΡΡΙΠΤΕΑ ΣΧΟΛΙΑ
      </div>}
      {<div
        className={selectedTab === 3 ? 'selected-tab' : (hoveredKey === 3 ? 'hovered-tab' : 'tab')}
        onClick={(e) => { setSelectedTab(3); }}
        onMouseEnter={(e) => setHoveredKey(3)}
        onMouseLeave={(e) => { setHoveredKey(-1) }}>
        ({numberOfCommentsToBeApproved || 0}) ΣΧΟΛΙΑ ΠΡΟΣ ΕΚΓΡΙΣΗ
      </div>}
    </div>
    {getTabContent()}
  </div>
}