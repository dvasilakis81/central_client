import React, { useState, useEffect } from 'react';

import ServicesMenu from '../ServicesMenu/servicemenu';
import HomewrapperWithCentralMenu from './homewrapperwithcentralmenu';
import HomewrapperWithCentralMenu2 from './homewrapperwithcentralmenu2';
import { setHeaderTitle } from '../Common/methods';

export default function Home() {

  useEffect(() => {
    setHeaderTitle('Αρχική');
  }, []);

  return (
    <HomewrapperWithCentralMenu2>
      <ServicesMenu />
    </HomewrapperWithCentralMenu2>
  );
}

//https://resilientathens.wordpress.com/
//Στρατηγική Ανθεκτικότητας για την Αθήνα

//https://www.athens-resilientcity.gr/
//Αθήνα Ανθεκτική πόλη, ενσωμάτωση πράσινων και μπλε υποδομών