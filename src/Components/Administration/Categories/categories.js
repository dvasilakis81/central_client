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
import MyDialog from '../../Common/dialog'

import { deleteItem } from '../../../Redux/Actions/index';

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

export default function Categories(props) {

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const dispatch = useDispatch();

  const { opencategories } = useSelector(state => ({ opencategories: state.parametricdata_reducer.opencategories }));
  const { categoriesList } = useSelector(state => ({ categoriesList: state.parametricdata_reducer.categoriesList }));
  const [newItem, setNewItem] = useState(false);
  const [newItemValue, setNewItemValue] = useState('');
  const [editItems, setEditItems] = useState([]);
  const [deleteItems, setDeleteItems] = useState([]);
  const [itemBeforeEdit, setItemBeforeEdit] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [checkedHasSubCategories, setCheckedHasSubCategories] = React.useState(false);
  const [checkedIsSubCategory, setCheckedIsSubCategory] = React.useState(false);
  const [parentCategory, setParentCategory] = React.useState(0);
  const [itemToDelete, setItemToDelete] = useState(null);

  function renderItem(item, index) {
    var editMode = false;
    var deleteMode = false;

    if (editItems && editItems.length > 0) {
      if (editItems[0].Id === item.Id)
        editMode = true;
    }
    if (deleteItems && deleteItems.length > 0) {
      if (deleteItems[0].Id === item.Id)
        deleteMode = true;
    }
    if (editMode === true) {
      return <>
        {/* <div style={{ flex: 0.95, justifyContent: 'flex-start' }}>{item.Name}</div> */}
        <div style={{ display: 'flex', flexDirection: 'column', margin: '10px', background: 'white', justifyContent: 'center', alignItems: 'center' }}>

          <input style={{ textAlign: 'center', fontSize: '20px', marginTop: '20px', margin: '10px', padding: '10px', width: 'auto' }} type='text' value={item.Name} onChange={(e) => {
            var updatedCategoryItem = { val: e.target.value, Id: item.Id }
            store.dispatch({ type: 'UPDATE_CATEGORY_LIST_ITEM', payload: updatedCategoryItem })
          }} />

          <div style={{ textAlign: 'left', alignSelft: 'left', fontSize: '20px', marginLeft: '10px' }}>
            <input type="checkbox" style={{ width: '30px', height: '30px' }} checked={checkedHasSubCategories} onChange={(e) => {
              setCheckedHasSubCategories(!checkedHasSubCategories);
            }} />
            <label style={{ marginLeft: '10px' }}>Έχει υποκατηγορίες?</label>
          </div>

          <div style={{ textAlign: 'left', alignSelft: 'left', fontSize: '20px', display: 'flex', flexDirection: 'row', flex: 1, marginLeft: '10px' }}>
            <div>
              <input type="checkbox" style={{ width: '30px', height: '30px' }} checked={checkedIsSubCategory} onChange={(e) => {
                setCheckedIsSubCategory(!checkedIsSubCategory);
              }} />
              <label style={{ marginLeft: '10px' }}>  Είναι υποκατηγορία?</label>
            </div>
            {renderSelectCategories()}
          </div>
        </div>
        <Button variant="contained"
          style={{
            margin: '5px',
            background: 'blue',
            textTransform: 'none',
            fontSize: '16px',
            color: 'white',
            height: '70px',
            alignSelf: 'center'
          }}
          disabled={false}
          onClick={() => {

            var data = {};
            if (checkedIsSubCategory === true) {
              if (parentCategory === 0) {
                if (categoriesList) {
                  for (var i = 0; i < categoriesList.length; i++) {
                    if (categoriesList[i].HasSubCategories === 1) {
                      data.parentid = categoriesList[i].Id;
                      break;
                    }
                  }
                }
              } else
                data.parentid = parentCategory;
            }
            else
              data.parentid = 0;

            data.id = item.Id;
            data.hassubcategories = checkedHasSubCategories ? 1 : 0;
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
            color: 'white',
            height: '70px',
            alignSelf: 'center'
          }}
          disabled={false}
          onClick={() => {
            setEditItems([]);
            store.dispatch({ type: 'UPDATE_CATEGORY_LIST_ITEM', payload: { val: itemBeforeEdit, Id: item.Id } })
            return item;
          }}>
          <CancelIcon />
        </Button>
      </>
    } else if (deleteMode === true)
      return <>
        {/* <div style={{ flex: 0.95, justifyContent: 'flex-start' }}>{item.Name}</div> */}
        {/* <input style={{ flex: 0.95, textAlign: 'center', fontSize: '20px' }} type='text' value={item.Name} onChange={(e) => {
          var updatedCategoryItem = { val: e.target.value, Id: item.Id }
          store.dispatch({ type: 'UPDATE_CATEGORY_LIST_ITEM', payload: updatedCategoryItem })
        }} /> */}
        <div style={{ flex: 0.95, justifyContent: 'flex-start' }}>Θέλετε να διαγράψετε την κατηγορία {item.Name}?</div>
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
            data.kind = 5;
            data.name = item.Name;
            dispatch(deleteItem(data));
            setDeleteItems([]);
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
            setDeleteItems([])
            //store.dispatch({ type: 'UPDATE_CATEGORY_LIST_ITEM', payload: { val: itemBeforeEdit, Id: item.Id } })
            //return item;
          }}>
          <CancelIcon />
        </Button>
      </>
    else {
      return <>
        <div style={{ flex: 0.95 }}>{item.Name}</div>
        <>
          <Button variant="contained"
            style={{ margin: '5px', background: '#17d3cd', textTransform: 'none', fontSize: '16px' }}
            disabled={editItems && editItems.length > 0 ? true : false}
            onClick={() => {
              setParentCategory(0);
              setCheckedHasSubCategories(item.HasSubCategories);
              setCheckedIsSubCategory(item.ParentId > 0 ? true : false);

              setEditItems([...editItems, item]);
              var initialItemName = item.Name;
              setItemBeforeEdit(initialItemName);
            }}>
            <EditIcon />
          </Button>
          <Button variant="contained"
            style={{ margin: '5px', background: '#17d3cd', textTransform: 'none', fontSize: '16px' }}
            disabled={item.candelete === true ? false : true}
            onClick={() => {
              setDeleteItems([...deleteItems, item]);
              //setItemToDelete(item);
              //setOpenDeleteDialog(true);
            }}>
            <DeleteIcon />
          </Button>
        </>
      </>
    }
  }
  function renderCategoriesList() {
    return categoriesList && categoriesList.map((item, index) => {
      return <div style={{ display: 'flex', flex: 1, flexDirection: 'row', fontSize: '1.5rem', padding: '10px' }}>
        {renderItem(item, index)}
      </div>
    })
  }
  function renderSelectOptions() {

    return categoriesList.map((item, index) => {
      if (item.HasSubCategories === 1) {
        // if (item.ParentId === parentCategory)
        //   return <option style={{ fontSize: '16px', padding: '10px' }} value={item.ParentId} >{item.Name}</option>;
        // else
        return <option style={{ fontSize: '16px', padding: '10px' }} value={item.Id}>{item.Name}</option>;
      }
    })
  }
  function renderSelectCategories() {
    if (checkedIsSubCategory === true)
      return <div style={{ textAlign: 'left' }}>
        <label style={{ fontSize: '22px' }} for="categories"> Ανήκει στην:</label>
        <select
          onChange={(e) => { setParentCategory(e.target.value); }}
          style={{ width: '200px', height: '30px', fontSize: '20px', margin: '10px', marginLeft: '10px' }}
          name="categories"
          id="categories">
          {renderSelectOptions()}
        </select>
      </div>
  }
  function renderNewCategoryForm() {

    if (newItem === true) {

      return <form onSubmit={(e) => {
        e.preventDefault();
        if (newItemValue) {
          var pCategory = parentCategory;
          if (pCategory === 0) {
            if (categoriesList) {
              for (var i = 0; i < categoriesList.length; i++) {
                if (categoriesList[i].HasSubCategories === 1) {
                  pCategory = categoriesList[i].Id;
                  break;
                }
              }
            }
          }

          var data = {};
          data.hassubcategories = checkedHasSubCategories ? 1 : 0;
          data.parentid = pCategory;
          data.categoryname = newItemValue;
          dispatch(addCategory(data));
          setNewItemValue('');
          setNewItem(false);
        }
      }}>
        <div style={{ display: 'flex', flex: '1', flexDirection: "column", height: '300px', background: '#F3FCFF', padding: '30px', overflowY: 'scroll' }}>
          <span style={{ padding: '0px', fontSize: '20px', fontWeight: 'bold', textAlign: 'left', marginBottom: '10px' }}>Δώστε το όνομα της νεάς κατηγορίας</span>
          <input
            type='text'
            value={newItemValue}
            style={{ padding: '20px', fontSize: '20px' }}
            onChange={(e) => setNewItemValue(e.target.value)}
          />
          <span style={{ margin: '20px' }}></span>
          <div style={{ textAlign: 'left', alignSelft: 'left', fontSize: '30px' }}>
            <input type="checkbox" style={{ width: '30px', height: '30px' }} checked={checkedHasSubCategories} onChange={(e) => {
              setCheckedHasSubCategories(!checkedHasSubCategories)
            }} />
            <label for="coding" style={{ marginLeft: '10px' }}>Έχει υποκατηγορίες?</label>
          </div>
          <div style={{ textAlign: 'left', alignSelft: 'left', fontSize: '30px', display: 'flex', flexDirection: 'row', flex: 1 }}>
            <div>
              <input type="checkbox" style={{ width: '30px', height: '30px' }} checked={checkedIsSubCategory} onChange={(e) => {
                setCheckedIsSubCategory(!checkedIsSubCategory)
              }} />
              <label for="coding" style={{ marginLeft: '10px' }}>  Είναι υποκατηγορία?</label>
            </div>
            {renderSelectCategories()}
          </div>
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
              onClick={() => {
                setCheckedHasSubCategories(false);
                setCheckedIsSubCategory(false);
                setNewItem(false);
              }}
            />
          </div>
        </div>
      </form>
    }
  }
  if (opencategories === true)
    return <div
      ref={wrapperRef}
      style={{
        width: '90%',
        height: '80%',
        position: 'absolute',
        left: getScreenWidth() / 8,
        margin: '0 auto',
        border: '5px solid #00001B',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1
      }}>
      <div style={{ background: '#0b0647', color: 'white', flex: 0.05, fontSize: '2.5rem' }}>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
          <div style={{ flex: 0.9 }}>
            {categoriesList?.length} Κατηγορίες
          </div>
          <div style={{ flex: 0.1 }}>
          </div>
        </div>
      </div>
      <div style={{ overflowY: 'scroll', flex: 0.9, background: '#eeedfc' }}>
        {renderCategoriesList()}
      </div>
      {renderNewCategoryForm()}
      <div style={{ flex: 0.05, backgroundColor: 'white' }}>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
          <div style={{ flex: 0.9 }}>
            <Button
              disabled={false}
              style={{ fontSize: '26px', textAlign: 'center', border: '2px solid green', margin: '10px', color: 'green', fontWeight: 'bold' }}
              onClick={() => { setNewItem(true); }}>
              ΠΡΟΣΘΗΚΗ
            </Button>
          </div>
          <div style={{ flex: 0.1 }}>
          </div>
        </div>
      </div>
      <MyDialog openDialog={openDeleteDialog} setOpenDialog={setOpenDeleteDialog} itemToDelete={itemToDelete} />
    </div >
}