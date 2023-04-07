import { TextField } from '@material-ui/core';
import store from '../../Redux/Store/store';
import { useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, IconButton } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: '2px solid blue'
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      border: "1px solid blue",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: '4px solid blue'
    },
    "& .MuiInputBase-input": {
      fontSize: '24px'
    },
    "& .MuiSvgIcon-root": {
      width: '2rem',
      height: '2rem'
    },
    "& .MuiFormLabel-root": {
      fontSize: '18px',
      fontWeight: 'bolder'
    }
  }
});

export default function ServicesSearchBar() {
  const classes = useStyles();
  const { searchValue } = useSelector(state => ({ searchValue: state.parametricdata_reducer.searchValue }));
  const handleChangeSearchValue = (e) => {   
    store.dispatch({ type: 'SET_SEARCH_VALUE', payload: e.target.value })
  };

  return (
    <TextField
      label="Αναζήτηση"
      type="text"
      variant="outlined"
      value={searchValue || ''}
      style={{ width: 700, background: 'none', fontWeight: 'bold', opacity: 0.7, fontSize: '43px' }}
      onChange={handleChangeSearchValue}
      className={classes.root}
      inputProps={{ className: classes.root }}
      InputProps={{
        startAdornment: (<InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>),
        endAdornment: (<InputAdornment position="end">
          <IconButton sx={{ visibility: searchValue ? "visible" : "hidden" }} onClick={handleChangeSearchValue}>
            <CancelIcon style={{ width: '30px' }} />
          </IconButton>
        </InputAdornment>)
      }}
    />
  );
}