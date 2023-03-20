import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMenuItems } from '../../Redux/Actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn } from '@fortawesome/free-solid-svg-icons'

function CentralMenu() {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [hoveredKey, setHoveredKey] = useState('');
  const handleMouseEnter = (e, d) => {
    setHoveredKey(d);
  };
  const handleMouseLeave = () => {
    setHoveredKey('');
  };
  const { menuItemsList } = useSelector(state => ({
    menuItemsList: state.menu_reducer.menuItemsList
  }));

  useEffect(() => {
    dispatch(getMenuItems());
  }, []);

  const styles = {
    menuBody: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'flex-start',
      minWidth: '15%',
      height: '90%',
      alignContent: 'center',
      background: '#FCF9B5',
      borderRadius: '30px',
      opacity: 0.8,
      color: "#926f34",
      color: 'black',
      flexShrink: 'initial',
      padding: '10px',
      alignSelf: 'center',
      width: '80%'
    },
    menuitemParent: {
      display: 'flex',
      flexDirection: 'row',
      lineHeight: '22pt'
    },
    menuitem: {
      display: 'flex',
      flex: '1',
      fontSize: '16px',
      fontStyle: 'bold|italic',
      //color: '#094fa3',
      fontWeight: 'bolder',
      paddingTop: 3,
      paddingBottom: 3,
      cursor: 'pointer'
    },
    hoveredMenuitem: {
      display: 'flex',
      flex: '1',
      fontSize: '16px',
      fontStyle: 'bold|italic',
      fontWeight: 'bolder',
      paddingTop: 3,
      paddingBottom: 3,
      color: 'white',
      background: '#2196F3',
    },
    hoveredMenuitem_backup: {
      flex: '1',
      background: '#2196F3',
      fontSize: '16px',
      fontStyle: 'bold|italic',
      fontWeight: 'bolder',
      color: 'white',
      paddingTop: 0,
      paddingBottom: 0,
      cursor: 'pointer'
    }
  };

  //backgroundImage: `url("/img/cityofathens1.jpg")`
  return (
    <div style={styles.menuBody}>
      {menuItemsList && menuItemsList.map((d, index) => (
        d.Hidden === 0 && d.MenuItem === 1 ?
          (d.Url ?
            <div key={index} style={styles.menuitemParent}>
              <div style={{ flex: '0.03' }}></div>
              <div
                key={d}
                onMouseEnter={(e) => handleMouseEnter(e, d)}
                onMouseLeave={handleMouseLeave}
                onClick={() => { window.open(d.Url, '_blank', 'noreferrer'); }}
                style={hoveredKey === d ? styles.hoveredMenuitem : styles.menuitem}>
                {/* <FontAwesomeIcon className="fontawesomestyle" icon="fa fa-rss" style={{ flex: '0.05' }} /> */}
                {/* <FontAwesomeIcon icon="fas fa-sitemap" /> */}
                <i class={d.ImageMenu} style={{ fontSize: '26px', fontWeight: 'bolder' }}></i>
                <span style={{ flex: '1', marginLeft: '15px' }}>
                  {d.Name}
                </span>
              </div>
            </div>
            :
            <div key={index} style={styles.menuitemParent}>
              <div style={{ flex: '0.03' }}></div>
              <div
                onMouseEnter={(e) => handleMouseEnter(e, d)}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  if (d.PageUrl) {
                    //console.log('d.PageUrl: ' + d.PageUrl);
                    navigate('/' + d.PageUrl);
                  }
                  else
                    navigate('/');
                }}
                style={hoveredKey === d ? styles.hoveredMenuitem : styles.menuitem}>
                {/* <FontAwesomeIcon className="fontawesomestyle" icon={faBullhorn} style={{ flex: '0.05' }} /> */}
                <i class={d.ImageMenu} style={{ fontSize: '26px', fontWeight: 'bolder' }}></i>
                <span style={{ flex: '1', marginLeft: '15px' }}>
                  {d.Name}
                </span>
              </div>
            </div>) : <></>
      ))
      }
    </div >
  )
}

export default CentralMenu;