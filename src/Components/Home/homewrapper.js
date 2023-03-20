import React from 'react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Body from '../../../src/HOC/Body/body';

export default function Home(props) {

  // RedirectTo() {
  //   // if (isTokenExpired(this.props.token) === true)
  //   //   return <Redirect push to='/login' />
  //   // else
  //   return <Navigate push to='/initial' />
  // }

  return (
    <div>
      <Header
        title="Κεντρική Σελίδα Δήμου Αθηναίων"
        showAdministrationOption={true}
        showNewConsultationOption={true}
        style={{ flexFlow: "0 1 auto" }}
      />
      <Body>
        <div style={{ display: 'flex', flex: 1, flexFlow: 'column', flexWrap: 'wrap', width: '100%', height: '100%', overflowY: 'hidden', overflowX: 'hidden' }}>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'row', height: '100%', overflowY: 'hidden', overflowX: 'hidden', backgroundColor: 'white' }}>
            {props.children}
          </div>
        </div>
      </Body>
      <Footer />
    </div>
  );
}
