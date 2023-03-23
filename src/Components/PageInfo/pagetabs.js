import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import store from '../../Redux/Store/store';
import { getPageTabInfo } from '../../Redux/Actions/index';

// const styles = {
//   selectedTab: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     background: 'lightBlue',
//     borderBottom: '2px solid #1b7ced',
//     width: '200px',
//     textAlign: 'center',
//     cursor: 'unset',
//     fontWeight: 600,
//     color: '#1b7ced'
//   },
//   hoveredTab: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     background: '#05E9FF',
//     borderBottom: '3px solid #1b7ced',
//     width: '200px',
//     textAlign: 'center',
//     cursor: 'pointer',
//     fontWeight: 600,
//     color: '#1b7ced'
//   },
//   tab: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     background: 'white',
//     width: '200px',
//     height: '70px',
//     textAlign: 'center',
//     borderBottom: '1px solid black',
//     cursor: 'unset',
//     fontWeight: 600,
//     color: '#1b7ced'
//   }
// };

function getTabs(pageItemDetails, handleMouseEnter, handleMouseLeave, hoveredKey, selectedTab, dispatch) {

  const handleTabChange = (event, newValue, item) => {
    var payload = { tab: newValue, item: item }
    store.dispatch({ type: 'SET_SELECTED_PAGE_TAB', payload: payload });
    var data = {};
    data.pagename = item.taburl;
    dispatch(getPageTabInfo(data));
  };

  if (pageItemDetails.tabsInfo && pageItemDetails.tabsInfo.length > 0)
    return [].concat(pageItemDetails.tabsInfo)
      .sort((a, b) => a.taborder > b.taborder ? 1 : -1)
      .map((item, index) => {
        return <div
          id={item.pageid}
          //style={selectedTab === index ? styles.selectedTab : (hoveredKey === index ? styles.hoveredTab : styles.tab)}
          className={selectedTab === index ? 'selectedTab' : (hoveredKey === index ? 'hoveredTab' : 'tab')}
          onClick={(e) => { handleTabChange(e, index, item) }}>
          {item.tabtitle}
        </div>
      })

  // return pageItemDetails.tabsInfo.map((item, index) => {
  //   return <div
  //     id={item.pageid}
  //     style={selectedTab === index ? styles.selectedTab : (hoveredKey === index ? styles.hoveredTab : styles.tab)}
  //     onClick={(e) => { handleTabChange(e, index, item) }}>
  //     {item.tabtitle}
  //   </div>
  // })
  else
    return <div style={{ background: 'red' }}>alabornezika</div>
}

export default function PageTabs(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.pageinfo && props.pageinfo.tabsInfo && props.pageinfo.tabsInfo.length > 0) {
      var tabWithLawOrder = null;
      for (var i = 0; i < props.pageinfo.tabsInfo.length; i++) {
        if (tabWithLawOrder === null)
          tabWithLawOrder = props.pageinfo.tabsInfo[0];
        else if (tabWithLawOrder && props.pageinfo.tabsInfo[i].taborder < tabWithLawOrder.taborder)
          tabWithLawOrder = props.pageinfo.tabsInfo[i];
      }

      var payload = { tab: 0, item: tabWithLawOrder }
      store.dispatch({ type: 'SET_SELECTED_PAGE_TAB', payload: payload });
      var data = {};
      data.pagename = tabWithLawOrder.taburl;
      dispatch(getPageTabInfo(data));
    }
  }, [props.pageinfo]);

  let selectedTab = useSelector((state) => state.page_reducer.selectedPageTab) || 0;
  let pageTabInfo = useSelector((state) => state.page_reducer.pageTabInfo);

  const [hoveredKey, setHoveredKey] = useState(-1);
  const handleMouseEnter = (e, d) => { setHoveredKey(d); };
  const handleMouseLeave = (e) => { setHoveredKey(-1); };

  if (props.pageinfo && props.pageinfo.tabsInfo && props.pageinfo.tabsInfo.length > 0) {
    return (
      <div style={{ display: 'flex', flex: 1, flexFlow: 'column', overflowY: 'hidden', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'row', height: 'auto', overflowY: 'hidden', overflowX: 'hidden', flexWrap: 'wrap' }}>
          {getTabs(props.pageinfo, handleMouseEnter, handleMouseLeave, hoveredKey, selectedTab, dispatch)}
        </div>
        <div style={{ background: 'transparent', padding: '20px' }}>
          {pageTabInfo ? parse(pageTabInfo.Body || '') : <>ΔΕΝ ΒΡΕΘΗΚΕ</>}
        </div>
      </div>
    )
  } else {
    console.log('The tabs not rendered');
    return <></>
  }
}