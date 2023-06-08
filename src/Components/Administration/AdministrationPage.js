
import React from 'react';
import AdministrationPageBody from './AdministrationPageBody';
import HomeWrapper from '../Home/homewrapper';

export default function AdministrationPage() {
  
  return (
    <HomeWrapper>      
      <AdministrationPageBody style={{ overflowY: 'hidden' }} />
    </HomeWrapper>
  );
}