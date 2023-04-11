import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMenuItems } from '../../Redux/Actions/index';

function CentralMenu() {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [hoveredKey, setHoveredKey] = useState('');
  const handleMouseEnter = (e, d) => { setHoveredKey(d); };
  const handleMouseLeave = () => { setHoveredKey(''); };
  const { menuItemsList } = useSelector(state => ({ menuItemsList: state.menu_reducer.menuItemsList }));

  useEffect(() => { dispatch(getMenuItems()); }, []);

  return (
    <div className='menu-body'>
      {menuItemsList && menuItemsList.map((d, index) => (
         
        d.Hidden === 0 && d.MenuItem === 1 ?
          (d.Url ?
            <div key={index + '_' + d.MenuItem} className='menu-item-parent'>
              <div style={{ flex: '0.03' }}></div>
              <div
                key={d}
                onMouseEnter={(e) => handleMouseEnter(e, d)}
                onMouseLeave={handleMouseLeave}
                onClick={() => { window.open(d.Url, '_blank', 'noreferrer'); }}
                className={hoveredKey === d ? 'menu-item-hovered' : 'menu-item'}>
                <i className={d.ImageMenu} style={{ fontSize: '26px', fontWeight: 'bolder' }}></i>
                <span style={{ flex: '1', marginLeft: '15px' }}>
                  {d.Name}
                </span>
              </div>
            </div>
            :
            <div key={index} className='menu-item-parent'>
              <div style={{ flex: '0.03' }}></div>
              <div
                onMouseEnter={(e) => handleMouseEnter(e, d)}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  if (d.PageUrl)
                    navigate('/' + d.PageUrl);
                  else
                    navigate('/');
                }}
                className={hoveredKey === d ? 'menu-item-hovered' : 'menu-item'}>
                <i className={d.ImageMenu} style={{ fontSize: '26px', fontWeight: 'bolder' }}></i>
                <span style={{ flex: '1', marginLeft: '15px' }}>
                  {d.Name}
                </span>
              </div>
            </div>) : <></>
      ))
      }
    </div>
  )
}

export default CentralMenu;