import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getFooterHeight } from '../../Helper/helpermethods';

export default function Footer(props) {
  const [machineIp, setmachineIp] = useState('')
  useEffect(() => {
    axios.get('http://api.ipify.org/?format=json').then(res => {
      if (res.data && res.data.ip)
        setmachineIp(res.data.ip);
    })
  }, [])

  return <div style={{
    display: 'flex',
    height: getFooterHeight(),
    background: 'lightBlue',
    alignItems: 'center',
    paddingRight: '50px',
    fontSize: '1rem',
    fontWeight: 'bolder'
  }}>
    <div style={{ display: 'flex', flex: 0.3, justifyContent: 'flex-start', textAlign: 'left' }}>
      Συνδέεστε στο Central με την IP διεύθυνση:
      {machineIp}
      {/* <span style={{ marginLeft: '15px' }}>Συνδέεστε στο Central με την IP διεύθυνση:</span>
      <span style={{ marginLeft: '5px', fontWeight: 'bolder' }}>{machineIp}</span> */}
    </div>
    <div style={{ flex: 1, justifyContent: 'end', textAlign: 'right' }}>
      ©{new Date().getFullYear()} Central Athens
    </div>
  </div>
}