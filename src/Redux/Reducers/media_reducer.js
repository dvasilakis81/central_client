export default function (state = {}, action, root) {

  if (action) {
    switch (action.type) {
      case 'RESET_ACTION':
        state = {}
        break;
      case 'GET_MEDIAITEMS_PENDING':
        state = {
          ...state,
          requestPending: 'Get media items pending',
          requestRejected: undefined,
          requestServerError: undefined
        };
        break;
      case 'GET_MEDIAITEMS_FULFILLED':
        var serverResponse = action.payload;
        if (serverResponse && serverResponse.servererrormessage) {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: serverResponse,
            pageItemsList: undefined
          };
        } else if (serverResponse.tokenIsValid !== undefined) {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: undefined,
            mediaItemsList: serverResponse
          };
        } else {
          if (serverResponse && serverResponse.length > 0) {
            var itemsList = serverResponse;
            var itemDetails = state.mediaItemDetails || (itemsList ? itemsList[0] : undefined);

            state = {
              ...state,
              requestPending: undefined,
              requestRejected: undefined,
              requestServerError: undefined,
              mediaItemsList: itemsList,
              mediaItemDetails: itemDetails
            };
          } else {

            state = {
              ...state,
              requestPending: undefined,
              requestRejected: undefined,
              requestServerError: undefined,
              mediaItemsList: null,
              mediaItemsDetails: null
            };
          }
        }
        break;
      case 'GET_MEDIAITEMS_REJECTED':

        state = {
          ...state,
          requestPending: undefined,
          requestRejected: action.payload,
          requestServerError: undefined
        };
        break;
      case 'SET_MEDIAITEM_DETAIL':
        state = {
          ...state,
          mediaItemDetails: action.payload
        };
        break;
      case 'ADD_MEDIAITEM_PENDING':
        state = {
          ...state,
          newMediaAdded: false,
          addMediaItemPending: 'Add media items pending',
          requestServerError: undefined,
          addMediaItemRejected: undefined
        };
        break;
      case 'ADD_MEDIAITEM_FULFILLED':
        state = {
          ...state,
          newMediaAdded: true,
          addMediaItemPending: undefined,
          requestServerError: undefined,
          addMediaItemRejected: undefined
        };
        break;
      case 'SET_ADDED_NEWITEM':
        state = {
          ...state,
          newMediaAdded: false,
        };
        break;
      case 'ADD_MEDIAITEM_REJECTED':
        state = {
          ...state,
          newMediaAdded: false,
          requestPending: undefined,
          requestServerError: undefined,
          requestRejected: action.payload
        };
        break;
      default: return state;
    }
  }
  return state;
}