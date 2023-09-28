import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getFooterHeight, getHostUrl } from '../../Helper/helpermethods';

export default function Footer(props) {
  const [machineIp, setMachineIp] = useState('')
  useEffect(() => {
    console.log(getHostUrl() + 'getMachineIp');
    const methodUrl = getHostUrl() + 'getMachineIp';
    axios.get(methodUrl).then(res => {
      if (res.data)
        setMachineIp(res.data);
    })
  }, [])

  return <div style={{
    display: 'flex',
    height: getFooterHeight(),
    background: '#E7EDF5',
    alignItems: 'center',
    paddingRight: '50px',
    fontSize: '1rem',
    fontWeight: 'bolder'
  }}>
    <div style={{ marginLeft: '15px', display: 'flex', flex: 0.3, justifyContent: 'flex-start', textAlign: 'left', color: '#0F6CBD' }}>
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