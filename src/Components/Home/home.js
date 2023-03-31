import { Announcement } from '@material-ui/icons';
import React from 'react';

import ServicesMenu from '../ServicesMenu/servicemenu';
import HomewrapperWithCentralMenu from './homewrapperwithcentralmenu';
import Announcements from '../Announcements/announcement';

export default function Home() {

  return (
    <HomewrapperWithCentralMenu>
      {/* <CentralMenu /> */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        {/* <Announcements /> */}
        <ServicesMenu />
      </div>
    </HomewrapperWithCentralMenu>
  );
}

//https://resilientathens.wordpress.com/
//Στρατηγική Ανθεκτικότητας για την Αθήνα

//https://www.athens-resilientcity.gr/
//Αθήνα Ανθεκτική πόλη, ενσωμάτωση πράσινων και μπλε υποδομών