import React from 'react';
import Header from '../Header/header';
import CentralMenu from '../CentralMenu/centralmenu';
import Body from '../../HOC/Body/body';
import Footer from '../Footer/footer';

export default function HomewrapperWithCentralMenu(props) {

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
            flexDirection: 'row',
            height: 'auto',
            //backgroundImage: `url("/img/cityofathens1.jpg")`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'none',
            overflowX: 'hidden',
            overflowY: 'hidden'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CentralMenu />
            </div>
            {props.children}
          </div>
        </div>
      </Body>
      <Footer />
    </div>
  );
}