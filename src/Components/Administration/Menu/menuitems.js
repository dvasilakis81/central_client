import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ItemsList from '../../Items/itemslist';
import ItemDetail from '../../Items/itemdetail';
import EmptyItems from '../../Empty/empty';
import Actions from '../Actions/actions';
import SearchBar from '../SearchBar/searchbar';
import store from '../../../Redux/Store/store';

function MenuItems(props) {

  const { menuItemsList } = useSelector(state => ({ menuItemsList: state.menu_reducer.menuItemsList }));
  const { serviceItemsList } = useSelector(state => ({ serviceItemsList: state.menu_reducer.serviceItemsList }));
  let itemDetails = useSelector((state) => { return props.itemtype === 1 ? state.menu_reducer.menuItemDetails : state.menu_reducer.serviceItemDetails; });
  const [searchValue, setSearchValue] = useState('');
  const handleChangeSearchValue = (e) => {
    store.dispatch({ type: 'SET_MENUITEM_DETAIL', payload: undefined })
    setSearchValue(e.target.value);
  };

  return <div style={{ display: 'flex', flex: 1, flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%', overflowY: 'hidden' }}>
    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', height: 'auto', overflowY: 'scroll', overflowX: 'hidden', backgroundColor: 'white' }}>
      {/* 1st column */}
      <div style={{ height: '100%', display: 'flex', flexFlow: 'column', flex: '0.3', backgroundColor: '#fff' }}>
        <SearchBar searchValue={searchValue} handleChangeSearchValue={handleChangeSearchValue} />
        <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'auto', overflowX: 'hidden', margin: '0px', padding: '0px' }}>
          <div style={{ display: 'flex', flexFlow: 'column', flex: '1', backgroundColor: '#fff' }}>
            <ItemsList data={props.itemtype === 1 ? menuItemsList : serviceItemsList}
              kind="menuitems"
              itemtype={props.itemtype}
              searchValue={searchValue} />
          </div>
        </div>
      </div>

      {/* 2st column */}
      <div style={{ marginLeft: '10px', marginRight: '15px', display: 'flex', flexFlow: 'column', flexBasis: '100%', flex: '1', backgroundColor: 'white', overflowY: 'hidden' }}>
        <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'hidden', overflowX: 'hidden' }}>
          <div style={{ display: 'flex', flexFlow: 'column', flex: '1', overflowY: 'hidden', overflowX: 'hidden', margin: '0px', padding: '0px' }}>
            <Actions navigatepage={'/newmenuitem'} itemtype={props.itemtype} itemname={itemDetails && itemDetails.Name || ''} contenttype="menuitem" />
            <ItemDetail kind="menuitems" itemtype={props.itemtype} />
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default MenuItems;