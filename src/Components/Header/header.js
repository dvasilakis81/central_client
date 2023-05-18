import React from 'react';
import { getHeaderHeight } from '../../Helper/helpermethods';
import thyraios from '../Images/thyraios.png';
import ServicesSearchBar from '../Search/servicessearchbar';

export default function Header(props) {
  const headerHeight = getHeaderHeight();
  const styles = {
    header: {
      width: '100%',
      backgroundColor: '#1b7ced',
      verticalAlign: 'center',
      display: "flex",
      flex: 1,
      flexDirection: 'row',
      padding: 0,
      height: headerHeight
    },
    header2: {
      width: '100%',
      backgroundColor: '#f4f6f7',
      justifyContent: 'left',
      alignItems: 'center',
      display: "flex",
      flex: 1,
      fontWeight: 'bold',
      flexDirection: 'row',
      padding: 0,
      height: headerHeight
    },
    headerTitle: {
      marginLeft: 10,
      fontSize: 26,
      color: '#094fa3',
      textAlign: 'left',
      flexGrow: 0.1,
      alignSelf: 'left'
    },
    headerSearchBar: {
      marginLeft: 10,
      fontSize: 24,
      textAlign: 'center',
      flexGrow: 0.5,
      width: '300px',
      alignSelf: 'center',
      borderTop: '1px darkblue solid',      
    }
  }

  return <div style={styles.header2}>
    <img src={thyraios} alt="Δήμος Αθηναίων" width='50px' height='50px' />
    <div style={styles.headerTitle}>Κεντρική Σελίδα Δήμου Αθηναίων</div>
    {/* <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <span style={{
        verticalAlign: 'center',
        fontSize: '24px',
      }}>
        <i className="fa fa-magnifying-glass" />
      </span>
      <input
        style={styles.headerSearchBar}
        type='text' />
    </div> */}
    {/* <ServicesSearchBar /> */}
  </div>
}