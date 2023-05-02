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
      case 'OPEN_CATEGORIES': {
        console.log('OPEN_CATEGORIES');
        state = {
          ...state,
          opencategories: true
        };
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