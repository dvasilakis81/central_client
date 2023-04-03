import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getMenuItems } from '../../Redux/Actions/index';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import { InputAdornment, IconButton } from '@material-ui/core';
import { getHostUrl } from '../../Helper/helpermethods';
import { includeStrings } from '../../Helper/helpermethods';

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

function ServicesMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [hoveredKey, setHoveredKey] = useState('');
  const [searchValue, setSearchValue] = useState('');
  let navigate = useNavigate();

  const handleChangeSearchValue = (e) => { setSearchValue(e.target.value); };
  const handleMouseEnter = (e, d) => { setHoveredKey(d); };
  const handleMouseLeave = () => { setHoveredKey(''); };
  const { menuItemsList } = useSelector(state => ({ menuItemsList: state.menu_reducer.menuItemsList }));

  useEffect(() => { dispatch(getMenuItems()); }, []);

  function getBackgroundColor(item) {
    var ret = '#9DD8EA';

    if (hoveredKey === item)
      ret = '#2196F3';
    else {
      if (item.Announce === 1) {
        //ret = 'linear-gradient(110.4deg, rgb(247, 112, 15) 6.4%, rgb(248, 50, 88) 100.2%);';
        ret = '#ffa590';
      }
      else
        ret = '#9DD8EA';
    }

    return ret;
  }
  function getItems(searchValue) {

    var itemsList = menuItemsList;
    // if (searchList && searchList.length > 0)
    //   itemsList = searchList;
    return (itemsList && itemsList.map(d => (
      d.Hidden === 0 && d.ServiceItem === 1 && includeStrings(d.Name, searchValue) === true ?
      <div
        className="menuItem"
        onMouseEnter={(e) => handleMouseEnter(e, d)}
        onMouseLeave={handleMouseLeave}
        onClick={() => { d.Url ? window.open(d.Url, '_blank', 'noreferrer') : (d.PageUrl ? navigate(d.PageUrl) : console.log('asdf')) }}
        style={{ background: getBackgroundColor(d) }}>
        {d.ImageService ? <div style={{ flex: 0.3 }}>
          <img src={getHostUrl() + d.ImageService} />
        </div> : <></>}
        <div style={{ flex: 0.7 }}>
          {d.Name}
        </div>
      </div> :
      <></>)))
  }

  //const TextFieldWrapper = styled(TextField)`fieldset {border-radius: 50px;'}`;  
  return (
    //backgroundImage: `url("/img/cityofathens1.jpg")`

    <div className="servicesMenuContainer">
      <div className="servicesMenuSearchBar">
        {/* <ThemeProvider theme={theme}> */}
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
        {/* </ThemeProvider> */}
      </div>
      <div className="servicesMenuItems">
        {getItems(searchValue || '')}
      </div>
    </div >
  )
}

export default ServicesMenu;