import React, { useState } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
//import styles from './styles.css';

const styles = {
  tableStyle1: {
    tableLayout: 'fixed',
    fontSize: '22px',
    cursor: 'unset',
    fontWeight: 'bold',
    color: 'white',
    background: 'darkblue',
    marginLeft: '5px',
    textAlign: 'center'
  },
  tableStyle2: {
    tableLayout: 'fixed',
    fontSize: '16px',
    background: 'lightblue',
    cursor: 'unset',
    marginLeft: '5px',
    textAlign: 'center'
  },
  itemHovered: {
    tableLayout: 'fixed',
    background: 'lightblue',
    fontSize: '16px',
    cursor: 'pointer',
    marginLeft: '5px',
    textAlign: 'center'
  }
};

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
  const handleMouseEnter = (e, d) => {
    setHoveredKey(d);
  };
  const handleMouseLeave = () => {
    setHoveredKey('');
  };

  const item1 = props.item;
  const selecteditem = props.selecteditem;
  let listItemStyle;
  if (hoveredKey && hoveredKey !== selecteditem.Id)
    listItemStyle = styles.itemHovered;
  else {
    if (item1.Id !== selecteditem.Id)
      listItemStyle = styles.tableStyle1;
    else
      listItemStyle = styles.tableStyle2;
  }

  if ((props.itemtype === 1 && item1.MenuItem === 1) || (props.itemtype === 2 && item1.ServiceItem === 1)) {
    //console.log('selected: ' + item1.Id + listItemStyle.background);
    return <div id={item1.Id}
      onMouseEnter={(e) => handleMouseEnter(e, item1.Id)}
      onMouseLeave={handleMouseLeave}
      onClick={() => { changeSelectedItem(dispatch, props, item1); }}
      style={{ padding: '5px' }}>
      <Grid item style={{ flexGrow: '1' }}>
        <Paper square={true} style={listItemStyle}>
          <Typography>
            <div style={{ background: listItemStyle.background }}>{item1.Name}</div>
          </Typography>
        </Paper>
      </Grid>
    </ div >
  }
}