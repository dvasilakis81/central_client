import React, { useState } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { filterValue } from '../../../Helper/helpermethods';
import { getAdminItemStyle } from '../../Common/styles';

function changeSelectedItem(dispatch, props, item) {
  dispatch({ type: 'SET_ANNOUNCEMENTITEM_DETAIL', payload: item });
}

export default function AnnouncementItem(props) {
  const dispatch = useDispatch();
  const [hoveredKey, setHoveredKey] = useState('');
  const handleMouseEnter = (e, d) => { setHoveredKey(d); };
  const handleMouseLeave = () => { setHoveredKey(''); };

  const item = props.item;
  const selecteditem = props.selecteditem;
  var itemStyle = getAdminItemStyle(item, selecteditem, hoveredKey);

  var fields = [];
  fields.push(item.Description);

  if (filterValue(fields, props.searchValue || '') === true)
    return <div id={item.Id}
      onMouseEnter={(e) => handleMouseEnter(e, item.Id)}
      onMouseLeave={handleMouseLeave}
      onClick={() => { changeSelectedItem(dispatch, props, item); }}
      style={{ padding: '5px' }}>
      <div className={itemStyle}>{item.Title}</div>
    </ div >
}