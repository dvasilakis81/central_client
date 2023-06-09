import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useRef } from 'react';
import { getHeaderHeight } from '../../Helper/helpermethods';
import thyraios from '../Images/thyraios.png';
import ServicesSearchBar from '../Search/servicessearchbar';

const styles = {
  menuenter: {
    marginLeft: '10px',
    width: '60px',
    height: '55px',
    border: '2px solid #00008b',
    textAlign: 'center'
  },
  menuleave: { marginLeft: '10px', width: '60px', height: '55px', border: '2px solid white', textAlign: 'center' },
  menuentercolor: { color: 'white' },
  menuleavecolor: { color: '#00008b' }
}

export default function Header(props) {
  const headerHeight = getHeaderHeight();
  const { pageItemsList } = useSelector(state => ({ pageItemsList: state.page_reducer.pageItemsList }));
  const { token } = useSelector(state => ({ token: state.token_reducer.token }));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const menustyle = isMenuOpen === false ? styles.menuenter : styles.menuleave;
  const menuRef = useRef();
  const popupRef = useRef();

  const styles = {
    header: {
      width: '100%',
      backgroundColor: '#1b7ced',
      verticalAlign: 'center',
      display: "flex",
      flex: 1,
      flexDirection: 'row',
      padding: 0,
      height: headerHeight
    },
    header2: {
      width: '100%',
      backgroundColor: '#f4f6f7',
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
      fontSize: 36,
      color: '#094fa3',
      textAlign: 'center',
      alignSelf: 'center'
    },
    headerSearchBar: {
      marginLeft: 10,
      fontSize: 24,
      textAlign: 'center',
      flexGrow: 0.5,
      width: '300px',
      alignSelf: 'center',
      borderTop: '1px darkblue solid',
    }
  }

  return <div style={styles.header2}>
    <div style={{ minWidth: '500px', maxWidth: '500px' }}>
      <img src={thyraios} alt="Δήμος Αθηναίων" width='50px' height='50px' />
    </div>
    <div style={styles.headerTitle}>
      Κεντρική Σελίδα Δήμου Αθηναίων
    </div>
    <div style={{ display: 'flex', flex: 1, justifyContent: 'right', alignItems: 'center', marginRight: '20px' }}>
      <>
        <div
          ref={menuRef}
          onClick={(e) => {
            //setIsMenuIconClicked(true);
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
                overflow: 'auto',
              }}>
                <div style={{ padding: '20px' }}>
                  {token && token.userLoginInfo[0].Firstname}
                  <span>  </span>
                  {token && token.userLoginInfo[0].Lastname}
                </div>
                <div style={{ padding: '20px' }}
                  onMouseEnter={(e) => { e.target.style.backgroundColor = 'lightblue'; }}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                  Αλλαγή Kωδικού
                </div>
              </div>
            </div> : <></>
        }
      </>
    </div>
    {/* <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <span style={{
        verticalAlign: 'center',
        fontSize: '24px',
      }}>
        <i className="fa fa-magnifying-glass" />
      </span>
      <input
        style={styles.headerSearchBar}
        type='text' />
    </div> */}
    {/* <ServicesSearchBar /> */}
  </div>
}