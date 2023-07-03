export default function (state = {}, action, root) {

  if (action) {
    switch (action.type) {

      case 'RESET_ACTION':
        window.localStorage.clear();
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
      case 'OPEN_POP_UP': {
        state = {
          ...state,
          openPopUp: action.payload
        }
        break;
      }
      case 'CLOSE_POP_UP': {
        state = {
          ...state,
          openPopUp: false
        }
        break;
      }
      case 'SET_DIV_POSITION': {
        state = {
          ...state,
          divPosition: action.payload
        };
        break;
      }
      case 'SET_SELECTED_CENTRAL_MENU': {
        state = {
          ...state,
          selectedCentralMenu: action.payload
        }
        break;
      }
      case 'SET_HEADER_TITLE':
        state = {
          ...state,
          headerTitleValue: action.payload          
        };
        break;
      default:
        break;
    }
  }
  return state;
}