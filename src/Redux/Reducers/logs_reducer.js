export default function (state = {}, action) {

  switch (action.type) {
    case 'GET_LOGS_PENDING':
      state = {
        ...state,
        requestPending: 'Get page items pending',
        requestRejected: undefined,
        requestServerError: undefined,
        logItemsList: undefined
      };
      break;
    case 'GET_LOGS_REJECTED':
      state = {
        ...state,
        requestPending: undefined,
        requestRejected: action.payload,
        logItemsList: undefined,
        logItemDetails: undefined
      };
      break;
    case 'GET_LOGS_FULFILLED':
      var serverResponse = action.payload;
      if (serverResponse && serverResponse.servererrormessage) {
        state = {
          ...state,
          requestPending: undefined,
          requestRejected: undefined,
          requestServerError: serverResponse,
          logItemsList: undefined
        };
      } else if (serverResponse && serverResponse.tokenIsValid !== undefined) {
        state = {
          ...state,
          requestPending: undefined,
          requestRejected: undefined,
          requestServerError: undefined,
          logItemsList: action.payload
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
            logItemsList: itemsList,
            logItemDetails: state.logItemDetails || itemDetails
          };
        } else {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: undefined,
            logItemsList: [],
            logItemDetails: undefined
          };
        }
      }
      break;
    case 'SET_LOGITEM_DETAIL':
      state = {
        ...state,
        logItemDetails: action.payload
      };
      break;
    default:
      return state;
  }

  return state;
}