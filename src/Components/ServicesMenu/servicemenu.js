import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getServiceItems, getServiceItemsByGroup } from '../../Redux/Actions/index';
import { getCategories } from '../../Redux/Actions/index';
import { getHostUrl } from '../../Helper/helpermethods';
import { includeStrings } from '../../Helper/helpermethods';
import store from '../../Redux/Store/store';

function ServicesMenu() {
  const dispatch = useDispatch();
  const [hoveredKey, setHoveredKey] = useState('');
  let navigate = useNavigate();

  const [groupHoveredKey, setGroupHoveredKey] = useState('');
  const handleMouseEnter = (e, d) => { setHoveredKey(d); };
  const handleMouseLeave = () => { setHoveredKey(''); };
  const { serviceItemsList } = useSelector(state => ({ serviceItemsList: state.menu_reducer.serviceItemsList }));
  const { searchValue } = useSelector(state => ({ searchValue: state.parametricdata_reducer.searchValue }));
  const { groupServicesSelected } = useSelector(state => ({ groupServicesSelected: state.menu_reducer.groupServicesSelected }));

  useEffect(() => {
    dispatch(getServiceItemsByGroup());
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
  function getItems(items) {

    // return items && items.map((d, index) => {
    //   return d.Hidden === 0 && includeStrings(d.Name, searchValue || '') ?
    //     <div
    //       key={index}
    //       onMouseEnter={(e) => handleMouseEnter(e, d)}
    //       onMouseLeave={handleMouseLeave}
    //       onClick={() => { d.Url ? window.open(d.Url, '_blank', 'noreferrer') : (d.PageUrl ? navigate(d.PageUrl) : console.log('asdf')) }}
    //       style={{ display: 'flex', flex: 1, background: getBackgroundColor(d) }}>
    //       {getImage(d)}
    //       <div style={{ flex: 0.7 }}>
    //         {d.Name}
    //       </div>
    //     </div>
    //     :
    //     <></>
    // })

    return items && items.map((d, index) => {
      return d.Hidden === 0 && includeStrings(d.Name, searchValue || '') ?
        <div
          key={index}
          className="service-menu-item"
          onMouseEnter={(e) => handleMouseEnter(e, d)}
          onMouseLeave={handleMouseLeave}
          onClick={() => { d.Url ? window.open(d.Url, '_blank', 'noreferrer') : (d.PageUrl ? navigate(d.PageUrl) : console.log('asdf')) }}
          style={{ background: getBackgroundColor(d) }}>
          {getImage(d)}
          <div style={{ flex: 0.7 }}>{d.Name}</div>
        </div>
        :
        <></>
    })
  }

  function getServicesFromSelectedGroup() {
    if (groupServicesSelected) {
      return getItems(groupServicesSelected.servicesInfo);
    }
  }

  function getItemsByGroup(items, searchValue) {
    // if (items instanceof Array) {
    //   return items && items.map((d, index) => {
    //     return <div
    //       style={{ margin: '2px', flexDirection: 'column' }}
    //       onMouseEnter={(e, d) => { setGroupHoveredKey(index); }}
    //       onMouseLeave={(e, d) => { setGroupHoveredKey(''); }}          
    //       className={groupHoveredKey === index || groupServicesSelected === d ? 'group-services-item-hovered' : 'group-services-item'}
    //       onClick={(e) => { store.dispatch({ type: 'SET_SELECTED_GROUP_SERVICES', payload: d }) }}>
    //       {d.Name}
    //     </div >
    //   })
    // }

    return items && items.map((d, index) => {
      return <div
        style={{ margin: '2px', flexDirection: 'column' }}
        onMouseEnter={(e, d) => { setGroupHoveredKey(index); }}
        onMouseLeave={(e, d) => { setGroupHoveredKey(''); }}
        className={groupHoveredKey === index || groupServicesSelected === d ? 'group-services-item-hovered' : 'group-services-item'}
        onClick={(e) => { store.dispatch({ type: 'SET_SELECTED_GROUP_SERVICES', payload: d }) }}>
        {d.Name}
      </div>
    })
  }

  function getSelectedServiceTitle() {
    if (groupServicesSelected)
      return <div style={{ backgroundColor: 'blue', color: 'white', fontSize: '22px', width: '100%', textAlign: 'center' }}>
        {groupServicesSelected.Name} <br /> {groupServicesSelected.servicesInfo?.length} {groupServicesSelected.servicesInfo ? (groupServicesSelected.servicesInfo.length === 1 ? 'υπηρεσία' : 'υπηρεσίες') : ''}
      </div>
    else
      return <div style={{ fontSize: '22px', color: 'blue' }}>Παρακαλώ επιλέξτε κάποια κατηγορία</div>
  }
  // return (<div className="services-menu-container">
  //   <div className="services-menu-items">
  //     {getItemsByGroup(serviceItemsList, searchValue || '')}
  //   </div>
  // </div>)

  // return <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', width: '100%', justifyContent: 'start' }}>
  //   <div style={{ display: 'flex', flexDirection: 'column', padding: '0px', minWidth: '500px', maxWidth: '500px' }}>
  //     {getItemsByGroup(serviceItemsList, searchValue || '')}
  //   </div>
  //   <div>
  //     <div className="services-menu-container">
  //       <div className="services-menu-items">
  //         {getServicesFromSelectedGroup()}
  //       </div>
  //     </div>
  //   </div>
  // </div >
  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'start',
    background: 'white',
    opacity: '1',
    overflowY: 'scroll'
  }}>
    <div style={{ display: 'flex', flexDirection: 'row', padding: '0px', flexWrap: 'wrap' }}>
      {getItemsByGroup(serviceItemsList, searchValue || '')}
    </div>
    <div>
      {/* <div className="services-menu-container">
        <div className="services-menu-items">
          {getServicesFromSelectedGroup()}
        </div>
      </div> */}
      {/* <div className="services-menu-container">
        <div className="services-menu-items"> */}
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
        <div style={{
          display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '50px',
          background: 'transparent',
          border: '2px solid blue',
          paddingBottom: '10px',
          width: '70%'
        }}>
          {getSelectedServiceTitle()}
          <div className="services-menu-container">
            <div className="services-menu-items">
              {/* <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}> */}
              {getServicesFromSelectedGroup()}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* </div>
      </div> */}
    </div>
  </div >
}

export default ServicesMenu;