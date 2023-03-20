import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function CustomizedInputBase() {
  return (
    <Paper component="form" sx={{ display: 'flex', alignItems: 'center', width: 800, background: 'white', border: '1px solid black', borderRadius: '10px' }}>
      {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton> */}
      <Divider sx={{ height: 18, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: '16px'}}>
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 4, flex: 1 }}
        placeholder="Αναζήτηση Υπηρεσιών"
        style={{ fontSize: 18 }}
        size="small"
        inputProps={{ 'aria-label': 'Αναζήτηση Υπηρεσιών' }}
      />
    </Paper>
  );
}
