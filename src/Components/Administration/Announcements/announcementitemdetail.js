import React from 'react';
import { useSelector } from 'react-redux';
import { renderDetail } from '../../../Helper/helpermethods';

export default function AnnouncementItemDetails(props) {
  let itemDetails = useSelector((state) => state.announcement_reducer.announcementItemDetails);

  if (itemDetails) {
    return (<div style={{overflowY: 'scroll'}}>
      {renderDetail('Περιγραφή', itemDetails.Description, {isHtml: true})}
      {/* {renderDetail('Σύνδεσμος', itemDetails.Url, {isUrl: true})} */}
      {renderDetail('Κατηγορίες', itemDetails.categoriesInfo, {isList: true})}
      {/* {renderDetail('Χρώμα Κειμένου', itemDetails.Color, {isColor: true})}
      {renderDetail('Χρώμα Φόντου', itemDetails.BackgroundColor, {isColor: true})}       */}
      {renderDetail('Πρώτη σελίδα', itemDetails.Showonfirstpage, {isCheckbox: true})}
      {renderDetail('Κρυφό', itemDetails.Hidden, {isCheckbox: true})}      
      {renderDetail('Δημιουργήθηκε', itemDetails.Created, {isDate: true})}
      {renderDetail('Ενημερώθηκε', itemDetails.Updated, {isDate: true})}
    </div>)
  } else
    return <></>
}

// Object.keys(itemDetails).map((key, index) => {
            //   return (
            //     <div key={index} style={{ display: 'flex', flexFlow: 'row', overflowY: 'hidden', overflowX: 'hidden'  }}>
            //       <div style={{ fontSize: 24, padding: 10, fontWeight: 'bold', width: 'auto', minWidth: '250px'}}>
            //         {key}:
            //       </div>
            //       <div style={{ fontSize: 24, paddingLeft: 0, paddingTop: 10 }}>{itemDetails[key]}</div>
            //     </div>
            //   );
            // })