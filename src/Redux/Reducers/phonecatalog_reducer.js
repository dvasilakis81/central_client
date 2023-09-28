export default function (state = {}, action, root) {

  if (action) {
    switch (action.type) {
      case 'SEARCH_PHONECATALOGINFO_PENDING':
        state = {
          ...state,
          requestPending: 'Get phone catalog pending',
          requestRejected: undefined,
          requestServerError: undefined,
          phoneCatalogList: undefined
        };
        break;
      case 'SEARCH_PHONECATALOGINFO_FULFILLED':
        var serverResponse = action.payload;
        if (serverResponse && serverResponse.servererrormessage) {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: serverResponse,
            searchPhoneCatalogList: [],
            searchPhoneCatalogList: undefined
          };
        } else if (serverResponse && serverResponse.tokenIsValid !== undefined) {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: undefined,
            searchPhoneCatalogList: [],
            searchPhoneCatalogList: action.payload
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
              searchPhoneCatalogList: itemsList
            };
          } else {
            state = {
              ...state,
              requestPending: undefined,
              requestRejected: undefined,
              requestServerError: undefined,
              searchPhoneCatalogList: []
            };
          }
        }
        break;
      case 'SEARCH_PHONECATALOGINFO_REJECTED':
        state = {
          ...state,
          requestPending: undefined,
          requestRejected: action.payload,
          searchPhoneCatalogList: undefined
        };
        break;
      case 'SET_SEARCH_PHONECATALOGINFO':
        state = {
          ...state,
          requestPending: undefined,
          requestRejected: undefined,
          searchPhoneCatalogList: action.payload
        };
        break;
      case 'GET_PHONECATALOGINFO_PENDING':
        state = {
          ...state,
          requestPending: 'Get phone catalog pending',
          requestRejected: undefined,
          requestServerError: undefined,
          phoneCatalogList: undefined
        };
        break;
      case 'GET_PHONECATALOGINFO_FULFILLED':
        var serverResponse = action.payload;
        if (serverResponse && serverResponse.servererrormessage) {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: serverResponse,
            phoneCatalogList: undefined
          };
        } else if (serverResponse && serverResponse.tokenIsValid !== undefined) {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: undefined,
            phoneCatalogList: action.payload
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
              phoneCatalogList: itemsList
            };
          } else {
            state = {
              ...state,
              requestPending: undefined,
              requestRejected: undefined,
              requestServerError: undefined,
              phoneCatalogList: []
            };
          }
        }
        break;
      case 'GET_PHONECATALOGINFO_REJECTED':
        state = {
          ...state,
          requestPending: undefined,
          requestRejected: action.payload,
          phoneCatalogList: undefined,
        };
        break;
      case 'ADD_PHONECATALOGITEMS_PENDING':
        state = {
          ...state,
          newItemAdded: false,
          requestPending: 'Add phone catalog item pending',
          requestServerError: undefined,
          requestRejected: undefined
        };
        break;
      case 'ADD_PHONECATALOGITEMS_REJECTED':
        var serverResponse = action.payload;
        state = {
          ...state,
          newItemAdded: false,
          requestPending: undefined,
          requestServerError: undefined,
          requestRejected: serverResponse
        };
        break;
      case 'ADD_PHONECATALOGITEMS_FULFILLED':
        var serverResponse = action.payload;
        if (serverResponse && serverResponse.servererrormessage) {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: serverResponse,
            newItemAdded: false
          };
        } else {

          state = {
            ...state,
            newItemAdded: true,
            requestServerError: undefined,
            requestPending: undefined,
            requestRejected: undefined,
            phoneCatalogList: [...state.phoneCatalogList, serverResponse]
          };
        }
        break;
      case 'SET_ADDED_NEWPHONECATALOG':
        state = {
          ...state,
          newItemAdded: action.payload,
          itemChanged: action.payload
        };
        break;
      case 'EDIT_PHONECATALOGITEM_PENDING':
        state = {
          ...state,
          itemChanged: false,
          requestServerError: undefined,
          requestPending: 'Add phone catalog items pending',
          requestRejected: undefined
        };
        break;
      case 'EDIT_PHONECATALOGITEM_REJECTED':
        state = {
          ...state,
          itemChanged: false,
          requestPending: undefined,
          requestServerError: undefined,
          requestRejected: action.payload
        };
        break;
      case 'DELETE_PHONECATALOGITEM_PENDING':

        state = {
          ...state,
          openMessage: false,
          requestPending: true,
          requestRejected: undefined,
          requestServerError: undefined
        };
        break;
      case 'DELETE_PHONECATALOGITEM_REJECTED':

        state = {
          ...state,
          requestPending: undefined,
          requestRejected: action.payload,
          deletedPageItemFulfilled: undefined,
          requestServerError: undefined
        };
        break;
      case 'DELETE_PHONECATALOGITEM_FULFILLED':

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
            let items = state.phoneCatalogList.filter((item) => {
              if (item.Id !== serverResponse.id)
                return item;
            });

            state = {
              ...state,
              requestPending: undefined,
              requestRejected: undefined,
              requestServerError: undefined,
              phoneCatalogList: items,
              pageItemDetails: items && items[0]
            };
          }
        }

        break;

      default: return state;
    }
  }
  return state;
}