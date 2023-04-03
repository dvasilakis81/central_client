import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { InputAdornment, IconButton } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: '2px solid blue'
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "2px solid blue",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: '1px solid blue'
    },
    "& .MuiInputBase-input": {
      fontSize: '1rem',
      fontColor: 'blue'
    },
    "& .MuiSvgIcon-root": {
      width: '2rem',
      height: '2rem'
    },
    "& .MuiFormLabel-root": {
      fontSize: '1rem',
      fontWeight: 'bolder'
    }
  }
});

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
