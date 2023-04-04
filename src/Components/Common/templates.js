import React from 'react'
import './templates.css'
import { getFooterHeight, getDateFormat, tokenExpiresAt } from '../../Helper/helpermethods';
import Header from "../Header/header";

const localIpAddress = require("local-ip-address")

export function getFailedConnectionWithServer() {
  return showGenericMessage('Αποτυχία σύνδεσης με τον διακομιστή!', true)
}

export function showErrorMessageFromServer(error) {
  return showGenericMessage(error, true, false)
}

export function showGenericMessage(errorMessage, isError, hasHeader) {
  var className = isError ? 'centered errormessage' : 'centered infomessage'

  return (<div style={{ width: '100%', height: '100%', position: 'relative' }}>
    {hasHeader === true ? <Header
      title="Διαβίβαση παρασταστικών κ' δικαιολογητικών για ενταλματοποίηση της δαπάνης"
      showAdministrationOption={false}
      showNewContractOption={false} /> : <></>}
    <div className={className}>
      {errorMessage}
    </div>
  </div>)
}


