import React from 'react';
import { getHeaderHeight } from '../../Helper/helpermethods';
import thyraios from '../Images/thyraios.png';

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
      verticalAlign: 'center',
      display: "flex",
      flex: 1,
      fontWeight: 'bold',
      flexDirection: 'row',
      padding: 0,
      height: headerHeight
    },
    headerTitle: {
      fontSize: 26,
      color: '#094fa3',
      textAlign: 'center',
      flexGrow: 1,
      alignSelf: 'center'
    }
  }

  return <div style={styles.header2}>
    <img src={thyraios} alt="Δήμος Αθηναίων" width='50px' height='50px' />
    <div style={styles.headerTitle}>Κεντρική Σελίδα Δήμου Αθηναίων</div>
  </div>
}