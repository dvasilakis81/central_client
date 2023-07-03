import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ItemsList from '../../Items/itemslist';
import ItemDetail from '../../Items/itemdetail';
import EmptyItems from '../../Empty/empty';
import Actions from '../Actions/actions';
import SearchBar from '../SearchBar/searchbar';
import store from '../../../Redux/Store/store';

function AnnouncementItems(props) {

  const { categoriesList } = useSelector(state => ({ categoriesList: state.categories_reducer.categoriesList }));
  const { categoryDetails } = useSelector(state => ({ categoryDetails: state.categories_reducer.categoryDetails }));
  const [searchValue, setSearchValue] = useState('');
  const handleChangeSearchValue = (e) => {
    store.dispatch({ type: 'SET_CATEGORYITEM_DETAIL', payload: undefined })
    setSearchValue(e.target.value);
  };

  return <div style={{ display: 'flex', flex: 1, flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%', overflowY: 'hidden' }}>
    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', height: 'auto', overflowY: 'scroll', overflowX: 'hidden', backgroundColor: 'white' }}>
      {/* 1st column */}
      <div style={{ height: '100%', display: 'flex', flexFlow: 'column', flex: '0.3', backgroundColor: '#fff' }}>
        <SearchBar searchValue={searchValue} handleChangeSearchValue={handleChangeSearchValue} />
        <div style={{ display: 'flex', flexFlow: 'row', flex: '1', overflowY: 'auto', overflowX: 'hidden', margin: '0px', padding: '0px' }}>
          <div style={{ display: 'flex', flexFlow: 'column', flex: '1', backgroundColor: '#fff' }}>
            {(categoriesList && categoriesList.length > 0) ?
              <ItemsList data={categoriesList} defaultSelectedItem={categoriesList[0]} kind="categoryitems" searchValue={searchValue} />
              : <EmptyItems title="ανακοινώσεις" />}
          </div>
        </div>
      </div>

      {/* 2st column */}
      <div style={{
        marginLeft: '0px',
        marginRight: '5px',
        display: 'flex',
        flexFlow: 'column',
        flexBasis: '100%',
        flex: '1 1 160px',
        backgroundColor: 'white',
        overflowY: 'hidden'
      }}>
        <Actions navigatepage={'/newcategoryitem'} itemtype={props.itemtype} itemname={categoryDetails && categoryDetails.Name || ''} contenttype="category" />
        {(categoriesList && categoriesList.length > 0)
          ?
          <ItemDetail kind="categoryitems" />
          : <></>}
      </div>
    </div>
  </div>
}

export default AnnouncementItems;