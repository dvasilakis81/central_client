import React from 'react';
import { useSelector } from 'react-redux';
import { renderDetail, renderCheckbox } from '../../../Helper/helpermethods';
import { Checkbox } from '@material-ui/core';

export default function UserItemDetails(props) {
  let itemDetails = useSelector((state) => state.user_reducer.userItemDetails);
  function renderRights() {
    if (itemDetails && itemDetails.rightsInfo && itemDetails.rightsInfo.length === 1) {
      return itemDetails.rightsInfo[0].Rights.map((item, index) => {
        return <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
          <div style={{ fontWeight: 'bold', textAlign: 'left', margin: '10px', width: '100px' }}>{item.Title}</div>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
            <span style={{ margin: '10px' }}>Ανάγνωση</span>
            <span style={{ marginLeft: '5px' }}>
              <Checkbox
                contentEditable={false}
                color='primary'
                checked={item.View}
                style={{ transform: "scale(1)", margin: '0px' }}
                inputProps={{ 'aria-label': 'controlled' }} />
            </span>
            <span style={{ margin: '10px' }}>Δημιουργία</span>
            <span style={{ marginLeft: '5px' }}>
              <Checkbox
                contentEditable={false}
                color='primary'
                checked={item.Create}
                style={{ transform: "scale(1)" }}
                inputProps={{ 'aria-label': 'controlled' }} />
            </span>
            <span style={{ margin: '10px' }}>Ενημέρωση</span>
            <span style={{ marginLeft: '5px' }}>
              <Checkbox
                contentEditable={false}
                color='primary'
                checked={item.Update}
                style={{ transform: "scale(1)" }}
                inputProps={{ 'aria-label': 'controlled' }} />
            </span>
            <span style={{ margin: '10px' }}>Διαγραφή</span>
            <span style={{ marginLeft: '5px' }}>
              <Checkbox
                contentEditable={false}
                color='primary'
                checked={item.Delete}
                style={{ transform: "scale(1)" }}
                inputProps={{ 'aria-label': 'controlled' }} />
            </span>
          </div>
        </div>
      })
    }
  }

  if (itemDetails) {
    return (<div style={{ overflowY: 'scroll' }}>
      {renderDetail('Username', itemDetails.Username, { isText: true })}
      {renderDetail('Όνομα', itemDetails.Firstname, { isText: true })}
      {renderDetail('Επίθετο', itemDetails.Lastname, { isText: true })}
      {renderDetail('Email', itemDetails.Email, { isText: true })}
      {renderDetail('Δημιουργήθηκε', itemDetails.Created, { isDate: true })}
      {renderDetail('Ενημερώθηκε', itemDetails.Updated, { isDate: true })}
      {renderRights()}
    </div>)
  } else
    return <></>
}