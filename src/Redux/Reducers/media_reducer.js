export default function (state = {}, action, root) {

  if (action) {
    switch (action.type) {
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
          processItem: false,
          requestPending: 'Add media items pending',
          requestServerError: undefined,
          requestRejected: undefined
        };
        break;
      case 'ADD_MEDIAITEM_FULFILLED':
        var serverResponse = action.payload;
        if (serverResponse && serverResponse.servererrormessage) {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: serverResponse,
            processItem: false
          };
        } else {

          state = {
            ...state,
            processItem: true,
            requestServerError: undefined,
            requestPending: undefined,
            requestRejected: undefined,
            mediaItemsList: [...state.mediaItemsList, serverResponse],
            mediaItemDetails: serverResponse
          };
        }
        break;
      case 'ADD_MEDIAITEM_REJECTED':
        state = {
          ...state,
          processItem: false,
          requestPending: undefined,
          requestServerError: undefined,
          requestRejected: action.payload
        };
        break;
      case 'EDIT_MEDIAITEM_PENDING':
        state = {
          ...state,
          processItem: false,
          requestPending: 'Edit media item pending',
          requestServerError: undefined,
          requestRejected: undefined
        };
        break;
      case 'EDIT_MEDIAITEM_FULFILLED':
        var serverResponse = action.payload;
        if (serverResponse && serverResponse.errormessage) {

          state = {
            ...state,
            processItem: false,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: serverResponse.errormessage
          };
        } else {
          const updatedList = [];
          if (state.mediaItemsList) {
            state.mediaItemsList.forEach((item, index) => {
              if (item.Id === serverResponse.Id)
                updatedList.push(serverResponse);
              else
                updatedList.push(item);
            });
          }

          var itemDetails = serverResponse || state.mediaItemDetails;
          state = {
            ...state,
            processItem: true,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: undefined,
            mediaItemsList: updatedList,
            mediaItemDetails: itemDetails
          };
        }
        break;
      case 'EDIT_MEDIAITEM_REJECTED':
        state = {
          ...state,
          processItem: false,
          requestPending: undefined,
          requestServerError: undefined,
          requestRejected: action.payload
        };
        break;
      case 'DELETE_MEDIA_PENDING':

        state = {
          ...state,
          openMessage: false,
          requestPending: true,
          requestRejected: undefined,
          requestServerError: undefined
        };
        break;
      case 'DELETE_MEDIA_REJECTED':

        state = {
          ...state,
          requestPending: undefined,
          requestRejected: action.payload,
          requestServerError: undefined
        };
        break;
      case 'DELETE_MEDIA_FULFILLED':
        var serverResponse = action.payload;
        if (serverResponse) {
          let items = state.mediaItemsList.filter((item) => {
            if (item.Id !== serverResponse.id)
              return item;
          });

          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: undefined,
            mediaItemsList: items,
            mediaItemDetails: undefined
          };
        }

        break;
      case 'SET_MEDIAITEM_STATUS':
        state = {
          ...state,          
          processItem: action.payload
        };
        break;
      default: return state;
    }
  }
  return state;
}