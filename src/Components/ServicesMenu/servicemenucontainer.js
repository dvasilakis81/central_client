import React from 'react';

export default function ServiceMenuContainer(props) {

  return (<div className="services-menu-container">
    <div className="services-menu-items">
      {props.children}
    </div>
  </div>)
}