import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getServiceItems, getServiceItemsByGroup } from '../../Redux/Actions/index';
import { getCategories } from '../../Redux/Actions/index';
import { getHostUrl } from '../../Helper/helpermethods';
import { includeStrings } from '../../Helper/helpermethods';
import store from '../../Redux/Store/store';
import parse from 'html-react-parser';
import PopUp from '../../HOC/PopUp/PopUp';

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
  const { categoryWithSubCategoriesSelected } = useSelector(state => ({ categoryWithSubCategoriesSelected: state.menu_reducer.categoryWithSubCategoriesSelected }));
  const { openPopUp } = useSelector(state => ({ openPopUp: state.parametricdata_reducer.openPopUp }));

  useEffect(() => {
    dispatch(getServiceItemsByGroup());
    dispatch(getCategories());
  }, []);

  function getSubCategories(selectedCategory) {

    return serviceItemsList && serviceItemsList.map((d, index) => {
      if (selectedCategory && d && d.ParentId == selectedCategory.Id)
        return <div
          key={index}
          style={{ margin: '10px', flexDirection: 'column' }}
          onMouseEnter={(e, d) => { setGroupHoveredKey(index); }}
          onMouseLeave={(e, d) => { setGroupHoveredKey(''); }}
          className={groupHoveredKey === index || groupServicesSelected === d ? 'group-services-item-hovered' : 'group-services-item'}
          onClick={(e) => { store.dispatch({ type: 'SET_SELECTED_GROUP_SERVICES', payload: d }); }}>
          {d.Name}
        </div>
    })
  }

  function getServiceClass(item) {
    var ret = '';

    if (hoveredKey === item)
      ret = 'service-menu-item-child-hovered';
    else
      ret = 'service-menu-item-child';

    return ret;
  }
  function getImage(item) {
    var ret = <></>;
    var srcImage = getHostUrl() + item.ImageService;

    if (item && item.ImageService) {
      if (item.ImageService.includes("fa-") === true)
        ret = <div style={{ flex: 0.3 }}>
          <i className={item.ImageService} style={{ fontSize: '40px', fontWeight: 'bolder' }}></i>
        </div>
      else
        ret = <div style={{ flex: 0.3 }}><img src={srcImage} style={{ fontSize: '26px', fontWeight: 'bolder' }} /></div>
    } else {
      if (item && item.ImageMenu) {
        var srcImage = getHostUrl() + item.ImageMenu;
        if (item.ImageMenu.includes("fa-") === true)
          ret = <div style={{ flex: 0.3 }}>
            {/* <div className='service-image-circle'> */}
            <i class={item.ImageMenu} style={{ fontSize: '40px', fontWeight: 'bolder' }}></i>
            {/* </div> */}
          </div>
        else
          ret = <div style={{ flex: 0.3 }}><img src={srcImage} style={{ fontSize: '26px', fontWeight: 'bolder' }} /></div>
      }
    }

    return ret;
  }
  function getItems(items) {

    return items && items.map((d, index) => {
      return d.Hidden === 0 && includeStrings(d.Name, searchValue || '') ?
        <div key={index}
          className="service-menu-item-parent"
          onMouseEnter={(e) => handleMouseEnter(e, d)}
          onMouseLeave={handleMouseLeave}
          onClick={() => { d.Url ? window.open(d.Url, '_blank', 'noreferrer') : (d.PageUrl ? navigate(d.PageUrl) : console.log('asdf')) }}>
          <div className={getServiceClass(d)}>
            {getImage(d)}
            <div style={{ flex: 0.7 }}>{d.Name}</div>
          </div>
        </div>
        :
        <></>
    })
  }
  function getServicesFromSelectedGroup() {
    if (groupServicesSelected) {
      if (groupServicesSelected.HasSubCategories === 1)
        return getSubCategories(groupServicesSelected);
      else
        return getItems(groupServicesSelected.servicesInfo);
    }
  }
  function getItemsByGroup(openPopUp, menuRef, searchValue) {

    return serviceItemsList && serviceItemsList.map((d, index) => {
      var conditionToShow = (d.announcementsInfo && d.announcementsInfo.length > 0) || (d.servicesInfo && d.servicesInfo.length > 0) || d.HasSubCategories == 1
      conditionToShow = conditionToShow && d.ParentId == 0
      if (conditionToShow)
        return <>
          <div
            style={{ margin: '2px', flexDirection: 'column' }}
            ref={menuRef}
            onMouseEnter={(e, d) => { setGroupHoveredKey(index); }}
            onMouseLeave={(e, d) => { setGroupHoveredKey(''); }}
            className={groupHoveredKey === index || groupServicesSelected === d ? 'group-services-item-hovered' : 'group-services-item'}
            onClick={(e) => {
              // if (d.HasSubCategories === 1) {
              //   var divPosition = {};
              //   divPosition.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + 10;
              //   divPosition.left = e.currentTarget.offsetLeft;

              //   store.dispatch({ type: 'SET_DIV_POSITION', payload: divPosition })
              //   store.dispatch({ type: 'SET_SELECTED_CATEGORY_WITH_SUBCATEGORIES', payload: d });
              //   store.dispatch({ type: 'OPEN_POP_UP', payload: openPopUp == true ? false : true });
              // }
              // else
              store.dispatch({ type: 'SET_SELECTED_GROUP_SERVICES', payload: d })
            }}>
            {d.Name}
          </div>
          <PopUp>
            {getSubCategories(d)}
          </PopUp>
        </>
    })
  }
  function getServicesTitle(groupServicesSelected) {

    if (groupServicesSelected.ParentId > 0) {
      for (let i = 0; i < serviceItemsList.length; i++) {
        if (groupServicesSelected.ParentId === serviceItemsList[i].Id){
          return <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div
              style={{ margin: '10px'}}
              onMouseEnter={(e, d) => { setGroupHoveredKey(i); }}
              onMouseLeave={(e, d) => { setGroupHoveredKey(''); }}
              className='group-services-item-header'
              onClick={(e) => { store.dispatch({ type: 'SET_SELECTED_GROUP_SERVICES', payload: serviceItemsList[i] }); }}>
              {serviceItemsList[i].Name}
            </div>
            <div style={{ margin: '10px', color: "#00008B" }}>{groupServicesSelected.Name}</div>
          </div>
        }
      }
    }

    return <div style={{ margin: '10px', color: "#00008B" }}>{groupServicesSelected.Name}</div>
  }

  function getSelectedServiceTitle() {
    if (groupServicesSelected)
      return <div style={{ backgroundColor: '#87CEEB', color: "#00008B", fontWeight: 'bold', fontSize: '22px', width: '100%', textAlign: 'center' }}>
        {getServicesTitle(groupServicesSelected)}
      </div>
    else
      return <div style={{ fontSize: '22px', color: 'blue' }}>Παρακαλώ επιλέξτε κάποια κατηγορία</div>
  }

  const menuRef = useState();

  //var openPopUp = categoryWithSubCategoriesSelected && openPopUp ? true : false
  return <>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      justifyContent: 'start',
      background: 'white',
      opacity: '1',
      overflowY: 'scroll'
    }}>
      <div style={{ display: 'flex', flexDirection: 'row', padding: '10px', flexWrap: 'wrap', maxHeight: '100px', overflowY: 'scroll' }}>
        {getItemsByGroup(openPopUp, menuRef, searchValue || '')}
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
            border: '2px solid #87CEEB',
            paddingBottom: '10px',
            width: '70%'
          }}>
            {getSelectedServiceTitle()}
            <div>
              <div className="services-menu-container">
                <div className="services-menu-items">
                  {/* <div style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}> */}
                  {getServicesFromSelectedGroup()}
                  {/* </div> */}
                </div>
              </div>
              <div>
                {
                  groupServicesSelected && groupServicesSelected.announcementsInfo && groupServicesSelected.announcementsInfo.map((d, index) => {
                    return <div key={index} style={{ margin: '20px' }}>
                      {parse(d.Description)}
                    </div>
                  })
                }
              </div>
            </div>
          </div>
        </div>
        {/* </div>
      </div> */}
      </div>
    </div>
  </>
}

export default ServicesMenu;