import {useState, useEffect} from 'react';
import { TextField } from '@material-ui/core';
import store from '../../Redux/Store/store';
import { useSelector } from 'react-redux';
import CancelIcon from '@material-ui/icons/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, IconButton } from '@material-ui/core';
import { searchBarStyles } from '../Styles/styles';

export default function ServicesSearchBar() {
  const classes = searchBarStyles();
  const { searchValue } = useSelector(state => ({ searchValue: state.parametricdata_reducer.searchValue }));
  const [searchBarWidth, setSearchBarWidth] = useState('800px');

  const updateSearchBarSize = () => {
    const width = window.innerWidth;
    if (width > 1000)
      setSearchBarWidth(width * 0.6);
    else 
      setSearchBarWidth(width * 1 - 300);
  }

  useEffect(() => {

    updateSearchBarSize();
    window.addEventListener("resize", updateSearchBarSize);
    return () =>
      window.removeEventListener("resize", updateSearchBarSize);
  }, []);

  return (<TextField
    label="Αναζήτηση"
    type="text"
    variant='outlined'
    style={{
      width: searchBarWidth,
      background: 'none',
      fontWeight: 'bold',
      fontSize: '43px'
    }}
    value={searchValue}
    onChange={(e) => { store.dispatch({ type: 'SET_SEARCH_VALUE', payload: e.target.value }) }}
    className={classes.root}
    inputProps={{ className: classes.root }}
    InputProps={{
      startAdornment: (<InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>),
      endAdornment: (<InputAdornment position="end">
        <IconButton sx={{ visibility: searchValue ? "visible" : "hidden" }}
          onClick={(e) => { store.dispatch({ type: 'SET_SEARCH_VALUE', payload: e.target.value || '' }) }}>
          <CancelIcon style={{ width: '30px' }} />
        </IconButton>
      </InputAdornment>)
    }}
  />);
}