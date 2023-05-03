import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageItems from '../../Components/Administration/Page/pageitems';
import MenuItems from '../../Components/Administration/Menu/menuitems';
import MediaItems from '../../Components/Administration/Media/mediaitems';
import AnnouncementItems from '../../Components/Administration/Announcements/announcementitems';
import store from '../../Redux/Store/store';

import { getMenuItems, getServiceItems, getPageItems, getMediaItems, getAnnouncements, getCategories } from '../../Redux/Actions/index';

function getTabMenu(tab) {

  if (tab === 0)
    return <MenuItems itemtype={1} />
  else if (tab === 1)
    return <MenuItems itemtype={2} />
  else if (tab === 2)
    return <PageItems />
  else if (tab === 3)
    return <MediaItems />
  else if (tab === 4)
    return <AnnouncementItems />

  return <></>
}

export default function AdministrationPage(props) {

  let selectedTab = useSelector((state) => state.parametricdata_reducer.selectedTabAdmin) || 0;
  const { pageItemsList } = useSelector(state => ({ pageItemsList: state.page_reducer.pageItemsList }));

  const dispatch = useDispatch();
  const [hoveredKey, setHoveredKey] = useState(-1);
  const handleMouseEnter = (e, d) => { setHoveredKey(d); };
  const handleMouseLeave = () => { setHoveredKey(-1); };
  useEffect(() => {
    dispatch(getMenuItems());
    dispatch(getServiceItems());    
    if (pageItemsList) {
    } else
      dispatch(getPageItems());
    dispatch(getCategories());
    dispatch(getMediaItems());
  }, [])

  const handleTabChange = (event, newValue) => {
    if (newValue === 0)
      dispatch(getMenuItems());
    else if (newValue === 1)
      dispatch(getServiceItems());
    else if (newValue === 2)
      dispatch(getPageItems());
    else if (newValue === 3)
      dispatch(getMediaItems());
    else if (newValue === 4)
      dispatch(getAnnouncements());

    store.dispatch({ type: 'SET_SELECTED_TAB_ADMIN', payload: newValue })
  };

  return (
    <div style={{ display: 'flex', flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%', overflowY: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'row', height: 'auto', overflowY: 'hidden', overflowX: 'hidden' }}>
        <div
          className={selectedTab === 0 ? 'selected-tab' : (hoveredKey === 0 ? 'hovered-tab' : 'tab')}
          onClick={(e) => { handleTabChange(e, 0) }}
          onMouseEnter={(e) => handleMouseEnter(e, 0)}
          onMouseLeave={handleMouseLeave}>
          ΜΕΝΟΥ
        </div>
        <div
          className={selectedTab === 1 ? 'selected-tab' : (hoveredKey === 1 ? 'hovered-tab' : 'tab')}
          onClick={(e) => { handleTabChange(e, 1) }}
          onMouseEnter={(e) => handleMouseEnter(e, 1)}
          onMouseLeave={handleMouseLeave}>
          ΥΠΗΡΕΣΙΕΣ
        </div>
        <div
          className={selectedTab === 2 ? 'selected-tab' : (hoveredKey === 2 ? 'hovered-tab' : 'tab')}
          onClick={(e) => { handleTabChange(e, 2) }}
          onMouseEnter={(e) => handleMouseEnter(e, 2)}
          onMouseLeave={handleMouseLeave}>
          ΣΕΛΙΔΕΣ
        </div>
        <div
          className={selectedTab === 3 ? 'selected-tab' : (hoveredKey === 3 ? 'hovered-tab' : 'tab')}
          onClick={(e) => { handleTabChange(e, 3) }}
          onMouseEnter={(e) => handleMouseEnter(e, 3)}
          onMouseLeave={handleMouseLeave}>
          ΑΡΧΕΙΑ
        </div>
        <div
          className={selectedTab === 4 ? 'selected-tab' : (hoveredKey === 4 ? 'hovered-tab' : 'tab')}
          onClick={(e) => { handleTabChange(e, 4) }}
          onMouseEnter={(e) => handleMouseEnter(e, 4)}
          onMouseLeave={handleMouseLeave}>
          ΑΝΑΚΟΙΝΩΣΕΙΣ
        </div>
      </div>
      {getTabMenu(selectedTab || 0)}
    </div>
  );

}