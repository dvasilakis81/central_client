import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ItemsList from '../../Items/itemslist';
import ItemDetail from '../../Items/itemdetail';
import EmptyItems from '../../Empty/empty';
import Actions from '../Actions/actions';
import SearchBar from '../SearchBar/searchbar';
import store from '../../../Redux/Store/store';

function LogItems(props) {

  const { logItemsList } = useSelector(state => ({ logItemsList: state.logs_reducer.logItemsList }));
  const { logItemDetails } = useSelector(state => ({ logItemDetails: state.logs_reducer.logItemDetails }));
  const [searchValue, setSearchValue] = useState('');
  const handleChangeSearchValue = (e) => { 
    store.dispatch({ type: 'SET_LOGITEM_DETAIL', payload: undefined })
    setSearchValue(e.target.value); 
  };

  return <div style={{ display: 'flex', flex: 1, flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%', overflowY: 'hidden' }}>
    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', height: 'auto', overflowY: 'scroll', overflowX: 'hidden', backgroundColor: 'white' }}>
      {/* 1st column */}
      <div style={{ height: '100%', display: 'flex', flexFlow: 'column', flex: '0.3', backgroundColor: '#fff' }}>
        <SearchBar searchValue={searchValue} handleChangeSearchValue={handleChangeSearchValue} />
        <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'auto', overflowX: 'hidden', margin: '0px', padding: '0px' }}>
          <div style={{ display: 'flex', flexFlow: 'column', flex: '1', backgroundColor: '#fff' }}>
            {(logItemsList && logItemsList.length > 0) ?
              <ItemsList data={logItemsList} defaultSelectedItem={logItemsList[0]} kind="logitems" searchValue={searchValue} /> :
              <EmptyItems title="log" />}
          </div>
        </div>
      </div>

      {/* 2st column */}
      <div style={{ marginLeft: '10px', marginRight: '15px', display: 'flex', flexFlow: 'column', flexBasis: '100%', flex: '1', backgroundColor: 'white', overflowY: 'hidden' }}>
        <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'hidden', overflowX: 'hidden' }}>
          <div style={{ display: 'flex', flexFlow: 'column', flex: '1', overflowY: 'hidden', overflowX: 'hidden', margin: '0px', padding: '0px' }}>
            <Actions navigatepage={'/newlogitem'} itemtype={props.itemtype} itemname={logItemDetails && logItemDetails.Name || ''} contenttype="logitem" />
            {(logItemsList && logItemsList.length > 0)
              ?
              <ItemDetail kind="logitems" />
              : <></>}
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default LogItems;