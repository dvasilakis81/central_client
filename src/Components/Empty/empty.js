import React, { useState } from 'react';
function EmptyItems(props) {  
  return <div style={{fontSize: 26}}>Δεν βρέθηκαν {props.title}</div>
}
export default EmptyItems;