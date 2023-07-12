import React from 'react';
import { useSelector } from 'react-redux';
import { renderDetail } from '../../../Helper/helpermethods';

export default function MediaItemDetails(props) {
  let itemDetails = useSelector((state) => state.media_reducer.mediaItemDetails);

  if (itemDetails) {
    return (
      <div>
        {renderDetail('Όνομα', itemDetails.Name, { isText: true })}
        {renderDetail('Σύνδεσμος', itemDetails.Url, { isUrl: true })}
        {renderDetail('Width', itemDetails.Width, { isText: true })}
        {renderDetail('Height', itemDetails.Height, { isText: true })}
        {renderDetail('MimeType', itemDetails.MimeType, { isText: true })}
        {renderDetail('Encoding', itemDetails.Encoding, { isText: true })}
        {renderDetail('Size', itemDetails.Size, { isText: true })}
        {renderDetail('Κατηγορίες', itemDetails.categoriesInfo, {isList: true})}
        {renderDetail('Τίτλος', itemDetails.Title, {isText: true})}
        {renderDetail('Δημιουργήθηκε', itemDetails.Created, { isDate: true })}
        {renderDetail('Επεξεργάστηκε', itemDetails.Updated, { isDate: true })}
      </div>
    )
  } else
    return <></>
}