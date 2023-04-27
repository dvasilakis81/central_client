import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import store from '../../../../Redux/Store/store';
import { getPageInfo } from '../../../../Redux/Actions/index';

export default function PageTabs(props) {
  const dispatch = useDispatch();
  let selectedTab = useSelector((state) => state.page_reducer.selectedPageTab) || 0;
  let pageItemDetails = useSelector((state) => state.page_reducer.pageItemDetails);
  let pageInfo = useSelector((state) => state.page_reducer.pageInfo);

  useEffect(() => {
    if (pageItemDetails && pageItemDetails.tabsInfo && pageItemDetails.tabsInfo.length > 0) {
      var payload = { tab: 0, item: pageItemDetails.tabsInfo[0] }
      store.dispatch({ type: 'SET_SELECTED_PAGE_TAB', payload: payload });
      var data = {};
      data.pagename = pageItemDetails.tabsInfo[0].taburl;
      dispatch(getPageInfo(data));
    }
  }, [pageItemDetails]);

  const [hoveredKey, setHoveredKey] = useState(-1);
  const handleTabChange = (event, newValue, item) => {
    var payload = { tab: newValue, item: item }
    store.dispatch({ type: 'SET_SELECTED_PAGE_TAB', payload: payload });
    var data = {};
    data.pagename = item.taburl;
    dispatch(getPageInfo(data));
  };

  if (pageItemDetails && pageItemDetails.tabsInfo && pageItemDetails.tabsInfo.length > 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row', height: '70px', overflowY: 'hidden', overflowX: 'hidden' }}>
          {(pageItemDetails.tabsInfo && pageItemDetails.tabsInfo.length > 0) ?
            [].concat(pageItemDetails.tabsInfo)
            .sort((a, b) => a.taborder > b.taborder ? 1 : -1)
            .map((item, index) => {
              return <div
                id={index}
                className={selectedTab === index ? 'selected-tab' : (hoveredKey === index ? 'hovered-tab' : 'tab')}
                onClick={(e) => { handleTabChange(e, index, item); }}
                onMouseEnter={(e) => { setHoveredKey(index); }}
                onMouseLeave={(e) => { setHoveredKey(-1); }}>
                {item.tabtitle}
              </div>            
            }) : <></>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', height: 'hidden', overflowY: 'hidden' }}>
          {pageInfo ? parse(pageInfo.Body) : <>ΔΕΝ ΒΡΕΘΗΚΕ</>}
        </div>
      </div >
    )
  } else
    return <></>
}