import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getHeaderHeight } from '../../Helper/helpermethods';
import thyraios from '../Images/thyraios.png';
import store from '../../Redux/Store/store';
import Categories from '../Administration/Categories/categories';

export default function Header(props) {
  const headerHeight = getHeaderHeight();
  const { token } = useSelector(state => ({ token: state.token_reducer.token }));
  const { headerTitleValue } = useSelector(state => ({ headerTitleValue: state.parametricdata_reducer.headerTitleValue }));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const popupRef = useRef();
  const [userInfoVisible, setUserInfoVisible] = useState('');

  useEffect(() => {

    var pageName = '';
    var pageUrlParts = window.location.href.split('/');
    if (pageUrlParts) {
      pageName = pageUrlParts[pageUrlParts.length - 1];
      var data = {};
      data.url = pageName;
      if (pageName === 'administration')
        setUserInfoVisible(true);
    }
  }, []);
  const styles = {
    header: {
      width: '100%',
      backgroundColor: '#e7e7e7',
      justifyContent: 'left',
      alignItems: 'center',
      display: "flex",
      flex: 1,
      fontWeight: 'bold',
      flexDirection: 'row',
      padding: 0,
      height: headerHeight
    },
    headerTitle: {
      flexGrow: 1,
      padding: 10,
      fontSize: '36px',
      color: '#094fa3',
      textAlign: 'left',
      alignSelf: 'left',
      verticalAlign: 'middle'
    }
  }
  function renderUserInfo() {
    if (userInfoVisible === true) {
      return <div style={{ display: 'flex', flex: 1, justifyContent: 'right', alignItems: 'center', marginRight: '20px' }}>
        {renderAdminOptions()}
        <div
          ref={menuRef}
          onClick={(e) => {
            if (isMenuOpen === true)
              setIsMenuOpen(false);
            else
              setIsMenuOpen(true);
          }}>
          <i className="fa fa-bars fa-2x" />
        </div>
        {
          isMenuOpen === true ?
            <div
              ref={popupRef}
              style={{
                position: 'fixed',
                width: '300px',
                height: '300px',
                marginRight: '-100px',
                marginLeft: '-300px',
                top: menuRef.current ? menuRef.current.offsetTop + menuRef.current.offsetHeight + 10 : 0,
                left: menuRef.current ? menuRef.current.offsetLeft : 0,
                zIndex: 100000
              }}>
              <div style={{
                position: 'relative',
                width: '300px',
                background: '#fff',
                padding: '0px',
                border: '1px solid #999',
                overflow: 'auto'
              }}>
                <div style={{ padding: '20px' }}>
                  {token && token.userLoginInfo[0].Firstname}
                  <span>  </span>
                  {token && token.userLoginInfo[0].Lastname}
                </div>
                <div style={{ padding: '20px' }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = 'lightblue'; }}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  onClick={(e) => {
                    store.dispatch({ type: 'OPEN_CHANGE_PASSWORD', payload: true });
                  }}>
                  Αλλαγή Kωδικού
                </div>
                <div style={{ padding: '20px' }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = 'lightblue'; }}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  onClick={(e) => {
                    store.dispatch({ type: 'LOGOUT_RESET_STORE', payload: undefined });
                  }}>
                  Αποσύνδεση
                </div>
              </div>
            </div> : <></>
        }
      </div>
    } else {
      return <div className='page-title'>
        {headerTitleValue}
      </div>
    }
  }
  function renderAdminOptions() {
    return <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
      <div style={{ marginRight: '20px' }}>
        LOGS
      </div>
      <div
        style={{ marginRight: '20px' }}
        onClick={() => {
          store.dispatch({ type: 'OPEN_CATEGORIES', payload: true })
        }}>
        ΚΑΤΗΓΟΡΙΕΣ
      </div>      
    </div>
  }

  return <header style={styles.header}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src={thyraios} alt="Δήμος Αθηναίων" width='50px' height='50px' />
      <span style={styles.headerTitle}>
        Κεντρική Σελίδα Δήμου Αθηναίων
      </span>
    </div>
    {renderUserInfo()}
  </header>
}