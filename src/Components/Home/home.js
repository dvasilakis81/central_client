import React, { useState, useEffect } from 'react';

import ServicesMenu from '../ServicesMenu/servicemenu';
// import HomewrapperWithCentralMenu from './homewrapperwithcentralmenu';
import HomewrapperWithCentralMenu2 from './homewrapperwithcentralmenu2';
import { setHeaderTitle, setSelectedCentralMenuItem } from '../Common/methods';
import { useSelector } from 'react-redux';

export default function Home() {

  const { menuItemsList } = useSelector(state => ({ menuItemsList: state.menu_reducer.menuItemsList }));
  useEffect(() => {
    setHeaderTitle('Αρχική');
    if (menuItemsList) {
      for (var i = 0; i < menuItemsList.length; i++) {
        var menuItem = menuItemsList[i];
        if (menuItem.Name === 'Αρχική') {
          setSelectedCentralMenuItem(menuItem);
          break;
        }
      }
    }

  }, []);

  return (
    <HomewrapperWithCentralMenu2>
      <ServicesMenu />
    </HomewrapperWithCentralMenu2>
  );
}