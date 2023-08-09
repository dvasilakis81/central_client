import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import MaterialTable, { MTableToolbar } from 'material-table';
// import { ThemeProvider, createTheme } from '@mui/material';
// import PulseLoader from 'react-spinners/PulseLoader';
import { getHostUrl, getHeaderHeight, getFooterHeight, getBodyHeight, getDateTimeFormat, getServerErrorResponseMessage } from '../../Helper/helpermethods';
import { getPhoneCatalogInfo, addPhoneCatalogInfo, searchPhoneCatalogInfo } from '../../Redux/Actions/index';
import HomeWrapperWithCentralMenu2 from '../Home/homewrapperwithcentralmenu2';
import { setHeaderTitle, setSelectedCentralMenuItem } from '../Common/methods'
import * as XLSX from 'xlsx';
import { Button } from '@material-ui/core';
import { showSnackbarMessage, showFailedConnectWithServerMessage, renderComments } from '../Common/methods';
import { tr } from 'date-fns/locale';
import store from '../../Redux/Store/store';

export default function PhoneCatalog(props) {
  const { searchPhoneCatalogList } = useSelector(state => ({ searchPhoneCatalogList: state.phonecatalog_reducer.searchPhoneCatalogList }));
  const { phoneCatalogList } = useSelector(state => ({ phoneCatalogList: state.phonecatalog_reducer.phoneCatalogList }));
  const { menuItemsList } = useSelector(state => ({ menuItemsList: state.menu_reducer.menuItemsList }));
  const { token } = useSelector(state => ({ token: state.token_reducer.token }));

  const styles = {
    trfirst: {
      backgroundColor: 'lightgreen'
    },
    treven: {
      background: '#32612d',
      color: 'white',
      verticalAlign: 'middle'
    },
    td: {
      paddingLeft: '20px',
      paddingBottom: '20px',
      fontSize: '18px',
      fontWeight: 'semibold|italic',
      fontStyle: 'italic',
      padding: '10px'
    },
    tdsearch: {
      paddingLeft: '0px',
      paddingBottom: '10px',
      fontSize: '16px',
      minWidth: '200px',
      width: '400px'
    }
  }

  const dispatch = useDispatch();
  const [excelData, setExcelData] = useState([]);
  const [addContactsButtonDisabled, setAddContactsButtonDisabled] = useState(true);
  const [searchFieldLength, setSearchFieldLength] = useState(0);

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);

  useEffect(() => {
    setHeaderTitle('Τηλεφωνικός Κατάλογος');

    if (menuItemsList) {
      for (var i = 0; i < menuItemsList.length; i++) {
        var menuItem = menuItemsList[i];
        if (menuItem.Id === 6) {
          setSelectedCentralMenuItem(menuItem);
          break;
        }
      }
    }

    return function cleanup() {
      store.dispatch({ type: 'SET_SEARCH_PHONECATALOGINFO_EMPTY', payload: [] });
    }
    //dispatch(getPhoneCatalogInfo());
  }, []);

  function renderRows() {
    if (searchPhoneCatalogList && searchPhoneCatalogList.length > 0 && Array.isArray(searchPhoneCatalogList)) {
      return searchPhoneCatalogList && searchPhoneCatalogList.map((item, index) => {
        return <tr key={index} style={index % 2 === 0 ? styles.trfirst : styles.treven}>
          <td style={styles.td}>{item.Fullname}</td>
          <td style={styles.td}>{item.Phone}</td>
          <td style={styles.td}>{item.Internal}</td>
        </tr>;
      })
    } else {
      var searchMessage = 'Κανένα αποτέλεσμα';
      if (searchFieldLength <= 3)
        searchMessage = 'Απαιτούνται τουλάχιστον 4 χαρακτήρες';

      return <tr>
        <td style={styles.td} colspan={2}>
          <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'orangered' }}>
            {inputRef1?.current?.value || inputRef2?.current?.value || inputRef3?.current?.value ? searchMessage : ''}
          </span>
        </td>
      </tr>
    }
  }

  return <HomeWrapperWithCentralMenu2>
    <div className='page-info-container'>
      <div className='page-body'>
        {(token && token.userLoginInfo) ? <div className='flex-row-left-center' style={{border: '1px solid black', background: 'lightgrey'}}>
          <input
            type='file'
            style={{ padding: '20px', width: '500px', fontSize: '16px', fontWeight: 'bold'}}
            onInput={async (e) => {
              const file = e.target.files[0];
              if (file) {
                const data = await file.arrayBuffer();
                const workbook = XLSX.read(data);
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                  header: 1,
                  defval: "",
                });
                setAddContactsButtonDisabled(false);
                setExcelData(jsonData);
              } else
                setAddContactsButtonDisabled(true);
            }}
          />
          <Button
            disabled={addContactsButtonDisabled}
            variant='contained'
            color="primary"
            style={{ height: 'fit-content', verticalAlign: 'middle' }}
            onClick={() => {
              var data = {};
              data.excelData = excelData;
              dispatch(addPhoneCatalogInfo(data)).then(response => {
                showSnackbarMessage(response, 'Eγινε επιτυχώς!');
              }).catch(error => {
                showFailedConnectWithServerMessage(error);
              });
            }}>
            ΠΡΟΣΘΗΚΗ
          </Button>
        </div> : <></>}
        <table style={{ textAlign: 'middle' }}>          
          <tr>
            <td style={styles.tdsearch}>              
              <div style={{ display: 'flex', flex: '1', flexDirection: 'row' }}>
                <input
                  ref={inputRef1}
                  placeholder=" &#xF002; Ονοματεπώνυμο"
                  type='search'
                  style={{
                    fontFamily: 'FontAwesome',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    border: '1px solid black',
                    padding: '10px',
                    width: '-webkit-fill-available'
                  }}
                  onChange={(e) => {
                    inputRef2.current.value = '';
                    inputRef3.current.value = '';

                    var data = {};
                    data.searchfield = 1;
                    data.searchtext = e.target.value;
                    setSearchFieldLength(e.target.value && e.target.value.length || 0);
                    if (e.target.value && e.target.value.length > 3) {
                      dispatch(searchPhoneCatalogInfo(data)).then(response => {
                        //showSnackbarMessage(response, 'Eγινε επιτυχώς!');
                      }).catch(error => {
                        showFailedConnectWithServerMessage(error);
                      });
                    } else
                      store.dispatch({ type: 'SET_SEARCH_PHONECATALOGINFO_EMPTY', payload: [] });
                  }}
                />                
              </div>
            </td>
            <td style={styles.tdsearch}>
              <input
                placeholder=" &#xF002; Αριθμός Τηλ."
                ref={inputRef2}
                type='number'
                style={{ fontSize: '20px', fontWeight: 'bold', border: '1px solid black', padding: '10px', margin: '10px', width: '-webkit-fill-available', fontFamily: 'FontAwesome' }}
                onChange={(e) => {
                  inputRef1.current.value = '';
                  inputRef3.current.value = '';

                  var data = {}
                  data.searchfield = 2;
                  data.searchtext = e.target.value;
                  setSearchFieldLength(e.target.value && e.target.value.length || 0);
                  if (e.target.value && e.target.value.length > 3) {
                    dispatch(searchPhoneCatalogInfo(data)).then(response => {
                      //showSnackbarMessage(response, 'Eγινε επιτυχώς!');
                    }).catch(error => {
                      showFailedConnectWithServerMessage(error);
                    });
                  } else
                    store.dispatch({ type: 'SET_SEARCH_PHONECATALOGINFO_EMPTY', payload: [] });
                }}
              />
            </td>
            <td style={styles.tdsearch}>
              <input
                placeholder=" &#xF002; Εσωτερικό Τηλ."
                ref={inputRef3}
                type='number'
                style={{ fontSize: '20px', fontWeight: 'bold', border: '1px solid black', padding: '10px', width: '-webkit-fill-available', fontFamily: 'FontAwesome' }}
                onChange={(e) => {
                  inputRef1.current.value = '';
                  inputRef2.current.value = '';
                  var data = {}
                  data.searchfield = 3;
                  setSearchFieldLength(e.target.value && e.target.value.length || 0);
                  if (e.target.value && e.target.value.length > 2) {
                    data.searchtext = e.target.value;
                    dispatch(searchPhoneCatalogInfo(data)).then(response => {
                      //showSnackbarMessage(response, 'Eγινε επιτυχώς!');
                    }).catch(error => {
                      showFailedConnectWithServerMessage(error);
                    });
                  } else
                    store.dispatch({ type: 'SET_SEARCH_PHONECATALOGINFO_EMPTY', payload: [] });
                }}
              />
            </td>
          </tr>
          {renderRows()}
        </table>
      </div>
    </div>
  </HomeWrapperWithCentralMenu2 >
  //const defaultMaterialTheme = createTheme();
  // return <div>
  //   <ThemeProvider theme={defaultMaterialTheme}>
  //     <MaterialTable
  //       localization={{
  //         pagination: {
  //           firstTooltip: 'Πρώτη Σελίδα',
  //           previousTooltip: 'Προηγούμενη Σελίδα',
  //           nextTooltip: 'Επόμενη Σελίδα',
  //           lastTooltip: 'Τελευταία Σελίδα',
  //           labelDisplayedRows: '{from}-{to} από {count}',
  //           labelRowsSelect: ''
  //         },
  //         toolbar: {
  //           nRowsSelected: '{0} γραμμές(s) επιλεγμένες',
  //           searchTooltip: 'Αναζήτηση',
  //           searchPlaceholder: 'Αναζήτηση'
  //         },
  //         header: {
  //           actions: 'Ενέργειες',

  //         },
  //         body: {
  //           emptyDataSourceMessage: 'Δεν υπάρχουν δεδομένα για προβολή',
  //           filterRow: {
  //             filterTooltip: 'Φίλτρο'
  //           },
  //           editRow: {
  //             deleteText: 'Να γίνει η διαγραφή του επιλεγμένου στοιχείου;'
  //           },
  //           addTooltip: 'Προσθήκη',
  //           deleteTooltip: 'Διαγραφή',
  //           editTooltip: 'Επεξεργασία'
  //         }
  //       }}
  //       title='Τηλεφωνικός Κατάλογος'
  //       columns={[
  //         { title: 'Fullname', field: 'Fullname' },
  //         { title: 'Phone', field: 'Phone' }
  //       ]}
  //       // options={{
  //       //   filtering: true,
  //       //   paging: true,
  //       //   pageSize: 20,
  //       //   maxBodyHeight: getBodyHeight() - 180,
  //       //   addRowPosition: 'first',
  //       //   doubleHorizontalScroll: false,
  //       //   actionsColumnIndex: -1,
  //       //   headerStyle: { backgroundColor: 'lightGreen' },
  //       //   sorting: true        
  //       // }}
  //       components={{
  //         Toolbar: props => (
  //           <div style={{ backgroundColor: '#e8eaf5' }}>
  //             <MTableToolbar {...props} />
  //           </div>
  //         ),
  //         OverlayLoading: props => (
  //           <div style={{
  //             backgroundColor: '#e8eaf5', width: 'auto', height: 'auto',
  //             position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  //             display: 'flex', flexDirection: 'column', maxWidth: '100px', padding: '20px', borderRadius: '20px'
  //           }}>
  //             <PulseLoader
  //               sizeUnit={"px"}
  //               size={20}
  //               color={'#123abc'}
  //               loading={false}
  //             />
  //           </div>
  //         )
  //       }}
  //       data={query =>
  //         new Promise((resolve, reject) => {
  //           // use query to produce data. query contains search, filter, page and sort data. 
  //           fetch(getHostUrl() + 'getPhoneCatalogInfo') // You can send query to your server directly. 
  //             .then(response => {
  //               response.json()
  //             })
  //             .then(result => {
  //               resolve({
  //                 data: result.data,
  //                 page: result.pageNumber,
  //                 totalCount: result.total,
  //               })
  //             })
  //         })}
  //       onRowClick={(
  //         (evt, selectedRow) => {
  //           // setState({ selectedRow })
  //         }
  //       )}
  //     // editable={{
  //     //   onRowAdd: newData =>
  //     //     new Promise((resolve, reject) => {
  //     //       setTimeout(() => {
  //     //         requestAdd(selectedItem, newData, this.state.data, resolve);
  //     //         resolve();
  //     //       }, 600)
  //     //     }),
  //     //   onRowUpdate: (newData, oldData) =>
  //     //     new Promise(resolve => {
  //     //       setTimeout(() => {
  //     //         requestUpdate(selectedItem, oldData, newData, this.state.data, resolve);
  //     //         resolve();
  //     //       }, 600);
  //     //     })
  //     //   ,
  //     //   onRowDelete: oldData =>
  //     //     new Promise(resolve => {
  //     //       setTimeout(() => {
  //     //         requestDelete(selectedItem, oldData, this.state.data, resolve);
  //     //         resolve();
  //     //       }, 600);
  //     //     })
  //     // }}
  //     />
  //   </ThemeProvider>
  // </div>
}