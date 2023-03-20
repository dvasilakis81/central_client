import React from 'react';
import { useSelector } from 'react-redux';

export default function MenuItemDetails(props) {

  let menuItemDetails = useSelector((state) => {
    return props.itemtype === 0 ? state.menu_reducer.menuItemDetails : state.menu_reducer.serviceItemDetails;
  });
  
  if (menuItemDetails) {
    return (
      <>
        <div style={{ display: 'flex', flex: '1', flexFlow: 'column', overflowY: 'hidden', overflowX: 'hidden', height: '100%' }}>
          {
            Object.keys(menuItemDetails).map((key, index) => {
              return (
                <div key={index} style={{ display: 'flex', flexFlow: 'row', overflowY: 'hidden', overflowX: 'hidden' }}>
                  <div style={{ fontSize: 24, padding: 10, fontWeight: 'bold', width: '10%', textAlign: 'left' }}>
                    {key}
                    <span style={{ fontSize: 24, padding: 10, fontWeight: 'bold', textAlign: 'right' }}></span>
                  </div>
                  <div style={{ fontSize: 24, paddingLeft: 0, paddingTop: 10 }}>{menuItemDetails[key]}</div>
                </div>
              );
            })
          }
        </div>
      </>
    )
  } else
    return <></>
}