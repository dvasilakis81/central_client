import { Announcement } from '@material-ui/icons';
import React from 'react';

import ServicesMenu from '../ServicesMenu/servicemenu';
import HomewrapperWithCentralMenu from './homewrapperwithcentralmenu';
import Announcements from '../Announcements/announcement';

export default function Home() {

  return (
    <HomewrapperWithCentralMenu>
      {/* <CentralMenu /> */}
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        {/* <Announcements /> */}
        <ServicesMenu />
      </div>
    </HomewrapperWithCentralMenu>
  );
}