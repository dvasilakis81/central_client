import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';

import store from '../../../Redux/Store/store';
import { getScreenWidth, getScreenHeight } from '../../../Helper/helpermethods';
import { Button } from '@material-ui/core';

import { editCategory } from '../../../Redux/Actions/index';

function useOutsideAlerter(ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        store.dispatch({ type: 'CLOSE_CATEGORIES', payload: false })
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function renderItem(dispatch, item, editItems, setEditItems, itemBeforeEdit, setItemBeforeEdit, index) {
  var editMode = false;

  if (editItems && editItems.length > 0) {
    if (editItems[0].Id === item.Id)
      editMode = true;
  }

  if (editMode === true)
    return <>
      {/* <div style={{ flex: 0.95, justifyContent: 'flex-start' }}>{item.Name}</div> */}
      <input style={{ flex: 0.95, textAlign: 'center', fontSize: '20px' }} type='text' value={item.Name} onChange={(e) => {
        var updatedCategoryItem = { val: e.target.value, Id: item.Id }
        store.dispatch({ type: 'UPDATE_CATEGORY_LIST_ITEM', payload: updatedCategoryItem })
      }}></input>
      <Button variant="contained"
        style={{
          margin: '5px',
          background: 'blue',
          textTransform: 'none',
          fontSize: '16px',
          color: 'white'
        }}
        disabled={false}
        onClick={() => {
          var data ={};
          data.id = item.Id;
          data.name = item.Name;
          dispatch(editCategory(data));          
          setEditItems([]);
        }}>
        <SaveIcon />
      </Button>
      <Button
        variant="contained"
        style={{
          margin: '5px', background: 'red', textTransform: 'none',
          fontSize: '16px',
          color: 'white'
        }}
        disabled={false}
        onClick={() => {
          setEditItems([]);

          var updatedCategoryItem = { val: itemBeforeEdit, Id: item.Id }
          store.dispatch({ type: 'UPDATE_CATEGORY_LIST_ITEM', payload: updatedCategoryItem })
          return item;
        }}>
        <CancelIcon />
      </Button>
    </>
  else {
    return <>
      <div style={{ flex: 0.95, justifyContent: 'flex-start' }}>{item.Name}</div>
      <>
        <Button variant="contained"
          style={{ margin: '5px', background: '#17d3cd', textTransform: 'none', fontSize: '16px' }}
          disabled={editItems && editItems.length > 0 ? true : false}
          onClick={() => {
            setEditItems([...editItems, item]);
            var initialItemName = item.Name;
            setItemBeforeEdit(initialItemName);
          }}>
          <EditIcon />
        </Button>
        <Button variant="contained"
          style={{ margin: '5px', background: '#17d3cd', textTransform: 'none', fontSize: '16px' }}
          disabled={editItems && editItems.length > 0 ? true : false}
          onClick={() => { console.log('') }}>
          <DeleteIcon />
        </Button>
      </>
    </>
  }
}

function renderCategoriesList(dispatch, editItems, setEditItems, itemBeforeEdit, setItemBeforeEdit, categoriesList) {
  return categoriesList.map((item, index) => {
    return <div style={{ display: 'flex', flex: 1, flexDirection: 'row', fontSize: '1.5rem', padding: '10px' }}>
      {renderItem(dispatch, item, editItems, setEditItems, itemBeforeEdit, setItemBeforeEdit, index)}
    </div>
  })
}

export default function Categories() {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const dispatch = useDispatch();

  const { opencategories } = useSelector(state => ({ opencategories: state.parametricdata_reducer.opencategories }));
  const { categoriesList } = useSelector(state => ({ categoriesList: state.parametricdata_reducer.categoriesList }));
  const [editItems, setEditItems] = useState([]);
  const [itemBeforeEdit, setItemBeforeEdit] = useState([]);


  if (opencategories === true)
    return <div
      ref={wrapperRef}
      style={{
        width: getScreenWidth() / 2, height: getScreenHeight() / 2,
        position: 'absolute',
        left: getScreenWidth() / 4,
        right: getScreenHeight() / 2,
        margin: '0 auto',
        border: '5px solid #00001B',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1
      }}>
      <div style={{ background: 'white', flex: 0.05, fontSize: '2.5rem' }}>{categoriesList?.length} Κατηγορίες</div>
      <div style={{ overflowY: 'scroll', flex: 0.9, background: 'lightblue' }}>
        {renderCategoriesList(dispatch, editItems, setEditItems, itemBeforeEdit, setItemBeforeEdit, categoriesList)}
      </div>
      <div style={{ flex: 0.05, backgroundColor: 'lightgrey' }}>
        <Button
          disabled={false}
          style={{ fontSize: '18px', textAlign: 'center' }}
          onClick={() => {
            console.log('');
          }}>
          ΠΡΟΣΘΗΚΗ
        </Button>
      </div>
    </div >
}