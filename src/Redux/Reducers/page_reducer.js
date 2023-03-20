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
          pageItemsPending: 'Get page items pending',
          pageItemsRejected: undefined
        };
        break;
      case 'GET_PAGEITEMS_FULFILLED':
        if (action.payload.tokenIsValid !== undefined) {
          state = {
            ...state,
            pageItemsPending: undefined,
            pageItemsRejected: undefined,
            pageItemsList: action.payload
          };
        } else {
          var serverData = action.payload;
          if (serverData[0] == null) {
            state = {
              ...state,
              pageItemsPending: undefined,
              pageItemsRejected: undefined,
              pageItemsList: null,
              pageItemsDetails: null
            };
          } else {
            var serverPageItems = serverData;
            var selectedPageItem = state.pageItemsDetails;
            let pageItems = serverPageItems.filter((item) => {
              let found = false;
              if (state.pageItemsList) {
                for (let i = 0; i < state.pageItemsList.length; i++) {
                  if (state.pageItemsList[i].Id === item.Id) {
                    found = true;
                    state.pageItemsList[i] = item;
                    if (selectedPageItem && selectedPageItem.Id === item.Id)
                      selectedPageItem = item;
                    break;
                  }
                }
              }

              if (found === false && item)
                return item;
            });

            let pageItemsList = serverPageItems;
            state = {
              ...state,
              pageItemsPending: undefined,
              pageItemsRejected: undefined,
              pageItemsList: pageItemsList,
              pageItemDetails: state.pageItemDetails || (pageItemsList ? pageItemsList[0] : undefined)
            };
          }
        }
        break;
      case 'GET_PAGEITEMS_REJECTED':
        console.log('GET_PAGEITEMS_REJECTED');
        state = {
          ...state,
          pageItemsPending: undefined,
          pageItemsRejected: action.payload
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
          addPageItemPending: 'Add page items pending',
          addPageItemRejected: undefined
        };
        break;
      case 'ADD_PAGEITEM_REJECTED':
        state = {
          ...state,
          newPageAdded: false,
          pageItemsPending: undefined,
          pageItemsRejected: action.payload
        };
        break;
      case 'ADD_PAGEITEM_FULFILLED':
        state = {
          ...state,
          newPageAdded: true,
          addPageItemPending: undefined,
          addPageItemRejected: undefined
        };
        break;
      case 'GET_PAGEITEM_PENDING':
        state = {
          ...state,
          pageItem: undefined,
          getPageItemPending: 'Get page item pending',
          getPageItemRejected: undefined
        };
        break;
      case 'GET_PAGEITEM_REJECTED':
        state = {
          ...state,
          pageItem: undefined,
          getPageItemPending: undefined,
          getPageItemRejected: action.payload
        };
        break;
      case 'GET_PAGEITEM_FULFILLED':
        state = {
          ...state,
          pageItem: action.payload,
          getPageItemPending: undefined,
          getPageItemRejected: undefined
        };
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
          editPageItemPending: 'Add page items pending',
          editPageItemRejected: undefined
        };
        break;
      case 'EDIT_PAGEITEM_REJECTED':
        state = {
          ...state,
          editPage: false,
          editPageItemsPending: undefined,
          editPageItemsRejected: action.payload
        };
        break;
      case 'EDIT_PAGEITEM_FULFILLED':

        const updatedList = [];
        if (state.pageItemsList) {
          var updatedItem = action.payload[0];
          state.pageItemsList.forEach((item, index) => {
            if (item.Id === updatedItem.Id)
              updatedList.push(updatedItem);
            else
              updatedList.push(item);
          });
        }

        state = {
          ...state,
          editMenuItemPending: undefined,
          editMenuItemRejected: undefined,
          pageItemsList: updatedList,
          pageItemDetails: state.pageItemDetails || (state.pageItemsList ? state.pageItemsList[0] : undefined)
        };
        break;
      case 'GET_PAGEINFO_PENDING':

        state = {
          ...state,
          pageInfoPending: 'Get page info pending',
          pageInfoRejected: undefined
        };
        break;
      case 'GET_PAGEINFO_FULFILLED':
        state = {
          ...state,
          pageInfoPending: undefined,
          pageInfoRejected: undefined,
          pageInfo: action.payload
        };
        break;
      case 'GET_PAGETABINFO_PENDING':

        state = {
          ...state,
          pageTabInfoPending: 'Get page info pending',
          pageTabInfoRejected: undefined,
          pageTabInfo: undefined
        };
        break;
      case 'GET_PAGETABINFO_REJECTED':

        state = {
          ...state,
          pageTabInfoPending: undefined,
          pageTabInfoRejected: 'Get tab info rejected',
          pageTabInfo: undefined
        };
        break;
      case 'GET_PAGETABINFO_FULFILLED':
        state = {
          ...state,
          pageTabInfoPending: undefined,
          pageTabInfoRejected: undefined,
          pageTabInfo: action.payload
        };
        break;
      case 'GET_PAGEITEMS_REJECTED':
        state = {
          ...state,
          pageInfoPending: undefined,
          pageInfoRejected: 'Αποτυχία στην προσπάθεια προσκόμισης σελίδας',
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
      default: return state;
    }
  }
  return state;
}