import React from 'react';
import { useState, useRef } from 'react';
import { getHostUrl } from '../../Helper/helpermethods';
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox } from '@material-ui/core';

const styles = {
  menuenter: {
    marginLeft: '10px',
    width: '60px',
    height: '55px',
    border: '2px solid blue',
    textAlign: 'center'
  },
  menuleave: { marginLeft: '10px', width: '60px', height: '55px', border: '2px solid white', textAlign: 'center' },
  menuentercolor: { color: 'white' },
  menuleavecolor: { color: 'blue' }
}

export default function ServiceCategories(props) {
  const { categoriesList } = useSelector(state => ({ categoriesList: state.parametricdata_reducer.categoriesList }));
  const [menuClicked, setMenuClicked] = useState(0);
  const menustyle = menuClicked === 0 ? styles.menuenter : styles.menuleave;
  const menucolor = menuClicked === 0 ? styles.menuleavecolor : styles.menuentercolor;
  const menuRef = useRef();

  const [checked, setChecked] = useState([]);
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked === true) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const isChecked = (item) => {
    var ret = false;
    for (var i = 0; i < checked.length; i++) {
      if (checked[i].toString() === item.Id.toString()) {
          ret = true;
          break;
      }
    }
    return ret;
  }


  return (
    <>
      <span
        ref={menuRef}
        style={menustyle}
        onClick={(e) => {
          if (menuClicked === 1)
            setMenuClicked(0);
          else
            setMenuClicked(1);
        }
        }>
        <i class="fa fa-bars fa-3x" style={menucolor} />
      </span>
      {(menuClicked === 1) ?
        <div style={{
          position: 'fixed', width: '500px', height: '300px',
          top: menuRef.current ? menuRef.current.offsetTop + menuRef.current.offsetHeight + 10 : 0,
          left: menuRef.current ? menuRef.current.offsetLeft : 0
        }}>
          <div style={{
            position: 'relative',
            width: '70%', background: '#fff', padding: '20px',
            border: '1px solid #999',
            overflow: 'auto'
          }}>
            {categoriesList && categoriesList.map((item, index) => {
              return <div id={item.Id} style={{ display: 'flex', flexDirection: 'row', borderBottom: '0px solid black' }}>
                <input value={item.Id} type="checkbox" onChange={handleCheck} checked={isChecked(item)} style={{ transform: 'scale(2)', margin: '5px', height: '10px' }} />
                <div style={{ paddingLeft: '15px', paddingBottom: '15px' }}>{item.Name}</div>
              </div>
            })}
          </div>
        </div> : <></>}
    </>)

}
