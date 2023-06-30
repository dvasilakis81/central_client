export default function (state = {}, action, root) {

  if (action) {
    switch (action.type) {      
      case 'GET_ANNOUNCEMENTS_PENDING':
        state = {
          ...state,
          requestRejected: undefined,
          requestServerError: undefined,
          requestPending: 'Get announcement items pending',
        };
        break;
      case 'GET_ANNOUNCEMENTS_FULFILLED':
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
            announcementsList: serverResponse
          };
        } else {
          if (serverResponse && serverResponse.length > 0) {
            var itemsList = serverResponse;
            var itemDetails = itemsList ? itemsList[0] : undefined;
            state = {
              ...state,
              announcementsPending: undefined,
              announcementsRejected: undefined,
              announcementsList: itemsList,
              announcementItemDetails: state.announcementItemDetails || itemDetails
            };
          } else {
            state = {
              ...state,
              announcementsPending: undefined,
              announcementsRejected: undefined,
              announcementsList: null,
              announcementsDetails: null
            };
          }
        }
        break;
      case 'GET_ANNOUNCEMENTS_REJECTED':
        state = {
          ...state,
          requestPending: undefined,
          requestRejected: action.payload,
          requestServerError: undefined
        };
        break;
      case 'SET_ANNOUNCEMENT_DETAIL':
        state = {
          ...state,
          announcementItemDetails: action.payload
        };
        break;
      case 'ADD_ANNOUNCEMENT_PENDING':
        state = {
          ...state,
          requestRejected: undefined,
          requestServerError: undefined,
          newItemAdded: false,
          requestPending: 'Add announcement items pending',
        };
        break;
      case 'ADD_ANNOUNCEMENT_REJECTED':

        state = {
          ...state,

          newItemAdded: false,
          requestPending: undefined,
          requestRejected: action.payload,
          requestServerError: undefined
        };
        break;
      case 'ADD_ANNOUNCEMENT_FULFILLED':
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
            announcementsList: [...state.announcementsList, serverResponse],
            announcementItemDetails: serverResponse
          };
        }

        state = {
          ...state,
          newItemAdded: true,
          requestPending: undefined,
          requestRejected: undefined
        };
        break;
      case 'SET_ADDED_NEWANNOUNCEMENT':
        state = {
          ...state,
          newItemAdded: action.payload,
          itemChanged: action.payload
        };
        break;
      case 'EDIT_ANNOUNCEMENT_PENDING':
        state = {
          ...state,
          itemChanged: false,
          requestServerError: undefined,
          requestPending: 'Add announcement items pending',
          requestRejected: undefined
        };
        break;
      case 'EDIT_ANNOUNCEMENT_REJECTED':
        state = {
          ...state,
          itemChanged: false,
          requestPending: undefined,
          requestServerError: undefined,
          requestRejected: action.payload
        };
        break;
      case 'EDIT_ANNOUNCEMENT_FULFILLED':
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
          if (state.announcementsList) {
            state.announcementsList.forEach((item, index) => {
              if (item.Id === serverResponse.Id)
                updatedList.push(serverResponse);
              else
                updatedList.push(item);
            });
          }


          var itemDetails = serverResponse || state.announcementItemDetails;
          state = {
            ...state,
            itemChanged: true,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: undefined,
            announcementsList: updatedList,
            announcementItemDetails: itemDetails
          };
        }
        break;
      case 'GET_ANNOUNCEMENTS_REJECTED':
        state = {
          ...state,
          requestPending: undefined,
          requestRejected: action.payload,
          announcementsList: undefined
        };
        break;
      case 'SET_SELECTED_ANNOUNCEMENT_TAB':
        var selectedItem = action.payload;
        state = {
          ...state,
          selectedPageTab: selectedItem.tab || 0,
          selectedAnnouncementItem: selectedItem.item,
        };
        break;
      case 'SET_ANNOUNCEMENTITEM_DETAIL':

        state = {
          ...state,
          announcementItemDetails: action.payload
        };
        break;
      case 'DELETE_ANNOUNCEMENT_PENDING':

        state = {
          ...state,
          openMessage: false,
          requestPending: true,
          requestRejected: undefined,
          requestServerError: undefined
        };
        break;
      case 'DELETE_ANNOUNCEMENT_REJECTED':

        state = {
          ...state,
          requestPending: undefined,
          requestRejected: action.payload,
          requestServerError: undefined
        };
        break;
      case 'DELETE_ANNOUNCEMENT_FULFILLED':
        var serverResponse = action.payload;
        if (serverResponse) {
          let items = state.announcementsList.filter((item) => {
            if (item.Id !== serverResponse.id)
              return item;
          });

          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: undefined,
            announcementsList: items,
            announcementItemDetails: undefined
          };
        }

        break;
      default: return state;
    }
  }

  return state;
}