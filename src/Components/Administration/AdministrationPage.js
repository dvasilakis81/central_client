
import React, { useEffect } from 'react';
import AdministrationPageBody from './AdministrationPageBody';
import HomeWrapper from '../Home/homewrapper';
import { useDispatch } from 'react-redux';
import { getMenuItems, getPageItems, getMediaItems, getAnnouncements } from '../../Redux/Actions';

export default function AdministrationPage(props) {

  return (
    <HomeWrapper>
      <AdministrationPageBody style={{ overflowY: 'hidden' }} />
    </HomeWrapper>
  );
}