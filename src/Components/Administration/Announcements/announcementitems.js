import React from 'react';
import { useSelector } from 'react-redux';
import ItemsList from '../../Items/itemslist';
import ItemDetail from '../../Items/itemdetail';
import EmptyItems from '../../Empty/empty';
import Actions from '../Actions/actions';

function AnnouncementItems(props) {

  const { announcementsList } = useSelector(state => ({
    announcementsList: state.announcement_reducer.announcementsList
  }));
  const { announcementDetails } = useSelector(state => ({
    announcementDetails: state.announcement_reducer.announcementDetails
  }));

  return <div style={{ display: 'flex', flex: 1, flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%', overflowY: 'hidden' }}>
    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', height: 'auto', overflowY: 'scroll', overflowX: 'hidden', backgroundColor: 'white' }}>
      {/* 1st column */}
      <div style={{ height: '100%', display: 'flex', flexFlow: 'column', flex: '0.3', backgroundColor: '#fff' }}>
        <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'auto', overflowX: 'hidden', margin: '0px', padding: '0px' }}>
          <div style={{ display: 'flex', flexFlow: 'column', flex: '1', backgroundColor: '#fff' }}>
            {(announcementsList && announcementsList.length > 0) ? <ItemsList data={announcementsList} defaultSelectedItem={announcementsList[0]} kind="announcementitems" /> : <EmptyItems title="announcement" />}
          </div>
        </div>
      </div>

      {/* 2st column */}
      <div style={{ marginLeft: '10px', marginRight: '15px', display: 'flex', flexFlow: 'column', flexBasis: '100%', flex: '1', backgroundColor: 'white', overflowY: 'hidden' }}>
        <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'hidden', overflowX: 'hidden' }}>
          <div style={{ display: 'flex', flexFlow: 'column', flex: '1', overflowY: 'hidden', overflowX: 'hidden', margin: '0px', padding: '0px' }}>
            <Actions navigatepage={'/newannouncementitem'} itemtype={props.itemtype} itemname={announcementDetails && announcementDetails.Name || ''} contenttype="announcement"/>
            {(announcementsList && announcementsList.length > 0)
              ?
              <ItemDetail kind="announcementitems" />
              : <></>}
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default AnnouncementItems;