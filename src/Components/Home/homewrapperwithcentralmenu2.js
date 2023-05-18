import React, { useState } from 'react';
import Header from '../Header/header';
import CentralMenu from '../CentralMenu/centralmenu';
import Body from '../../HOC/Body/body';
import Footer from '../Footer/footer';
// import ServicesSearchBar from '../Search/servicessearchbar';
// import ServiceCategories from '../ServicesMenu/selectcategories';

export default function HomewrapperWithCentralMenu2(props) {

  return (
    <div>
      <Header
        title="Κεντρική Σελίδα Δήμου Αθηναίων"
        showAdministrationOption={true}
        showNewConsultationOption={true}
        style={{ flexFlow: "0 1 auto" }}
      />
      <Body>
        <div style={{ display: 'flex', flex: 1, flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%', overflowX: 'hidden', overflowY: 'hidden' }}>
          <div style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            height: 'auto',
            backgroundImage: `url("/img/cityofathens1.jpg")`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'none',
            overflowX: 'hidden',
            overflowY: 'hidden',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              height: '100%',
              background: 'transparent'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', maxwidth: '300px', minWidth: '300px', height: '100%', background: 'transparent'}}>
                <CentralMenu />
              </div>
              {props.children}
            </div>
          </div>
        </div>
      </Body >
      <Footer />
    </div >
  );
}