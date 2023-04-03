import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ItemsList from '../../Items/itemslist';
import ItemDetail from '../../Items/itemdetail';
import EmptyItems from '../../Empty/empty';
import Actions from '../Actions/actions';
import SearchBar from '../SearchBar/searchbar';
import store from '../../../Redux/Store/store';

function MediaItems(props) {

  const { mediaItemsList } = useSelector(state => ({ mediaItemsList: state.media_reducer.mediaItemsList }));
  const { mediaItemDetails } = useSelector(state => ({ mediaItemDetails: state.media_reducer.mediaItemDetails }));
  const [searchValue, setSearchValue] = useState('');
  const handleChangeSearchValue = (e) => { 
    store.dispatch({ type: 'SET_MEDIAITEM_DETAIL', payload: undefined })
    setSearchValue(e.target.value); 
  };

  return <div style={{ display: 'flex', flex: 1, flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%', overflowY: 'hidden' }}>
    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', height: 'auto', overflowY: 'scroll', overflowX: 'hidden', backgroundColor: 'white' }}>
      {/* 1st column */}
      <div style={{ height: '100%', display: 'flex', flexFlow: 'column', flex: '0.3', backgroundColor: '#fff' }}>
        <SearchBar searchValue={searchValue} handleChangeSearchValue={handleChangeSearchValue} />
        <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'auto', overflowX: 'hidden', margin: '0px', padding: '0px' }}>
          <div style={{ display: 'flex', flexFlow: 'column', flex: '1', backgroundColor: '#fff' }}>
            {(mediaItemsList && mediaItemsList.length > 0) ?
              <ItemsList data={mediaItemsList} defaultSelectedItem={mediaItemsList[0]} kind="mediaitems" searchValue={searchValue} /> :
              <EmptyItems title="media" />}
          </div>
        </div>
      </div>

      {/* 2st column */}
      <div style={{ marginLeft: '10px', marginRight: '15px', display: 'flex', flexFlow: 'column', flexBasis: '100%', flex: '1', backgroundColor: 'white', overflowY: 'hidden' }}>
        <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'hidden', overflowX: 'hidden' }}>
          <div style={{ display: 'flex', flexFlow: 'column', flex: '1', overflowY: 'hidden', overflowX: 'hidden', margin: '0px', padding: '0px' }}>
            <Actions navigatepage={'/newmediaitem'} itemtype={props.itemtype} itemname={mediaItemDetails && mediaItemDetails.Name || ''} contenttype="mediaitem" />
            {(mediaItemsList && mediaItemsList.length > 0)
              ?
              <ItemDetail kind="mediaitems" />
              : <></>}
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default MediaItems;