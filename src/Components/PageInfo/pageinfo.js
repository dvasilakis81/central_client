import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPageInfo } from '../../Redux/Actions';
import HomeWrapperWithCentralMenu2 from '../Home/homewrapperwithcentralmenu2';
import PageTabs from './pagetabs';
import CreatePageComment from './createpagecomment';
import { getDateFormat, renderHtml } from '../../Helper/helpermethods';

import { renderComments } from '../Common/methods'

export default function PageInfo() {
  const dispatch = useDispatch();
  const history = useNavigate();
  let pageInfo = useSelector((state) => state.page_reducer.pageInfo);

  useEffect(() => {

    var pageUrlParts = window.location.href.split('/');
    if (pageUrlParts) {
      var data = {};
      data.url = pageUrlParts[pageUrlParts.length - 1];;
      dispatch(getPageInfo(data));
    }
  }, [history]);

  return <HomeWrapperWithCentralMenu2>
    <div className='page-info-container'>      
      <div className='page-body'>
        <PageTabs pageinfo={pageInfo} />
        <div className='page-body-content'>
          {pageInfo ? renderHtml(pageInfo?.Body || '') : 'Η Σελίδα δεν βρέθηκε'}
        </div>
        <CreatePageComment />
        <div style={{ marginTop: '20px' }}>
          {renderComments(pageInfo, 1, false, null, null)}
        </div>
      </div>
    </div>
  </HomeWrapperWithCentralMenu2>
}