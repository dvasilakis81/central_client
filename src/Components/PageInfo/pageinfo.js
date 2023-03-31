import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { getPageInfo } from '../../Redux/Actions';
import HomeWrapperWithCentralMenu from '../Home/homewrapperwithcentralmenu';
import PageTabs from './pagetabs';
import { getDateFormat } from '../../Helper/helpermethods';

function renderComments(pageItemDetails) {
  if (pageItemDetails && pageItemDetails.comments) {
    return pageItemDetails.comments.map((item, index) => {
      return <div style={{ display: 'flex', flexDirection: 'column', flex: '1', marginBottom: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', flex: '1', background: 'blue', padding: '5px', fontWeight: 'bold' }}>
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>{item.firstname} {item.lastname} <i>{getDateFormat(item.created)}</i></span>
          {/* <span style={{ marginLeft: '10px' }}></span> */}
        </div>
        <span>{parse(item.content)}</span>
      </div>
    })
  }
}

export default function PageInfo() {
  const dispatch = useDispatch();
  const history = useNavigate();
  let pageInfo = useSelector((state) => state.page_reducer.pageInfo);

  useEffect(() => {

    var pageName = '';
    var pageUrlParts = window.location.href.split('/');
    if (pageUrlParts) {
      pageName = pageUrlParts[pageUrlParts.length - 1];
      var data = {};
      data.pagename = pageName;
      dispatch(getPageInfo(data));
    }
  }, [history]);

  return <HomeWrapperWithCentralMenu>
    {/* <div className={pageInfo} style={{
      padding: '10px',
      display: 'flex',
      flex: '0.9',
      flexDirection: 'column',
      flexWrap: 'column',
      background: 'white',
      borderRadius: '0px',
      opacity: 0.9,
      height: '90%',
      margin: 'auto'
    }}> */}
    <div className='page-info-container'>
      <div className='page-title'>
        {pageInfo && pageInfo.Title}
      </div>
      <div className='page-body'>
        <PageTabs pageinfo={pageInfo} />
        <div className='page-body-content'>
          {pageInfo ? parse(pageInfo?.Body) : 'Η Σελίδα δεν βρέθηκε'}
        </div>
        {renderComments(pageInfo)}
      </div>
    </div>
  </HomeWrapperWithCentralMenu>
}