import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPageInfo } from '../../Redux/Actions';
import HomeWrapperWithCentralMenu2 from '../Home/homewrapperwithcentralmenu2';
import PageTabs from './pagetabs';
import CreatePageComment from './createpagecomment';
import { getDateFormat, renderHtml } from '../../Helper/helpermethods';
import { renderComments, setHeaderTitle, setSelectedCentralMenuItem } from '../Common/methods'
import AnimationLayout from '../Animation/animation';
import { motion } from "framer-motion";

// const PageLayout = ({ children }) => children;
// const pageVariants = {
//   initial: {
//     opacity: 0
//   },
//   in: {
//     opacity: 1
//   },
//   out: {
//     opacity: 0
//   }
// };
// const pageTransition = {
//   type: "tween",
//   ease: "linear",
//   duration: 1
// };

export default function PageInfo() {
  const dispatch = useDispatch();
  const history = useNavigate();
  let pageInfo = useSelector((state) => state.page_reducer.pageInfo);
  const { menuItemsList } = useSelector(state => ({ menuItemsList: state.menu_reducer.menuItemsList }));

  useEffect(() => {
    var pageUrlParts = window.location.href.split('/');
    if (pageUrlParts) {
      var data = {};
      data.url = pageUrlParts[pageUrlParts.length - 1];
      //console.log('pageinfo: ' + data.url);
      dispatch(getPageInfo(data)).then(response => {
        setHeaderTitle(response?.value?.Title);

        if (menuItemsList) {
          var announcementsItem = {}
          for (var i = 0; i < menuItemsList.length; i++) {
            var menuItem = menuItemsList[i];
            if (response?.value?.Url.startsWith('oey-'))
              break;
            if (menuItem.Name === 'Ανακοινώσεις')
              announcementsItem = menuItem;

            if (menuItem.Name === response?.value?.Title) {
              setSelectedCentralMenuItem(menuItem);
              break;
            }
            if (i === menuItemsList.length - 1)
              setSelectedCentralMenuItem(announcementsItem);
          }
        }
      });
    }
  }, [history]);

  return <HomeWrapperWithCentralMenu2>

    <div className='page-info-container'>
      <div className='page-body'>
        {/* <motion.div
          initial="initial"
          animate="in"
          variants={pageVariants}
          transition={pageTransition}> */}
          <PageTabs pageinfo={pageInfo} />
          <div className='page-body-content'>
            {pageInfo ? renderHtml(pageInfo?.Body || '') : 'Η Σελίδα δεν βρέθηκε'}
          </div>
          <CreatePageComment />
          <div style={{ marginTop: '20px' }}>
            {renderComments(pageInfo, 1, false, null, null)}
          </div>
        {/* </motion.div > */}
      </div>
    </div>

  </HomeWrapperWithCentralMenu2>
}