import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import parse from 'html-react-parser';
import store from '../../../../Redux/Store/store';
import { getPageInfo } from '../../../../Redux/Actions/index';

const styles = {
  selectedTab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'lightBlue',
    borderBottom: '2px solid #1b7ced',
    width: '200px',
    textAlign: 'center',
    height: '40px',
    paddingTop: '5px',
    cursor: 'unset',
    bottom: 0
  },
  hoveredTab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#05E9FF',
    borderBottom: '2px solid #1b7ced',
    width: '200px',
    textAlign: 'center',
    height: '40px',
    paddingTop: '5px',
    cursor: 'pointer',
    bottom: 0
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
    width: '200px',
    textAlign: 'center',
    borderBottom: '1px solid black',
    cursor: 'unset'
  }
};

function getTabs(pageItemDetails, handleMouseEnter, handleMouseLeave, hoveredKey, selectedTab, dispatch) {

  const handleTabChange = (event, newValue, item) => {
    var payload = { tab: newValue, item: item }
    store.dispatch({ type: 'SET_SELECTED_PAGE_TAB', payload: payload });
    var data = {};
    data.pagename = item.taburl;
    dispatch(getPageInfo(data));
  };

  if (pageItemDetails.tabsInfo && pageItemDetails.tabsInfo.length > 0)
    return pageItemDetails.tabsInfo.map((item, index) => {
      return <div
        id={item.pageid}
        style={selectedTab === index ? styles.selectedTab : (hoveredKey === index ? styles.hoveredTab : styles.tab)}
        onClick={(e) => { handleTabChange(e, index, item) }}
        onMouseEnter={(e) => handleMouseEnter(e, index)}
        onMouseLeave={(e) => handleMouseLeave(e)}>
        {item.tabtitle}
      </div>
    })
  else
    return <></>
}

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
  const handleMouseEnter = (e, d) => { setHoveredKey(d); };
  const handleMouseLeave = (e) => { setHoveredKey(-1); };

  
  if (pageItemDetails && pageItemDetails.tabsInfo && pageItemDetails.tabsInfo.length>0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* <div> */}
        <div style={{ display: 'flex', flexDirection: 'row', height: 'auto', overflowY: 'hidden', overflowX: 'hidden' }}>
          {getTabs(pageItemDetails, handleMouseEnter, handleMouseLeave, hoveredKey, selectedTab, dispatch)}
        </div>        
        <div style={{ display: 'flex', flexDirection: 'column', height: 'hidden', overflowY: 'hidden' }}>
          {pageInfo ? parse(pageInfo.Body) : <>ΔΕΝ ΒΡΕΘΗΚΕ</>}
        </div>
        {/* {getPageBody(pageInfo)} */}
      </div >
    )
  } else
    return <></>
}