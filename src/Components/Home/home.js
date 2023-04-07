import { Announcement } from '@material-ui/icons';
import React from 'react';

import ServicesMenu from '../ServicesMenu/servicemenu';
import HomewrapperWithCentralMenu from './homewrapperwithcentralmenu';
import HomewrapperWithCentralMenu2 from './homewrapperwithcentralmenu2';
import Announcements from '../Announcements/announcement';

export default function Home() {

  return (
    <HomewrapperWithCentralMenu2>
      {/* <CentralMenu /> */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        {/* <Announcements /> */}
        <ServicesMenu />
      </div>
    </HomewrapperWithCentralMenu2>
  );
}

//https://resilientathens.wordpress.com/
//Στρατηγική Ανθεκτικότητας για την Αθήνα

//https://www.athens-resilientcity.gr/
//Αθήνα Ανθεκτική πόλη, ενσωμάτωση πράσινων και μπλε υποδομών