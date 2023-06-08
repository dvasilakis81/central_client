import { TextField } from '@material-ui/core';
import store from '../../Redux/Store/store';
import { useSelector } from 'react-redux';
import CancelIcon from '@material-ui/icons/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, IconButton } from '@material-ui/core';
import { searchBarStyles } from '../Administration/Styles/styles';

export default function ServicesSearchBar() {
  const classes = searchBarStyles();
  const { searchValue } = useSelector(state => ({ searchValue: state.parametricdata_reducer.searchValue }));

  return (<TextField
    label="Αναζήτηση"
    type="text"
    variant='outlined'
    style={{ width: '800px', background: 'none', fontWeight: 'bold', fontSize: '43px' }}
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