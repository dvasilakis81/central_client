import React from 'react';
import { useSelector } from 'react-redux';
import { renderDetail, renderDetailImage, renderDetailDate, renderDetailCheckbox } from '../../../Helper/helpermethods';

export default function MenuItemDetails(props) {

  let menuItemDetails = useSelector((state) => { return props.itemtype === 1 ? state.menu_reducer.menuItemDetails : state.menu_reducer.serviceItemDetails; });
  if (menuItemDetails) {
    return (<div>
      {renderDetail('Όνομα', menuItemDetails.Name, { isText: true })}
      {renderDetail('Εξωτερικός σύνδεσμος', menuItemDetails.Url, { isUrl: true })}
      {renderDetail('Εσωτερικός σύνδεσμος', menuItemDetails.PageUrl, { isUrl: true })}
      {/* {renderDetail('Εικονίδιο', menuItemDetails.ImageService || menuItemDetails.ImageMenu, { isImage: true })} */}
      {renderDetail('Σειρά', menuItemDetails.OrderNo, { isText: true })}
      {renderDetail('Κατηγορίες', menuItemDetails.categoriesInfo, { isList: true })}
      {renderDetail('Μενού', menuItemDetails.MenuItem, { isCheckbox: true })}
      {renderDetail('Υπηρεσία', menuItemDetails.ServiceItem, { isCheckbox: true })}      
      {/* {renderDetail('Ανακοίνωση', menuItemDetails.Announce, { isCheckbox: true })} */}
      {renderDetail('Κρυφό', menuItemDetails.Hidden, { isCheckbox: true })}
      {renderDetail('Δημιουργήθηκε', menuItemDetails.Created, { isDate: true })}
      {renderDetail('Ενημερώθηκε', menuItemDetails.Updated, { isDate: true })}
    </div>
    )
  } else
    return <></>
}