import React from 'react';
import { useSelector } from 'react-redux';
import { renderDetail } from '../../../Helper/helpermethods';

export default function MenuItemDetails(props) {

  let menuItemDetails = useSelector((state) => { return props.itemtype === 1 ? state.menu_reducer.menuItemDetails : state.menu_reducer.serviceItemDetails; });
  if (menuItemDetails) {
    return (
      <>
        <div style={{ display: 'flex', flex: '1', flexFlow: 'column', overflowY: 'scroll', overflowX: 'hidden', height: '100%' }}>
          {
            <>
              {renderDetail('Όνομα', menuItemDetails.Name)}
              {renderDetail('Εξωτερικός σύνδεσμος', menuItemDetails.Url, false, false, true)}
              {renderDetail('Εσωτερικός σύνδεσμος', menuItemDetails.PageUrl, false, false, true)}
              {renderDetail('Εικονίδιο', menuItemDetails.ImageService || menuItemDetails.ImageMenu, true)}
              {renderDetail('Σειρά', menuItemDetails.OrderNo)}              
              {renderDetail('Μενού', menuItemDetails.MenuItem, false, true)}
              {renderDetail('Υπηρεσία', menuItemDetails.ServiceItem, false, true)}
              {renderDetail('Ανακοίνωση', menuItemDetails.Announce, false, true)}
              {renderDetail('Κρυφό', menuItemDetails.Hidden, false, true)}
            </>            
          }
        </div>
      </>
    )
  } else
    return <></>
}