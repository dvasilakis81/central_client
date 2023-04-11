import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getMenuItems } from '../../Redux/Actions/index';
import { getCategories } from '../../Redux/Actions/index';
import { getHostUrl } from '../../Helper/helpermethods';
import { includeStrings } from '../../Helper/helpermethods';

function ServicesMenu() {  
  const dispatch = useDispatch();
  const [hoveredKey, setHoveredKey] = useState('');  
  let navigate = useNavigate();
  
  const handleMouseEnter = (e, d) => { setHoveredKey(d); };
  const handleMouseLeave = () => { setHoveredKey(''); };
  const { menuItemsList } = useSelector(state => ({ menuItemsList: state.menu_reducer.menuItemsList }));
  const { searchValue } = useSelector(state => ({ searchValue: state.parametricdata_reducer.searchValue }));

  useEffect(() => { 
    dispatch(getMenuItems()); 
    dispatch(getCategories()); 
  }, []);

  function getBackgroundColor(item) {
    var ret = '#9DD8EA';

    if (hoveredKey === item)
      ret = '#2196F3';
    else {
      if (item.Announce === 1) {
        //ret = 'linear-gradient(110.4deg, rgb(247, 112, 15) 6.4%, rgb(248, 50, 88) 100.2%);';
        ret = '#ffa590';
      }
      else
        ret = '#9DD8EA';
    }

    return ret;
  }
  function getImage(item) {
    var ret = <></>;
    var srcImage = getHostUrl() + item.ImageService;

    if (item && item.ImageService) {
      if (item.ImageService.includes("fa-") === true)
        ret = <div style={{ flex: 0.3 }}><i className={item.ImageService} style={{ fontSize: '26px', fontWeight: 'bolder' }}></i></div>
      else
        ret = <div style={{ flex: 0.3 }}><img src={srcImage} style={{ fontSize: '26px', fontWeight: 'bolder' }} /></div>
    } else {
      if (item && item.ImageMenu) {
        var srcImage = getHostUrl() + item.ImageMenu;
        if (item.ImageMenu.includes("fa-") === true)
          ret = <div style={{ flex: 0.3 }}>
            <div className='service-image-circle'>
              <i class={item.ImageMenu} style={{ fontSize: '26px', fontWeight: 'bolder' }}></i>
            </div>
          </div>
        else
          ret = <div style={{ flex: 0.3 }}><img src={srcImage} style={{ fontSize: '26px', fontWeight: 'bolder' }} /></div>
      }
    }

    return ret;
  }
  function getItems(searchValue) {

    var itemsList = menuItemsList;
    // if (searchList && searchList.length > 0)
    //   itemsList = searchList;
    return (itemsList && itemsList.map(d => (
      d.Hidden === 0 && d.ServiceItem === 1 && includeStrings(d.Name, searchValue) === true ?
        <div
          className="service-menu-item"
          onMouseEnter={(e) => handleMouseEnter(e, d)}
          onMouseLeave={handleMouseLeave}
          onClick={() => { d.Url ? window.open(d.Url, '_blank', 'noreferrer') : (d.PageUrl ? navigate(d.PageUrl) : console.log('asdf')) }}
          style={{ background: getBackgroundColor(d) }}>
          {getImage(d)}
          <div style={{ flex: 0.7 }}>{d.Name}</div>
        </div> :
        <></>)))
  }

  
  return (<div className="services-menu-container">      
      <div className="services-menu-items">
        {getItems(searchValue || '')}
      </div>
    </div>)
}

export default ServicesMenu;