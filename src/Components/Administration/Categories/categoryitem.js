import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterValue } from '../../../Helper/helpermethods';
import { getAdminItemStyle } from '../../Common/styles';

function changeSelectedItem(dispatch, props, item) {
  dispatch({ type: 'SET_CATEGORYITEM_DETAIL', payload: item });
}

export default function CategoryItem(props) {
  const dispatch = useDispatch();
  const [hoveredKey, setHoveredKey] = useState('');
  const handleMouseEnter = (e, d) => { setHoveredKey(d); };
  const handleMouseLeave = () => { setHoveredKey(''); };

  const item = props.item;
  const selecteditem = props.selecteditem;
  var itemStyle = getAdminItemStyle(item, selecteditem, hoveredKey);

  var fields = [];
  fields.push(item.Name);

  if (filterValue(fields, props.searchValue || '') === true)
    return <div id={item.Id}
      onMouseEnter={(e) => handleMouseEnter(e, item.Id)}
      onMouseLeave={handleMouseLeave}
      onClick={() => { changeSelectedItem(dispatch, props, item); }}
      style={{ padding: '5px' }}>
      <div className={itemStyle}>{item.Name}</div>
    </ div >
}