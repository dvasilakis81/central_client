import React from 'react';
import { useSelector } from 'react-redux';
import { renderDetail } from '../../../Helper/helpermethods';

export default function UserItemDetails(props) {
  let itemDetails = useSelector((state) => state.user_reducer.userItemDetails);

  if (itemDetails) {
    return (<div style={{overflowY: 'scroll'}}>
      {renderDetail('Όνομα', itemDetails.Firstname, {isText: true})}
      {renderDetail('Επίθετο', itemDetails.Lastname, {isText: true})}
      {renderDetail('Email', itemDetails.Email, {isText: true})}
      {renderDetail('Ρόλος', itemDetails.Role, {isText: true})}
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