import React from 'react';
import { useSelector } from 'react-redux';
import { renderDetail, renderDetailImage, renderDetailDate, renderDetailCheckbox } from '../../../Helper/helpermethods';

export default function MenuItemDetails(props) {

  const { menuItemDetails } = useSelector((state) => ({ menuItemDetails: state.menu_reducer.menuItemDetails }));
  const { serviceItemDetails } = useSelector((state) => ({ serviceItemDetails: state.menu_reducer.serviceItemDetails }));
  var itemDetails = props.itemtype === 1 ? menuItemDetails : serviceItemDetails;
  if (itemDetails) {
    return (<div>
      {renderDetail('Όνομα', itemDetails.Name, { isText: true })}
      {renderDetail('Εξωτερικός σύνδεσμος', itemDetails.Url, { isUrl: true })}
      {renderDetail('Εσωτερικός σύνδεσμος', itemDetails.PageUrl, { isUrl: true })}
      {/* {renderDetail('Εικονίδιο', menuItemDetails.ImageService || menuItemDetails.ImageMenu, { isImage: true })} */}
      {renderDetail('Σειρά', itemDetails.OrderNo, { isText: true })}
      {renderDetail('Κατηγορίες', itemDetails.categoriesInfo, { isList: true })}
      {renderDetail('Μενού', itemDetails.MenuItem, { isCheckbox: true })}
      {renderDetail('Υπηρεσία', itemDetails.ServiceItem, { isCheckbox: true })}      
      {/* {renderDetail('Ανακοίνωση', menuItemDetails.Announce, { isCheckbox: true })} */}
      {renderDetail('Κρυφό', itemDetails.Hidden, { isCheckbox: true })}
      {renderDetail('Δημιουργήθηκε', itemDetails.Created, { isDate: true })}
      {renderDetail('Ενημερώθηκε', itemDetails.Updated, { isDate: true })}
    </div>
    )
  } else
    return <></>
}