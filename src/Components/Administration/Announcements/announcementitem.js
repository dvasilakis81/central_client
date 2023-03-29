import React, { useState } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
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
    dispatch({ type: 'SET_ANNOUNCEMENTITEM_DETAIL', payload: item });
}

export default function AnnouncementItem(props) {
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
  let listItemStyle = (item1.Id !== selecteditem.Id ? styles.tableStyle1 : styles.tableStyle2);
  if (hoveredKey && hoveredKey !== selecteditem.Id)
    listItemStyle = styles.itemHovered;

  return <div id={item1.Id}
    onMouseEnter={(e) => handleMouseEnter(e, item1.Id)}
    onMouseLeave={handleMouseLeave}
    onClick={() => { changeSelectedItem(dispatch, props, item1); }}
    style={{ padding: '5px'}}>
    <Grid item style={{ flexGrow: '1', border: '1px solid black'}}>
      <Paper square={true} style={listItemStyle}>
        <Typography>
          <div>{item1.Description}</div>
        </Typography>
      </Paper>
    </Grid>
  </ div >
}