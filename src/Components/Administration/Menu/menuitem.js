import React, { useState } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { filterValue } from '../../../Helper/helpermethods';
import { getAdminItemStyle } from '../../Common/styles';

function changeSelectedItem(dispatch, props, item) {
  if (props.isSearchMode === true)
    dispatch({ type: 'SEARCH_MODE_MENUITEM_DETAIL', payload: item });
  else {
    if (props.itemtype === 1)
      dispatch({ type: 'SET_MENUITEM_DETAIL', payload: item });
    else
      dispatch({ type: 'SET_SERVICEITEM_DETAIL', payload: item });
  }
}

export default function MenuItem(props) {
  const dispatch = useDispatch();
  const [hoveredKey, setHoveredKey] = useState('');
  const handleMouseEnter = (e, d) => { setHoveredKey(d); };
  const handleMouseLeave = () => { setHoveredKey(''); };

  const item1 = props.item;
  const selecteditem = props.selecteditem;
  var itemStyle = getAdminItemStyle(item1, selecteditem, hoveredKey);

  var fields = [];
  fields.push(item1.Name);

  if (((props.itemtype === 1 && item1.MenuItem === 1) || (props.itemtype === 2 && item1.ServiceItem === 1)) && filterValue(fields, props.searchValue || '') === true) {
    return <div id={item1.Id}
      onMouseEnter={(e) => handleMouseEnter(e, item1.Id)}
      onMouseLeave={handleMouseLeave}
      onClick={() => { changeSelectedItem(dispatch, props, item1); }}
      style={{ padding: '5px' }}>
      <div className={itemStyle}>{item1.Name}</div>
    </ div >
  }
}