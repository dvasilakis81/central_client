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
    fontSize: 16,
    fontWeight: 'bolder'    
  }}>
    <div style={{display: 'flex', flex: 0.3, justifyContent:'flex-start', textAlign: 'left'}}><span style={{marginLeft: '15px'}}>IP:</span><span style={{marginLeft: '15px', fontWeight: 'bolder'}}>{machineIp}</span></div>
    <div style={{ flex: 1, justifyContent: 'end', textAlign: 'right'}}>©{new Date().getFullYear()} Central Athens</div>
  </div>
}