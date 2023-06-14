import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMenuItems } from '../../Redux/Actions/index';
import store from '../../Redux/Store/store';

function CentralMenu() {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [hoveredKey, setHoveredKey] = useState('');
  const handleMouseEnter = (e, d) => { setHoveredKey(d); };
  const handleMouseLeave = () => { setHoveredKey(''); };
  const { menuItemsList } = useSelector(state => ({ menuItemsList: state.menu_reducer.menuItemsList }));
  const { selectedCentralMenu } = useSelector(state => ({ selectedCentralMenu: state.parametricdata_reducer.selectedCentralMenu }));

  useEffect(() => { dispatch(getMenuItems()); }, []);

  function getClass(d, hoveredKey) {

    if ((selectedCentralMenu && selectedCentralMenu.Name === d.Name) || hoveredKey === d)
      return 'menu-item-hovered';
    else
    return 'menu-item';
      //return (hoveredKey === d ? 'menu-item-hovered' : 'menu-item');
  }
  function getImageClassName(ImageMenu){
    return ImageMenu + ' menuItemImage' 
  }
  return (
    <div className='menu-body'>
      {menuItemsList && menuItemsList.map((d, index) => (

        d.Hidden === 0 ?
          <div key={index + '_' + d.MenuItem} className='menu-item-parent'>
            <div
              className={getClass(d, hoveredKey)}
              key={d}
              onMouseEnter={(e) => handleMouseEnter(e, d)}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                if (d.Url)
                  window.open(d.Url, '_blank', 'noreferrer');
                else {
                  store.dispatch({ type: 'SET_SELECTED_CENTRAL_MENU', payload: d })
                  if (d.PageUrl)
                    navigate('/' + d.PageUrl);
                  else
                    navigate('/');
                }
              }}>
              <span>&nbsp;&nbsp;</span>
              {/* <i className={d.ImageMenu} style={{ fontSize: '26px', fontWeight: 'bolder', minWidth: '30px', maxWidth: '30px' }}></i> */}
              <i className={getImageClassName(d.ImageMenu)}></i>
              <span style={{ flex: '1', marginLeft: '15px' }}>
                {d.Name}
              </span>
            </div>
          </div> : <></>
      ))
      }
    </div>
  )
}

export default CentralMenu;