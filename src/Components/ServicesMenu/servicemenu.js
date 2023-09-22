import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { getServiceItems, getServiceItemsByGroup, getCategories } from '../../Redux/Actions/index';
import { getHostUrl, renderHtml, includeStrings } from '../../Helper/helpermethods';
import store from '../../Redux/Store/store';
import ServicesSearchBar from '../Search/servicessearchbar';
import ServiceMenuContainer from './servicemenucontainer';

var itemIds = [];
var mediaItemIds = [];

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
  function getFileTypeImage(item) {
    var ret = <></>;

    var srcImage = '';
    if (item?.Name?.endsWith('.pdf')) {
      srcImage = 'fa fa-thin fa-file-pdf fa-3x';
      return <div style={{ flex: 0.3, color: 'orangered' }}>
        <i className='fa fa-thin fa-file-pdf fa-3x'></i>
      </div>
    } else if (item?.Name?.endsWith('.xls') || item?.Name?.endsWith('.xlsx')) {
      return <div style={{ flex: 0.3, color: 'green' }}>
        <i className='fa fa-thin fa-file-excel fa-3x'></i>
      </div>
    } else if (item?.Name?.endsWith('.doc') || item?.Name?.endsWith('.docx'))
      return <div style={{ flex: 0.3, color: 'blue' }}>
        <i className='fa fa-thin fa-file-doc fa-3x'></i>
      </div>
    else if (item?.Name?.endsWith('.mp4'))
      return <div style={{ flex: 0.3, color: '#00008B' }}>
        <i className='fas fa-file-video fa-3x'></i>
      </div>
    else
      srcImage = 'fas fa-file fa-3x';

    ret = <div style={{ flex: 0.3 }}>
      <i className={srcImage}></i>
    </div>

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
        ret = <div style={{ flex: 0.3 }}>
          <img src={srcImage} style={{ fontSize: '26px', fontWeight: 'bolder' }} />
        </div>
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
      onClick={() => {
        if (d.Url) {
          if (d.Url === 'phonecatalog')
            navigate(d.Url)
          else
            window.open(d.Url, '_blank', 'noreferrer')
        } else {
          if (d.PageUrl)
            navigate(d.PageUrl)
        }
      }}>
      <div className={getServiceClass(d)}>
        {getImage(d)}
        <div style={{ flex: 0.7 }}>{d.Name}</div>
      </div>
    </div>
  }
  function renderMediaItem(d, index) {
    return <div
      key={index}
      className='service-menu-item-parent'
      onMouseEnter={(e) => handleMouseEnter(e, d)}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        d.Url ?
          window.open(getHostUrl() + d.Url, '_blank', 'noreferrer')
          :
          (d.Url ? navigate(getHostUrl() + d.Url) : console.log('asdf'))
      }}>
      <div className={getServiceClass(d)}>
        {getFileTypeImage(d)}
        <div style={{ flex: 0.7 }}>{d.Title}</div>
      </div>
    </div>
  }
  function getItems(items) {

    if (items && items.length)
      return items.map((d, index) => {
        return d.Hidden === 0 && includeStrings(d.Name, searchValue || '') ? renderServiceItem(d, index) : <></>
      })
  }
  function getMediaItems(items) {

    if (items && items.length)
      return items.map((d, index) => {
        return includeStrings(d.Title, searchValue || '') ? renderMediaItem(d, index) : <></>
      })
  }
  function getServiceItemsFromSearch(serviceGroups) {
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
  function getMediaItemsFromSearch(groups) {
    mediaItemIds = [];
    return groups && groups.map((group, index) => {
      return group.mediaInfo && group.mediaInfo.map((d, index) => {
        if (!mediaItemIds.includes(d.Id)) {

          if (includeStrings(d.Title, searchValue || '')) {
            mediaItemIds.push(d.Id);
            return renderMediaItem(d, index);
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
      mediaItemIds = [];
      var ret = getServiceItemsFromSearch(serviceItemsList);
      var mediaItems = getMediaItemsFromSearch(serviceItemsList);

      if (itemIds?.length === 0 && mediaItemIds?.length === 0)
        return <div className='flex-row-center message-big-size' style={{ color: '#0F6CBD' }}>
          Δεν βρέθηκαν αποτελέσματα
        </div >
      else {
        return <ServiceMenuContainer>
          {ret}{mediaItems}
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
              {getMediaItems(groupServicesSelected.mediaInfo)}
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
      <div style={{ textAlign: 'center', paddingTop: '30px' }}>
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
        marginTop: '0px'
      }}>
        <div className={getTitle() === 'Ανακοινώσεις' ? 'div-services-frame' : 'div-services-frame'}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexBasis: 'fit-content' }}>
            <div className={getTitle() === 'Ανακοινώσεις' ? 'selected-service-title' : 'selected-service-title'}>
              {getTitle()}
            </div>
          </div>
          <div className='service-container'>
            {getServicesFromSelectedGroup()}
            <div className='services-menu-announcement-container'>
              {
                (searchValue === '' || searchValue === undefined || searchValue === null) && groupServicesSelected && groupServicesSelected.announcementsInfo && groupServicesSelected.announcementsInfo.map((d, index) => {
                  return <div key={index} style={{ margin: '5px', backgroundColor: 'transparent', color: 'black' }}>
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