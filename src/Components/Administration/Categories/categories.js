import React, { useState, useRef, useEffect } from "react";
import { useSelector } from 'react-redux';

import Popover from '@material-ui/core/Popover';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';

import store from '../../../Redux/Store/store';
import { getScreenWidth, getScreenHeight } from '../../../Helper/helpermethods';
import { Button } from '@material-ui/core';

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

function renderItem(item, editItems, setEditItems, index) {
  var editMode = false;
  for (var i = 0; i < editItems.length; i++) {
    if (editItems[i].Id === item.Id) {
      editMode = true;
      break;
    }
  }

  if (editMode === true)
    return <>
      {/* <div style={{ flex: 0.95, justifyContent: 'flex-start' }}>{item.Name}</div> */}
      <input type='text' value={item.Name}></input>
      <Button variant="contained"
        style={{ margin: '5px', background: 'blue', textTransform: 'none', fontSize: '16px' }}
        disabled={false}
        onClick={() => {
          console.log('save')
        }}>
        <SaveIcon />
      </Button>
      <Button
        variant="contained"
        style={{ margin: '5px', background: 'red', textTransform: 'none', fontSize: '16px' }}
        disabled={false}
        onClick={() => {
          setEditItems([]);
          console.log('cancel')
        }}>
        <CancelIcon />
      </Button></>
  else {
    if (editItems.length > 0)
      return <div style={{ flex: 0.95, justifyContent: 'flex-start' }}>{item.Name}</div>
    else
      return <><div style={{ flex: 0.95, justifyContent: 'flex-start' }}>{item.Name}</div>
        <Button variant="contained"
          style={{ margin: '5px', background: '#17d3cd', textTransform: 'none', fontSize: '16px' }}
          disabled={false}
          onClick={() => {
            //editItems.push(item);
            setEditItems([...editItems, item]);
          }}>
          <EditIcon />
        </Button>
        {/* {renderActionButton(item, editItems, setEditItems)} */}
        <Button variant="contained"
          style={{ margin: '5px', background: '#17d3cd', textTransform: 'none', fontSize: '16px' }}
          disabled={false}
          onClick={() => { console.log('') }}>
          <DeleteIcon />
        </Button></>
  }
  // return <><div style={{ flex: 0.95 }}>{item.Name}</div>
  //   <Button variant="contained"
  //     style={{ margin: '5px', background: '#17d3cd', textTransform: 'none', fontSize: '16px' }}
  //     disabled={false}
  //     onClick={() => {
  //       //editItems.push(item);
  //       setEditItems([...editItems, item]);
  //     }}>
  //     <EditIcon />
  //   </Button>
  //   {/* {renderActionButton(item, editItems, setEditItems)} */}
  //   <Button variant="contained"
  //     style={{ margin: '5px', background: '#17d3cd', textTransform: 'none', fontSize: '16px' }}
  //     disabled={false}
  //     onClick={() => { console.log('') }}>
  //     <DeleteIcon />
  //   </Button>
  // </>
}

function renderActionButton(item, editItems, setEditItems) {
  var editMode = false;
  for (var i = 0; i < editItems.length; i++) {
    if (editItems[i].Id === item.Id) {
      editMode = true;
      break;
    }
  }


}
function renderCategoriesList(editItems, setEditItems, categoriesList) {
  return categoriesList.map((item, index) => {
    return <div style={{ display: 'flex', flex: 1, flexDirection: 'row', fontSize: '1.5rem', padding: '10px', background: 'lightgray' }}>
      {renderItem(item, editItems, setEditItems, index)}
    </div>
  })
}
export default function Categories() {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const { opencategories } = useSelector(state => ({ opencategories: state.parametricdata_reducer.opencategories }));
  const { categoriesList } = useSelector(state => ({ categoriesList: state.parametricdata_reducer.categoriesList }));
  const [editItems, setEditItems] = useState([]);

  if (opencategories === true)
    return <div
      ref={wrapperRef}
      style={{
        width: getScreenWidth() / 2, height: getScreenHeight() / 2,
        position: 'absolute',
        left: getScreenWidth() / 4,
        right: getScreenHeight() / 2,
        margin: '0 auto',
        zIndex: 5,
        border: '5px solid #00001B',
        display: 'flex',
        flexDirection: 'column'
      }}>
      <div style={{ background: 'white', flex: 0.05, fontSize: '1.5rem' }}>{categoriesList?.length} Κατηγορίες</div>
      <div style={{ overflowY: 'scroll', flex: 0.9, background: 'white', zIndex: 10000 }}>
        {renderCategoriesList(editItems, setEditItems, categoriesList)}
      </div>
      <div style={{ flex: 0.05 }}>
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