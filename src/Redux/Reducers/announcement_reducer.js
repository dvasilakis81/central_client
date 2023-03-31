export default function (state = {}, action, root) {

  if (action) {
    switch (action.type) {
      case 'RESET_ACTION':
        console.log('RESET_ACTION');
        state = {}
        break;
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
          newAnnouncementAdded: false,
          requestPending: 'Add announcement items pending',
        };
        break;
      case 'ADD_ANNOUNCEMENT_REJECTED':
        state = {
          ...state,

          newAnnouncementAdded: false,
          requestPending: undefined,
          requestRejected: action.payload,
          requestServerError: undefined
        };
        break;
      case 'ADD_ANNOUNCEMENT_FULFILLED':
        state = {
          ...state,
          newAnnouncementAdded: true,
          addAnnouncementItemPending: undefined,
          addAnnouncementItemRejected: undefined
        };
        break;
      case 'SET_ADDED_NEWANNOUNCEMENT':
        state = {
          ...state,
          newAnnouncementAdded: action.payload
        };
        break;
      case 'EDIT_ANNOUNCEMENT_PENDING':
        state = {
          ...state,
          editPage: false,
          editAnnouncementItemPending: 'Add announcement items pending',
          editAnnouncementItemRejected: undefined
        };
        break;
      case 'EDIT_ANNOUNCEMENT_REJECTED':
        state = {
          ...state,
          editPage: false,
          requestPending: undefined,
          requestRejected: action.payload
        };
        break;
      case 'EDIT_ANNOUNCEMENT_FULFILLED':

        const updatedList = [];
        if (state.announcementsList) {

          var updatedItem = action.payload[0];
          state.announcementsList.forEach((item, index) => {
            if (item.Id === updatedItem.Id)
              updatedList.push(updatedItem);
            else
              updatedList.push(item);
          });
        }

        state = {
          ...state,
          editAnnouncementItemPending: undefined,
          editAnnouncementItemRejected: undefined,
          announcementsList: updatedList,
          announcementItemDetails: action.payload ? action.payload[0] : undefined
        };

        // const updatedList = [];
        // if (state.announcementsList) {
        //   var updatedItem = action.payload[0];
        //   state.announcementsList.forEach((item, index) => {
        //     if (item.Id === updatedItem.Id)
        //       updatedList.push(updatedItem);
        //     else
        //       updatedList.push(item);
        //   });
        // }

        // state = {
        //   ...state,
        //   editMenuItemPending: undefined,
        //   editMenuItemRejected: undefined,
        //   announcementsList: updatedList,
        //   announcementItemDetails: state.announcementItemDetails || (state.announcementsList ? state.announcementsList[0] : undefined)
        // };
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
            let found = false;
            if (item.Id === serverResponse.id)
              found = true;

            if (found === false)
              return item;
          });

          state = {
            ...state,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: undefined,
            announcementsList: items,
            announcementItemDetails: (items && items.length > 0 ? items[0] : undefined)
          };
        }

        break;
      default: return state;
    }
  }

  return state;
}