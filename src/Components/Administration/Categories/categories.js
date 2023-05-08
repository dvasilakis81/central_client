import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';

import store from '../../../Redux/Store/store';
import { getScreenWidth, getScreenHeight } from '../../../Helper/helpermethods';
import { Button } from '@material-ui/core';
import { addCategory, editCategory } from '../../../Redux/Actions/index';
import MyDialog from '../Common/dialog'

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

function renderItem(dispatch, item, editItems, setEditItems, itemBeforeEdit, setItemBeforeEdit, setOpenDeleteDialog, index) {
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
      }} />
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
          var data = {};
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
          disabled={item.candelete === true ? false : true}
          onClick={() => { setOpenDeleteDialog(true) }}>
          <DeleteIcon />
        </Button>
      </>
    </>
  }
}
function renderCategoriesList(dispatch, editItems, setEditItems, itemBeforeEdit, setItemBeforeEdit, categoriesList, setOpenDeleteDialog) {
  return categoriesList && categoriesList.map((item, index) => {
    return <div style={{ display: 'flex', flex: 1, flexDirection: 'row', fontSize: '1.5rem', padding: '10px' }}>
      {renderItem(dispatch, item, editItems, setEditItems, itemBeforeEdit, setItemBeforeEdit, setOpenDeleteDialog, index)}
    </div>
  })
}

function renderNewCategoryForm(newItem, setNewItem, newItemValue, setNewItemValue, dispatch) {
  if (newItem === true) {

    return <form onSubmit={(e) => {
      e.preventDefault();
      if (newItemValue) {
        var data = {};
        data.categoryname = newItemValue;
        dispatch(addCategory(data));
        setNewItemValue('');
        setNewItem(false);
      }
    }}>
      <div style={{ display: 'flex', flex: '1', flexDirection: "column", height: '200px', background: '#F3FCFF', padding: '30px' }}>
        <span style={{ padding: '0px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', marginBottom: '10px' }}>Δώστε το όνομα της νεάς κατηγορίας</span>
        <input
          type='text'
          value={newItemValue}
          style={{ padding: '20px', fontSize: '20px' }}
          onChange={(e) => setNewItemValue(e.target.value)}
        />
        <span style={{ margin: '20px' }}></span>
        <div>
          <input
            type='submit'
            value="Αποθήκευση"
            style={{ fontSize: '18px', textAlign: 'center', padding: '10px', margin: '10px', background: 'lightgreen' }}
          />
          <input
            type='button'
            value="Ακύρωση"
            style={{ fontSize: '18px', textAlign: 'center', padding: '10px', margin: '10px', background: 'orangered' }}
            onClick={() => { setNewItem(false); }}
          />
        </div>
      </div>
    </form>
  }
}

export default function Categories(props) {

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const dispatch = useDispatch();  
  
  const { opencategories } = useSelector(state => ({ opencategories: state.parametricdata_reducer.opencategories }));
  const { categoriesList } = useSelector(state => ({ categoriesList: state.parametricdata_reducer.categoriesList }));
  const [newItem, setNewItem] = useState(false);
  const [newItemValue, setNewItemValue] = useState('');
  const [editItems, setEditItems] = useState([]);
  const [itemBeforeEdit, setItemBeforeEdit] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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
      <div style={{ background: '#0b0647', color: 'white', flex: 0.05, fontSize: '2.5rem' }}>{categoriesList?.length} Κατηγορίες</div>
      <div style={{ overflowY: 'scroll', flex: 0.9, background: '#eeedfc' }}>
        {renderCategoriesList(dispatch, editItems, setEditItems, itemBeforeEdit, setItemBeforeEdit, categoriesList, setOpenDeleteDialog)}
      </div>
      {renderNewCategoryForm(newItem, setNewItem, newItemValue, setNewItemValue, dispatch)}
      <div style={{ flex: 0.05, backgroundColor: '#bebec2' }}>
        <Button
          disabled={false}
          style={{ fontSize: '18px', textAlign: 'center' }}
          onClick={() => { setNewItem(true); }}>
          ΠΡΟΣΘΗΚΗ
        </Button>
      </div>      
      <MyDialog openDialog={openDeleteDialog} setOpenDialog={setOpenDeleteDialog} />
    </div>
}