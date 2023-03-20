export default function (state = {}, action, root) {

  switch (action.type) {
    // console.log('RESET_ACTION')
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
      //console.log('action.payload: ' + JSON.stringify(action.payload));
      state = {
        ...state,
        snackBarInfo: action.payload
      };
      break;
    case 'CLOSE_SNACKBAR':
      console.log(JSON.stringify(action.payload));
      state = {
        ...state,
        snackBarInfo: action.payload
      };
      break;
    default:
      break;
  }

  return state;
}