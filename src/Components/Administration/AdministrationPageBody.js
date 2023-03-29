import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageItems from '../../Components/Administration/Page/pageitems';
import MenuItems from '../../Components/Administration/Menu/menuitems';
import MediaItems from '../../Components/Administration/Media/mediaitems';
import AnnouncementItems from '../../Components/Administration/Announcements/announcementitems';
import store from '../../Redux/Store/store';

import { setSelectedTab } from '../../Redux/Actions/index';

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
  //const dispatch = useDispatch();
  let selectedTab = useSelector((state) => state.parametricdata_reducer.selectedTabAdmin) || 0;

  const [hoveredKey, setHoveredKey] = useState(-1);
  const handleMouseEnter = (e, d) => {
    setHoveredKey(d);
  };
  const handleMouseLeave = () => {
    setHoveredKey(-1);
  };
  const handleTabChange = (event, newValue) => {
    store.dispatch({ type: 'SET_SELECTED_TAB_ADMIN', payload: newValue })
    //dispatch(setSelectedTab(newValue));
  };

  return (
    <div style={{ display: 'flex', flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%', overflowY: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'row', height: 'auto', overflowY: 'hidden', overflowX: 'hidden' }}>
        <div
          style={selectedTab === 0 ? styles.selectedTab : (hoveredKey === 0 ? styles.hoveredTab : styles.tab)}
          onClick={(e) => { handleTabChange(e, 0) }}
          onMouseEnter={(e) => handleMouseEnter(e, 0)}
          onMouseLeave={handleMouseLeave}>
          ΜΕΝΟΥ
        </div>
        <div style={selectedTab === 1 ? styles.selectedTab : (hoveredKey === 1 ? styles.hoveredTab : styles.tab)}
          onClick={(e) => { handleTabChange(e, 1) }}
          onMouseEnter={(e) => handleMouseEnter(e, 1)}
          onMouseLeave={handleMouseLeave}>
          ΥΠΗΡΕΣΙΕΣ
        </div>
        <div style={selectedTab === 2 ? styles.selectedTab : (hoveredKey === 2 ? styles.hoveredTab : styles.tab)}
          onClick={(e) => { handleTabChange(e, 2) }}
          onMouseEnter={(e) => handleMouseEnter(e, 2)}
          onMouseLeave={handleMouseLeave}>
          ΣΕΛΙΔΕΣ
        </div>
        <div style={selectedTab === 3 ? styles.selectedTab : (hoveredKey === 3 ? styles.hoveredTab : styles.tab)}
          onClick={(e) => { handleTabChange(e, 3) }}
          onMouseEnter={(e) => handleMouseEnter(e, 3)}
          onMouseLeave={handleMouseLeave}>
          ΑΡΧΕΙΑ
        </div>
        <div style={selectedTab === 4 ? styles.selectedTab : (hoveredKey === 4 ? styles.hoveredTab : styles.tab)}
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