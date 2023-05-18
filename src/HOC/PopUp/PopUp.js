import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { getScreenWidth, getScreenHeight } from '../../Helper/helpermethods';
import store from '../../Redux/Store/store';
import { useSelector } from 'react-redux';

export default function PopUp(props) {
  const divRef = useRef(null);
  const { divPosition } = useSelector(state => ({ divPosition: state.parametricdata_reducer.divPosition }));
  const { openPopUp } = useSelector(state => ({ openPopUp: state.parametricdata_reducer.openPopUp }));

  // useOutsideAlerter(divRef);
  useEffect(() => {

    function handleClickOutside(event) {
      //event.preventDefault();
      if (event && divRef.current) {
        if (event.clientX < divRef.current.offsetLeft || event.clientX > divRef.current.offsetLeft + divRef.current.offsetWidth) {          
          store.dispatch({ type: 'SET_SELECTED_CATEGORY_WITH_SUBCATEGORIES', payload: undefined });
          store.dispatch({ type: 'CLOSE_POP_UP', payload: true });
        }
      }
      // if (divRef.current && !divRef.current.contains(event.target)) {
      //   event.preventDefault();
      //   store.dispatch({ type: 'SET_SELECTED_CATEGORY_WITH_SUBCATEGORIES', payload: undefined });
      //   store.dispatch({ type: 'CLOSE_POP_UP', payload: true });
      // }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [divRef]);

  return (openPopUp === true ?
    <div
      ref={divRef}
      style={{
        position: 'absolute',
        width: getScreenWidth() / 6,
        height: getScreenHeight() / 2,
        left: divPosition?.left,
        top: divPosition?.top,
        border: '1px solid #00001B',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1
      }}>
      <div style={{ background: 'darkblue', color: 'white', flex: 0.05, fontSize: '1.5rem', textAlign: 'center' }}>
        Διευθύνσεις
      </div>
      <div style={{ overflowY: 'scroll', flex: 0.95, background: '#eeedfc' }}>
        {props.children}
      </div>
    </div>
    : <></>)
}    
