export default function (state = {}, action, root) {

  if (action) {
    switch (action.type) {
      case 'RESET_ACTION':        
        state = {}
        break;
      case 'GET_USERS_PENDING':
        state = {
          ...state,
          requestRejected: undefined,
          requestServerError: undefined,
          requestPending: 'Get user items pending',
        };
        break;
      case 'GET_USERS_FULFILLED':
        var serverResponse = action.payload;
        if (serverResponse && serverResponse.servererrormessage) {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: serverResponse,
            usersList: undefined
          };
        } else if (serverResponse.tokenIsValid !== undefined) {
          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: undefined,
            usersList: serverResponse
          };
        } else {
          if (serverResponse && serverResponse.length > 0) {
            var itemsList = serverResponse;
            var itemDetails = itemsList ? itemsList[0] : undefined;
            state = {
              ...state,
              usersPending: undefined,
              usersRejected: undefined,
              usersList: itemsList,
              userItemDetails: state.userItemDetails || itemDetails
            };
          } else {
            state = {
              ...state,
              usersPending: undefined,
              usersRejected: undefined,
              usersList: null,
              usersDetails: null
            };
          }
        }
        break;
      case 'GET_USERS_REJECTED':
        state = {
          ...state,
          requestPending: undefined,
          requestRejected: action.payload,
          requestServerError: undefined
        };
        break;
      case 'SET_USER_DETAIL':
        state = {
          ...state,
          userItemDetails: action.payload
        };
        break;
      case 'ADD_USER_PENDING':
        state = {
          ...state,
          requestRejected: undefined,
          requestServerError: undefined,
          newItemAdded: false,
          requestPending: 'Add user items pending',
        };
        break;
      case 'ADD_USER_REJECTED':

        state = {
          ...state,

          newItemAdded: false,
          requestPending: undefined,
          requestRejected: action.payload,
          requestServerError: undefined
        };
        break;
      case 'ADD_USER_FULFILLED':
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
            usersList: [...state.usersList, serverResponse],
            userItemDetails: serverResponse
          };
        }

        state = {
          ...state,
          newItemAdded: true,
          requestPending: undefined,
          requestRejected: undefined
        };
        break;
      case 'SET_ADDED_NEWUSER':
        state = {
          ...state,
          newItemAdded: action.payload,
          itemChanged: action.payload
        };
        break;
      case 'EDIT_USER_PENDING':
        state = {
          ...state,
          itemChanged: false,
          requestServerError: undefined,
          requestPending: 'Add user items pending',
          requestRejected: undefined
        };
        break;
      case 'EDIT_USER_REJECTED':
        state = {
          ...state,
          itemChanged: false,
          requestPending: undefined,
          requestServerError: undefined,
          requestRejected: action.payload
        };
        break;
      case 'EDIT_USER_FULFILLED':
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
          if (state.usersList) {
            state.usersList.forEach((item, index) => {
              if (item.Id === serverResponse.Id)
                updatedList.push(serverResponse);
              else
                updatedList.push(item);
            });
          }


          var itemDetails = serverResponse || state.userItemDetails;
          state = {
            ...state,
            itemChanged: true,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: undefined,
            usersList: updatedList,
            userItemDetails: itemDetails
          };
        }
        break;
      case 'GET_USERS_REJECTED':
        state = {
          ...state,
          requestPending: undefined,
          requestRejected: action.payload,
          usersList: undefined
        };
        break;
      case 'SET_SELECTED_USER_TAB':
        var selectedItem = action.payload;
        state = {
          ...state,
          selectedPageTab: selectedItem.tab || 0,
          selectedUserItem: selectedItem.item,
        };
        break;
      case 'SET_USERITEM_DETAIL':

        state = {
          ...state,
          userItemDetails: action.payload
        };
        break;
      case 'DELETE_USER_PENDING':

        state = {
          ...state,
          openMessage: false,
          requestPending: true,
          requestRejected: undefined,
          requestServerError: undefined
        };
        break;
      case 'DELETE_USER_REJECTED':

        state = {
          ...state,
          requestPending: undefined,
          requestRejected: action.payload,
          requestServerError: undefined
        };
        break;
      case 'DELETE_USER_FULFILLED':
        var serverResponse = action.payload;
        if (serverResponse) {
          let items = state.usersList.filter((item) => {
            if (item.Id !== serverResponse.id)
              return item;
          });

          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: undefined,
            usersList: items,
            userItemDetails: undefined
          };
        }

        break;
      default: return state;
    }
  }

  return state;
}