export default function (state = {}, action, root) {

  if (action) {
    switch (action.type) {
      case 'RESET_ACTION':
        console.log('RESET_ACTION');
        state = {}
        break;
      case 'GET_PAGEITEMS_PENDING':
        state = {
          ...state,
          requestPending: 'Get page items pending',
          requestRejected: undefined,
          requestServerError: undefined,
          pageItemsList: undefined
        };
        break;
      case 'GET_PAGEITEMS_FULFILLED':
        var serverResponse = action.payload;
        if (serverResponse && serverResponse.servererrormessage) {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: serverResponse,
            pageItemsList: undefined
          };
        } else if (serverResponse && serverResponse.tokenIsValid !== undefined) {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: undefined,
            pageItemsList: action.payload
          };
        } else {
          if (serverResponse && serverResponse.length > 0) {
            var itemsList = serverResponse;
            var itemDetails = itemsList ? itemsList[0] : undefined;

            state = {
              ...state,
              requestPending: undefined,
              requestRejected: undefined,
              requestServerError: undefined,
              pageItemsList: itemsList,
              pageItemDetails: itemDetails
            };
          } else {
            state = {
              ...state,
              requestPending: undefined,
              requestRejected: undefined,
              requestServerError: undefined,
              pageItemsList: [],
              pageItemDetails: undefined
            };
          }
        }
        break;
      case 'GET_PAGEITEMS_REJECTED':
        state = {
          ...state,
          requestPending: undefined,
          requestRejected: action.payload,
          pageItemsList: undefined,
          pageItemDetails: undefined
        };
        break;
      case 'SET_PAGEITEM_DETAIL':
        state = {
          ...state,
          pageItemDetails: action.payload
        };
        break;
      case 'ADD_PAGEITEM_PENDING':
        state = {
          ...state,
          newPageAdded: false,
          requestPending: 'Add page items pending',
          requestServerError: undefined,
          requestRejected: undefined
        };
        break;
      case 'ADD_PAGEITEM_REJECTED':
        var serverResponse = action.payload;
        state = {
          ...state,
          newPageAdded: false,
          requestPending: undefined,
          requestServerError: undefined,
          requestRejected: serverResponse
        };
        break;
      case 'ADD_PAGEITEM_FULFILLED':
        var serverResponse = action.payload;
        if (serverResponse && serverResponse.servererrormessage) {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: serverResponse,
            pageItemsList: undefined,
            newPageAdded: false
          };
        } else {

          state = {
            ...state,
            newPageAdded: true,
            requestServerError: undefined,
            requestPending: undefined,
            requestRejected: undefined
          };
        }
        break;
      case 'SET_ADDED_NEWPAGE':
        state = {
          ...state,
          newPageAdded: false,
        };
        break;
      case 'EDIT_PAGEITEM_PENDING':
        state = {
          ...state,
          editPage: false,
          requestServerError: undefined,
          requestPending: 'Add page items pending',
          requestRejected: undefined
        };
        break;
      case 'EDIT_PAGEITEM_REJECTED':
        state = {
          ...state,
          editPage: false,
          requestPending: undefined,
          requestRejected: action.payload
        };
        break;
      case 'EDIT_PAGEITEM_FULFILLED':
        var serverResponse = action.payload;
        if (serverResponse && serverResponse.length > 0) {
          var itemsList = serverResponse;
          var itemDetails = itemsList ? itemsList[0] : undefined;

          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: undefined,
            pageItemsList: itemsList,
            pageItemDetails: itemDetails
          };
        } else {
          const updatedList = [];
          if (state.pageItemsList) {
            var updatedItem = serverResponse[0];
            state.pageItemsList.forEach((item, index) => {
              if (item.Id === updatedItem.Id)
                updatedList.push(updatedItem);
              else
                updatedList.push(item);
            });
          }

          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: undefined,
            pageItemsList: updatedList,
            pageItemDetails: state.pageItemDetails || (updatedList ? updatedList[0] : undefined)
          };
        }
        break;
      case 'GET_PAGEINFO_PENDING':

        state = {
          ...state,
          requestPending: 'Get page info pending',
          requestServerError: undefined,
          requestRejected: undefined
        };
        break;
      case 'GET_PAGEINFO_FULFILLED':
        var serverResponse = action.payload;
        if (serverResponse && serverResponse.servererrormessage) {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: serverResponse            
          };
        } else {

          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            pageInfo: action.payload
          };
        }
        break;
      case 'GET_PAGETABINFO_PENDING':

        state = {
          ...state,
          requestPending: 'Get page info pending',
          requestServerError: undefined,
          requestRejected: undefined          
        };
        break;
      case 'GET_PAGETABINFO_REJECTED':

        state = {
          ...state,
          requestPending: undefined,
          requestRejected: 'Get tab info rejected',
          requestServerError: undefined,
          pageTabInfo: undefined
        };
        break;
      case 'GET_PAGETABINFO_FULFILLED':
        var serverResponse = action.payload;
        if (serverResponse && serverResponse.servererrormessage) {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: serverResponse,
            pageTabInfo: undefined
          };
        } else {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: undefined,
            pageTabInfo: action.payload
          };
        }
        break;
      case 'GET_PAGEITEMS_REJECTED':
        state = {
          ...state,
          requestPending: undefined,
          requestRejected: 'Αποτυχία στην προσπάθεια προσκόμισης σελίδας',
          requestServerError: undefined,
          pageInfo: undefined
        };
        break;
      case 'SET_SELECTED_PAGE_TAB':
        var selectedItem = action.payload;
        state = {
          ...state,
          selectedPageTab: selectedItem.tab || 0,
          selectedPageItem: selectedItem.item,
        };
        break;
      case 'DELETE_PAGE_PENDING':

        state = {
          ...state,
          openMessage: false,
          requestPending: true,
          requestRejected: undefined,
          requestServerError: undefined
        };
        break;
      case 'DELETE_PAGE_REJECTED':

        state = {
          ...state,
          requestPending: undefined,
          requestRejected: action.payload,
          deletedPageItemFulfilled: undefined,
          requestServerError: undefined
        };
        break;
      case 'DELETE_PAGE_FULFILLED':

        var serverResponse = action.payload;
        if (serverResponse && serverResponse.servererrormessage) {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: serverResponse            
          };
        } else {

          if (serverResponse) {
            let items = state.pageItemsList.filter((item) => {
              let found = false;
              if (item.Id === serverResponse.id)
                found = true;

              if (found === false)
                return item;
            });

            state = {
              ...state,
              requestPending: undefined,
              requestRejected: undefined,
              requestServerError: undefined,
              pageItemsList: items,
              pageItemsDetails: (items && items.length > 0 ? items[0] : null)
            };
          }
        }

        break;
      default: return state;
    }
  }
  return state;
}