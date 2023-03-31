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
      default:
        break;
    }
  }
  return state;
}