import React from 'react';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import PageTabs from './Tabs/tabs';
import { getDateFormat } from '../../../Helper/helpermethods';

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

function renderComments(pageItemDetails) {
  if (pageItemDetails && pageItemDetails.comments) {
    return pageItemDetails.comments.map((item, index) => {
      return <div style={{ display: 'flex', flexDirection: 'column', flex: '1', marginBottom: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', flex: '1', background: '#0072A0', paddisdfng: '5px', fontWeight: 'bold', fontSize: '1rem' }}>
          <span style={{ color: 'white' }}>{item.firstname} {item.lastname}<i>{getDateFormat(item.created)}</i></span>
        </div>
        <span>{parse(item.content)}</span>
      </div>
    })
  }
}

export default function PageItemDetails(props) {
  let pageItemDetails = useSelector((state) => state.page_reducer.pageItemDetails);

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
          {renderComments(pageItemDetails)}
        </div>
      </div >
    )
  } else
    return <></>
}