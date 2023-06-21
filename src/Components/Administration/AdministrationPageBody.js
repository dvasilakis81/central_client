import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageItems from '../../Components/Administration/Page/pageitems';
import MenuItems from '../../Components/Administration/Menu/menuitems';
import MediaItems from '../../Components/Administration/Media/mediaitems';
import AnnouncementItems from '../../Components/Administration/Announcements/announcementitems';
import UserItems from '../../Components/Administration/Users/useritems';
import store from '../../Redux/Store/store';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getMenuItems, getServiceItems, getPageItems, getMediaItems, getAnnouncements, getCategories, getUsers } from '../../Redux/Actions/index';
import UserChangePassword from '../Administration/Users/userchangepassword';

export default function AdministrationPage(props) {

  let selectedTab = useSelector((state) => state.parametricdata_reducer.selectedTabAdmin) || 0;
  const { pageItemsList } = useSelector(state => ({ pageItemsList: state.page_reducer.pageItemsList }));
  const { token } = useSelector(state => ({ token: state.token_reducer.token }));

  const dispatch = useDispatch();
  const [hoveredKey, setHoveredKey] = useState(-1);
  const handleMouseEnter = (e, d) => { setHoveredKey(d); };
  const handleMouseLeave = () => { setHoveredKey(-1); };
  let navigate = useNavigate();

  function getTabMenu(tab) {

    if (tab === 0) {
      if (showTabButton('MENOY') === true) {
        return <MenuItems itemtype={1} />
      }
      else
        return <></>
    } else if (tab === 1) {
      if (showTabButton('ΥΠΗΡΕΣΙΕΣ') === true) {
        return <MenuItems itemtype={2} />
      } else
        return <></>
    }
    else if (tab === 2) {
      if (showTabButton('ΣΕΛΙΔΕΣ') === true) {
        return <PageItems />
      } else
        return <></>
    }
    else if (tab === 3) {
      if (showTabButton('ΑΡΧΕΙΑ') === true) {
        return <MediaItems />
      } else
        return <></>
    }
    else if (tab === 4) {
      if (showTabButton('ΑΝΑΚΟΙΝΩΣΕΙΣ') === true) {
        return <AnnouncementItems />
      } else
        return <></>
    }
    else if (tab === 5) {
      if (showTabButton('ΧΡΗΣΤΕΣ') === true) {
        return <UserItems />
      } else
        return <></>
    }

    return <></>
  }

  function showTabButton(tabtitle) {
    if (token && token.userLoginInfo) {
      var rights = token.userLoginInfo[0].rights;
      if (rights) {
        for (var i = 0; i < rights.length; i++) {
          if (tabtitle === 'MENOY' && rights[i].Title === 'Κεντρικό Μενού')
            return rights[i].View;
          else if (tabtitle === 'ΥΠΗΡΕΣΙΕΣ' && rights[i].Title === 'Υπηρεσίες')
            return rights[i].View;
          else if (tabtitle === 'ΣΕΛΙΔΕΣ' && rights[i].Title === 'Σελίδες')
            return rights[i].View;
          else if (tabtitle === 'ΑΡΧΕΙΑ' && rights[i].Title === 'Αρχεία')
            return rights[i].View;
          else if (tabtitle === 'ΑΝΑΚΟΙΝΩΣΕΙΣ' && rights[i].Title === 'Ανακοινώσεις')
            return rights[i].View;
          else if (tabtitle === 'ΧΡΗΣΤΕΣ' && rights[i].Title === 'Χρήστες')
            return rights[i].View;
        }
      } else
        return true;
    }
  }

  useEffect(() => {
    dispatch(getMenuItems());
    dispatch(getServiceItems());
    if (pageItemsList) {
    } else
      dispatch(getPageItems());
    dispatch(getCategories());
    dispatch(getMediaItems());
    dispatch(getUsers());

    if (selectedTab === undefined || selectedTab === null || selectedTab === 0) {
      if (showTabButton('MENOY') === true)
        store.dispatch({ type: 'SET_SELECTED_TAB_ADMIN', payload: 0 });
      else if (showTabButton('ΥΠΗΡΕΣΙΕΣ') === true)
        store.dispatch({ type: 'SET_SELECTED_TAB_ADMIN', payload: 1 });
      else if (showTabButton('ΣΕΛΙΔΕΣ') === true)
        store.dispatch({ type: 'SET_SELECTED_TAB_ADMIN', payload: 2 });
      else if (showTabButton('ΑΡΧΕΙΑ') === true)
        store.dispatch({ type: 'SET_SELECTED_TAB_ADMIN', payload: 3 });
      else if (showTabButton('ΑΝΑΚΟΙΝΩΣΕΙΣ') === true)
        store.dispatch({ type: 'SET_SELECTED_TAB_ADMIN', payload: 4 });
      else if (showTabButton('ΧΡΗΣΤΕΣ') === true)
        store.dispatch({ type: 'SET_SELECTED_TAB_ADMIN', payload: 5 });
    }
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
    else if (newValue === 5)
      dispatch(getUsers());

    store.dispatch({ type: 'SET_SELECTED_TAB_ADMIN', payload: newValue })
  };

  if (token === undefined || token === '')
    navigate('/login');
  else
    return (
      <div style={{ display: 'flex', flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%', overflowY: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'row', height: 'auto', overflowY: 'hidden', overflowX: 'hidden' }}>
          {showTabButton('MENOY') ? <div
            className={selectedTab === 0 ? 'selected-tab' : (hoveredKey === 0 ? 'hovered-tab' : 'tab')}
            onClick={(e) => { handleTabChange(e, 0) }}
            onMouseEnter={(e) => handleMouseEnter(e, 0)}
            onMouseLeave={handleMouseLeave}>
            ΜΕΝΟΥ
          </div> : <></>}
          {showTabButton('ΥΠΗΡΕΣΙΕΣ') ? <div
            className={selectedTab === 1 ? 'selected-tab' : (hoveredKey === 1 ? 'hovered-tab' : 'tab')}
            onClick={(e) => { handleTabChange(e, 1) }}
            onMouseEnter={(e) => handleMouseEnter(e, 1)}
            onMouseLeave={handleMouseLeave}>
            ΥΠΗΡΕΣΙΕΣ
          </div> : <></>}
          {showTabButton('ΣΕΛΙΔΕΣ') ? <div
            className={selectedTab === 2 ? 'selected-tab' : (hoveredKey === 2 ? 'hovered-tab' : 'tab')}
            onClick={(e) => { handleTabChange(e, 2) }}
            onMouseEnter={(e) => handleMouseEnter(e, 2)}
            onMouseLeave={handleMouseLeave}>
            ΣΕΛΙΔΕΣ
          </div> : <></>}
          {showTabButton('ΑΡΧΕΙΑ') ? <div
            className={selectedTab === 3 ? 'selected-tab' : (hoveredKey === 3 ? 'hovered-tab' : 'tab')}
            onClick={(e) => { handleTabChange(e, 3) }}
            onMouseEnter={(e) => handleMouseEnter(e, 3)}
            onMouseLeave={handleMouseLeave}>
            ΑΡΧΕΙΑ
          </div> : <></>}
          {showTabButton('ΑΝΑΚΟΙΝΩΣΕΙΣ') ? <div
            className={selectedTab === 4 ? 'selected-tab' : (hoveredKey === 4 ? 'hovered-tab' : 'tab')}
            onClick={(e) => { handleTabChange(e, 4) }}
            onMouseEnter={(e) => handleMouseEnter(e, 4)}
            onMouseLeave={handleMouseLeave}>
            ΑΝΑΚΟΙΝΩΣΕΙΣ
          </div> : <></>}
          {showTabButton('ΧΡΗΣΤΕΣ') ? <div
            className={selectedTab === 5 ? 'selected-tab' : (hoveredKey === 5 ? 'hovered-tab' : 'tab')}
            onClick={(e) => { handleTabChange(e, 5) }}
            onMouseEnter={(e) => handleMouseEnter(e, 5)}
            onMouseLeave={handleMouseLeave}>
            ΧΡΗΣΤΕΣ
          </div> : <></>}
        </div>
        {getTabMenu(selectedTab || 0)}
        <UserChangePassword />
      </div>
    );

}