import React from 'react';

import ServicesMenu from '../ServicesMenu/servicemenu';
import HomewrapperWithCentralMenu from './homewrapperwithcentralmenu';

export default function Home() {

  return (    
    <HomewrapperWithCentralMenu>
      {/* <CentralMenu /> */}
      <ServicesMenu />
    </HomewrapperWithCentralMenu>
  );
}