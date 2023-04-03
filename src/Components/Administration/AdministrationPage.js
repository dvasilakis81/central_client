
import React, { useEffect } from 'react';
import AdministrationPageBody from './AdministrationPageBody';
import HomeWrapper from '../Home/homewrapper';
import { useDispatch } from 'react-redux';
import { getMenuItems, getPageItems, getMediaItems, getAnnouncements } from '../../Redux/Actions';

export default function AdministrationPage(props) {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getMenuItems());
  //   //dispatch(getPageItems());
  //   dispatch(getMediaItems());
  //   dispatch(getAnnouncements());
  // }, []);

  return (
    // display: flex;
    // flex-flow: column;
    // height: 100%;

    <HomeWrapper>
      <AdministrationPageBody style={{ overflowY: 'hidden' }} />
    </HomeWrapper>
  );
}