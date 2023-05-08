import { CoPresentOutlined } from "@mui/icons-material";

export default function (state = {}, action, root) {
  
  if (action) {
    switch (action.type) {

      case 'RESET_ACTION':
        state = {}
        break;
      case 'DO_REFRESH':
        state = { ...state, doRefresh: action.payload }
        break;
      case 'SET_SELECTED_TAB_ADMIN':
        state = { ...state, selectedTabAdmin: action.payload }
        break;
      case 'SCREEN_DIMENSIONS':
        state = { ...state, screenDimensions: action.payload }
        break;
      case 'SHOW_SNACKBAR':
        state = {
          ...state,
          snackBarInfo: action.payload
        };
        break;
      case 'CLOSE_SNACKBAR':
        state = {
          ...state,
          snackBarInfo: action.payload
        };
        break;
      case 'SET_SEARCH_VALUE':
        state = {
          ...state,
          searchValue: action.payload
        }
        break;
      case 'GET_CATEGORIES_PENDING':
        state = {
          ...state,
          requestPending: 'Get categories pending',
          requestRejected: undefined,
          requestServerError: undefined,
          categoriesList: undefined
        };
        break;
      case 'ADD_CATEGORY_PENDING':
        state = {
          ...state,
          newItemAdded: false,
          requestPending: 'Add category pending',
          requestServerError: undefined,
          requestRejected: undefined
        };
        break;
      case 'ADD_CATEGORY_REJECTED':        
        var serverResponse = action.payload;
        state = {
          ...state,
          newItemAdded: false,
          requestPending: undefined,
          requestServerError: undefined,
          requestRejected: serverResponse
        };
        break;
      case 'ADD_CATEGORY_FULFILLED':        
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

          // return state.categoriesListslice().sort(function(a, b) {
          //   var nameA = a.name.toLowerCase(),
          //     nameB = b.name.toLowerCase()
          //   if (nameA < nameB)
          //     return -1
          //   if (nameA > nameB)
          //     return 1
          //   return 0
          // })

          state = {
            ...state,
            newItemAdded: true,
            requestServerError: undefined,
            requestPending: undefined,
            requestRejected: undefined,
            categoriesList: [serverResponse, ...state.categoriesList]
          };
        }
        break;
      case 'EDIT_CATEGORY_PENDING':
        state = {
          ...state,
          itemChanged: false,
          requestServerError: undefined,
          requestPending: 'Edit category pending',
          requestRejected: undefined
        };
        break;
      case 'EDIT_CATEGORY_REJECTED':
        state = {
          ...state,
          itemChanged: false,
          requestPending: undefined,
          requestServerError: undefined,
          requestRejected: action.payload
        };
        break;
      case 'EDIT_CATEGORY_FULFILLED':

        var serverResponse = action.payload;
        if (serverResponse && serverResponse.errormessage) {

          state = {
            ...state,
            itemChanged: false,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: serverResponse.errormessage
          };
        } else {
          const updatedList = [];
          if (state.categoriesList) {
            state.categoriesList.forEach((item, index) => {
              if (item.Id === serverResponse.Id)
                updatedList.push(serverResponse);
              else
                updatedList.push(item);
            });
          }

          state = {
            ...state,
            itemChanged: true,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: undefined,
            categoriesList: updatedList
          };
        }
        break;
      case 'GET_CATEGORIES_REJECTED':
        state = {
          ...state,
          requestPending: undefined,
          requestRejected: action.payload,
          requestServerError: undefined,
          categoriesList: undefined
        };
        break;
      case 'GET_CATEGORIES_FULFILLED':
        var serverResponse = action.payload;
        if (serverResponse && serverResponse.servererrormessage) {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: serverResponse,
            categoriesList: undefined
          };
        } else if (serverResponse && serverResponse.tokenIsValid !== undefined) {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: undefined,
            categoriesList: action.payload
          };
        } else {
          if (serverResponse && serverResponse.length > 0) {
            var itemsList = serverResponse;

            state = {
              ...state,
              requestPending: undefined,
              requestRejected: undefined,
              requestServerError: undefined,
              categoriesList: itemsList
            };
          } else {
            state = {
              ...state,
              requestPending: undefined,
              requestRejected: undefined,
              requestServerError: undefined,
              categoriesList: []
            };
          }
        }
        break;
      case 'UPDATE_CATEGORY_LIST_ITEM':
        const updatedList = [];
        var catItem = action.payload;
        if (state.categoriesList) {
          state.categoriesList.forEach((item, index) => {
            if (item.Id === catItem.Id) {
              var newItem = item;
              newItem.Name = catItem.val;
              updatedList.push(newItem);
            }
            else
              updatedList.push(item);
          });
        }

        state = {
          ...state,
          categoriesList: updatedList
        };
        break;
      case 'EDIT_CATEGORY_LIST_ITEM':
        const updatedList2 = [];
        var catItem = action.payload;
        if (state.categoriesList) {
          state.categoriesList.forEach((item, index) => {
            if (item.Id === catItem.Id) {
              var newItem = item;
              newItem.Name = catItem.val;
              updatedList.push(newItem);
            }
            else
              updatedList.push(item);
          });
        }

        state = {
          ...state,
          categoriesList: updatedList2
        };
        break;

      case 'OPEN_CATEGORIES': {
        state = {
          ...state,
          opencategories: true
        };
        break;
      }
      case 'CLOSE_CATEGORIES': {
        state = {
          ...state,
          opencategories: false
        };
      }
      default:
        break;
    }
  }
  return state;
}