import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import Card from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { getServiceItems, getServiceItemsByGroup, getCategories } from '../../Redux/Actions/index';
import { getHostUrl, renderHtml, includeStrings } from '../../Helper/helpermethods';
import store from '../../Redux/Store/store';
import ServicesSearchBar from '../Search/servicessearchbar';
import ServiceMenuContainer from './servicemenucontainer';

var itemIds = [];

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

  function getSubCategories(groupServicesSelected) {

    return serviceItemsList && serviceItemsList.map((d, index) => {
      if (groupServicesSelected && d && d.ParentId == groupServicesSelected.Id)
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
  function renderServiceItem(d, index) {
    return <div
      key={index}
      className="service-menu-item-parent"
      onMouseEnter={(e) => handleMouseEnter(e, d)}
      onMouseLeave={handleMouseLeave}
      onClick={() => { d.Url ? window.open(d.Url, '_blank', 'noreferrer') : (d.PageUrl ? navigate(d.PageUrl) : console.log('asdf')) }}>
      <div className={getServiceClass(d)}>
        {getImage(d)}
        <div style={{ flex: 0.7 }}>{d.Name}</div>
      </div>
    </div>
  }
  function getItems(items) {

    if (items && items.length)
      return items.map((d, index) => {
        return d.Hidden === 0 && includeStrings(d.Name, searchValue || '') ? renderServiceItem(d, index) : <></>
      })
  }
  function getItemsFromSearch(serviceGroups) {
    itemIds = [];
    return serviceGroups && serviceGroups.map((servicegroup, index) => {
      return servicegroup.servicesInfo && servicegroup.servicesInfo.map((d, index) => {
        if (!itemIds.includes(d.Id)) {

          if (d.Hidden === 0 && includeStrings(d.Name, searchValue || '')) {
            itemIds.push(d.Id);
            return renderServiceItem(d, index);
          }
          else
            return <></>
        } else
          return <></>
      })
    })
  }
  function getServicesFromSelectedGroup() {
    if (searchValue) {
      itemIds = [];
      var ret = getItemsFromSearch(serviceItemsList);
      if (itemIds.length === 0)
        return <div className='flex-row-center message-big-size'>
          Δεν βρέθηκαν υπηρεσίες
        </div >
      else {
        return <ServiceMenuContainer>
          {ret}
        </ServiceMenuContainer>
      }
    } else {
      if (groupServicesSelected) {
        if (groupServicesSelected.HasSubCategories === 1)
          return <ServiceMenuContainer>
            {getSubCategories(groupServicesSelected)}
          </ServiceMenuContainer>
        else {
          if (groupServicesSelected.servicesInfo && groupServicesSelected.servicesInfo.length > 0) {
            return <ServiceMenuContainer>
              {getItems(groupServicesSelected.servicesInfo)}
            </ServiceMenuContainer>
          }
        }
      }
    }
  }
  function getItemsByGroup(openPopUp, menuRef, searchValue) {

    return serviceItemsList && serviceItemsList.map((d, index) => {
      var hasAtLeastOneAnnouncement = (d.announcementsInfo && d.announcementsInfo.length > 0);
      var hasAtLeastOneService = (d.servicesInfo && d.servicesInfo.length > 0);
      var hasSubCategories = (d.HasSubCategories == 1);
      var hasNoParent = (d.ParentId == 0);

      var conditionToShow = (hasNoParent && (hasAtLeastOneAnnouncement || hasAtLeastOneService || hasSubCategories));
      if (conditionToShow)
        return <>
          <div
            style={{ margin: '10px', flexDirection: 'column' }}
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
              store.dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })
              store.dispatch({ type: 'SET_SELECTED_GROUP_SERVICES', payload: d })
            }}>
            {d.Name}
          </div>
          {/* <PopUp>
            {getSubCategories(d)}
          </PopUp> */}
        </>
    })
  }
  function getTitle() {
    var ret = '';

    if (searchValue)
      ret = 'Αναζήτηση';
    else if (groupServicesSelected)
      ret = groupServicesSelected.Name;
    else
      ret = 'Παρακαλώ επιλέξτε κάποια κατηγορία';

    return ret;
  }
  const menuRef = useState();
  return <>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      background: 'white',
      opacity: '1',
      overflowY: 'auto'
    }}>
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <ServicesSearchBar />
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '10px',
        marginTop: '10px'
      }}>
        {getItemsByGroup(openPopUp, menuRef, searchValue || '')}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: '30px'
      }}>
        <div className='div-services-frame'>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexBasis: 'fit-content' }}>
            <div className='selected-service-title'>
              {getTitle()}
            </div>
          </div>
          <div style={{ marginTop: '0px', overflowY: 'auto' }}>
            {getServicesFromSelectedGroup()}
            <div className='services-menu-announcement-container'>
              {
                (searchValue === '' || searchValue === undefined || searchValue === null) && groupServicesSelected && groupServicesSelected.announcementsInfo && groupServicesSelected.announcementsInfo.map((d, index) => {
                  return <div key={index} style={{ margin: '20px', backgroundColor: 'white', color: 'black' }}>
                    {renderHtml(d.Description)}
                  </div>
                })
              }
              {/* <div style={{ margin: '20px', display: 'flex', flexDirection: 'row', flex: 1 }}>
                {
                  (searchValue === '' || searchValue === undefined || searchValue === null) &&
                  groupServicesSelected && groupServicesSelected.announcementsInfo && groupServicesSelected.announcementsInfo.map((d, index) => {
                    return <Card key={index} sx={{ maxWidth: '200px', margin: '50px' }}>
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          <div style={{ maxWidth: '200px' }}>
                            {renderHtml(d.Description)}
                          </div>
                        </Typography>
                      </CardContent>
                    </Card>
                  })
                }
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default ServicesMenu;