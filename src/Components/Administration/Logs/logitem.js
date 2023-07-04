import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterValue, getDateFormat } from '../../../Helper/helpermethods';
import { getAdminItemStyle } from '../../Common/styles';

function changeSelectedItem(dispatch, props, item) {
  if (props.isSearchMode === true)
    dispatch({ type: 'SEARCH_MODE_LOGITEM_DETAIL', payload: item });
  else
    dispatch({ type: 'SET_LOGITEM_DETAIL', payload: item });
}

export default function MediaItem(props) {
  const dispatch = useDispatch();
  const [hoveredKey, setHoveredKey] = useState('');
  const handleMouseEnter = (e, d) => { setHoveredKey(d); };
  const handleMouseLeave = () => { setHoveredKey(''); };

  const item1 = props.item;
  const selecteditem = props.selecteditem;
  var itemStyle = getAdminItemStyle(item1, selecteditem, hoveredKey);

  var fields = [];
  fields.push(item1.Message);
  fields.push(item1.SqlMessage);

  if (filterValue(fields, props.searchValue || '') === true) {
    return <div id={item1.Id}
      onMouseEnter={(e) => handleMouseEnter(e, item1.Id)}
      onMouseLeave={handleMouseLeave}
      onClick={() => { changeSelectedItem(dispatch, props, item1); }}>
      <div className={itemStyle} style={{ padding: '15px', display: 'flex', flexDirection: 'column', margin: '1px' }}>
        <div>{item1.Code || item1.Message}</div>
        <div>{getDateFormat(item1.Created)}</div>
      </div>
    </ div >
  }
}