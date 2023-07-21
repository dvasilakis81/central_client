import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import store from '../../Redux/Store/store';
import { getPageTabInfo } from '../../Redux/Actions/index';
import { renderHtml } from '../../Helper/helpermethods';

export default function PageTabs(props) {
  const dispatch = useDispatch();

  function fetchPageInfo(tabIndex, tabItem) {
    store.dispatch({ type: 'SET_SELECTED_PAGE_TAB', payload: { tab: tabIndex, item: tabItem } });
    var data = {};
    data.url = tabItem.taburl;
    dispatch(getPageTabInfo(data));
  }

  useEffect(() => {
    if (props.pageinfo && props.pageinfo.tabsInfo && props.pageinfo.tabsInfo.length > 0) {
      var tabWithLawOrder = null;
      for (var i = 0; i < props.pageinfo.tabsInfo.length; i++) {
        if (tabWithLawOrder === null)
          tabWithLawOrder = props.pageinfo.tabsInfo[0];
        else if (tabWithLawOrder && props.pageinfo.tabsInfo[i].taborder < tabWithLawOrder.taborder)
          tabWithLawOrder = props.pageinfo.tabsInfo[i];
      }

      fetchPageInfo(0, tabWithLawOrder);
    }
  }, [props.pageinfo]);

  let selectedTab = useSelector((state) => state.page_reducer.selectedPageTab) || 0;
  let pageTabInfo = useSelector((state) => state.page_reducer.pageTabInfo);
  const [hoveredKey, setHoveredKey] = useState(-1);

  if (props.pageinfo && props.pageinfo.tabsInfo && props.pageinfo.tabsInfo.length > 0) {
    return (
      <div style={{ display: 'flex', flex: 1, flexFlow: 'column', overflowY: 'hidden', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'row', height: 'auto', overflowY: 'hidden', overflowX: 'hidden', flexWrap: 'wrap' }}>
          {
            (props.pageinfo.tabsInfo && props.pageinfo.tabsInfo.length > 0) ?
              [].concat(props.pageinfo.tabsInfo)
                .sort((a, b) => a.taborder > b.taborder ? 1 : -1)
                .map((item, index) => {
                  return <div
                    id={item.pageid}
                    className={selectedTab === index ? 'selected-tab' : (hoveredKey === index ? 'selected-tab' : 'tab')}
                    onClick={(e) => { fetchPageInfo(index, item); }}
                    onMouseEnter={(e) => { setHoveredKey(index); }}
                    onMouseLeave={(e) => { setHoveredKey(-1); }}>
                    {item.tabtitle}
                  </div>
                }) : <div style={{ background: 'red' }}></div>
          }
        </div>
        <div style={{ background: 'transparent', padding: '20px' }}>
          {pageTabInfo ? renderHtml(pageTabInfo.Body) : <>ΔΕΝ ΒΡΕΘΗΚΕ</>}
        </div>
      </div>
    )
  } else {
    //console.log('The tabs not rendered');
    return <></>
  }
}