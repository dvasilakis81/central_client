import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, IconButton } from '@material-ui/core';
import store from '../../Redux/Store/store';
import { searchBarStyles } from '../Styles/styles';
import { searchPhoneCatalogInfo } from '../../Redux/Actions/index';
import { showFailedConnectWithServerMessage } from '../Common/methods';
import { ignoreTonousAndLowercase } from '../../Helper/helpermethods';

export default function ServicesSearchBar() {
  const dispatch = useDispatch();
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
  var searchBarSize = 'medium';
  if (window.innerWidth <= 1366)
    searchBarSize = 'small';

  return (<TextField
    label='Αναζήτηση Υπηρεσιών, Αρχείων, Επαφών'
    type='text'
    size={searchBarSize}
    variant='outlined'
    style={{
      width: searchBarWidth,
      background: 'none',
      fontWeight: 'bold',
      fontSize: '32px'
    }}
    value={searchValue}
    onChange={(e) => {
      var localSearchValue = e.target.value;
      store.dispatch({ type: 'SET_SEARCH_VALUE', payload: e.target.value })
      if (localSearchValue && localSearchValue.length > 2) {
        var data = {};
        data.searchfield = -1;
        data.searchtext = ignoreTonousAndLowercase(localSearchValue);
        dispatch(searchPhoneCatalogInfo(data)).then(response => {
          //showSnackbarMessage(response, 'Eγινε επιτυχώς!');
        }).catch(error => {
          showFailedConnectWithServerMessage(error);
        });
      } else
        store.dispatch({ type: 'SET_SEARCH_PHONECATALOGINFO', payload: [] })
    }}
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