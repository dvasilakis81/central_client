import React from 'react';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { InputAdornment, IconButton } from '@material-ui/core';
import { useStyles } from '../../Styles/styles';

export default function SearchBar(props) {
  const classes = useStyles();

  return <TextField
    label="Αναζήτηση"
    type="text"
    variant="outlined"
    value={props.searchValue || ''}
    style={{ width: 'auto', background: 'none', fontWeight: 'bold', opacity: 0.7, fontSize: '1rem', margin: '10px' }}
    onChange={props.handleChangeSearchValue}
    className={classes.root}
    inputProps={{ className: classes.root }}
    InputProps={{
      startAdornment: (<InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>),
      endAdornment: (<InputAdornment position="end">
        <IconButton sx={{ visibility: props.searchValue ? "visible" : "hidden" }} onClick={props.handleChangeSearchValue}>
          <CancelIcon style={{ width: '30px' }} />
        </IconButton>
      </InputAdornment>)
    }}
  />
}
