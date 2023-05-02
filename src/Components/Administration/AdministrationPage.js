
import React from 'react';
import AdministrationPageBody from './AdministrationPageBody';
import HomeWrapper from '../Home/homewrapper';
import Categories from './Categories/categories';

export default function AdministrationPage(props) {  
  
  return (
    <HomeWrapper>      
      <AdministrationPageBody style={{ overflowY: 'hidden' }} />
    </HomeWrapper>
  );
}