import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterValue } from '../../../Helper/helpermethods';
import { getAdminItemStyle } from '../../Common/styles';

function changeSelectedItem(dispatch, props, item) {
  if (props.isSearchMode === true)
    dispatch({ type: 'SEARCH_MODE_PAGEITEM_DETAIL', payload: item });
  else
    dispatch({ type: 'SET_PAGEITEM_DETAIL', payload: item });
}

export default function PageItem(props) {
  const dispatch = useDispatch();
  const [hoveredKey, setHoveredKey] = useState('');
  const handleMouseEnter = (e, d) => { setHoveredKey(d); };
  const handleMouseLeave = () => { setHoveredKey(''); };

  const item = props.item;
  const selecteditem = props.selecteditem;

  var itemStyle = getAdminItemStyle(item, selecteditem, hoveredKey);

  var fields = [];
  fields.push(item.Title);
  fields.push(item.Url);

  if (filterValue(fields, props.searchValue || '') === true) {
    return <div id={item.Id}
      onMouseEnter={(e) => handleMouseEnter(e, item.Id)}
      onMouseLeave={handleMouseLeave}
      onClick={() => { changeSelectedItem(dispatch, props, item); }}
      style={{ padding: '5px' }}>
      <div className={itemStyle}>{item.Title}</div>
    </div>
  }
}