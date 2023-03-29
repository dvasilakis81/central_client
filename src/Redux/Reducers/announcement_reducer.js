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
          announcementsPending: 'Get announcement items pending',
          announcementsRejected: undefined
        };
        break;
      case 'GET_ANNOUNCEMENTS_FULFILLED':
        if (action.payload.tokenIsValid !== undefined) {
          state = {
            ...state,
            announcementsPending: undefined,
            announcementsRejected: undefined,
            announcementsList: action.payload
          };
        } else {
          var serverData = action.payload;
          if (serverData && serverData[0]) {
            var serverAnnouncementItems = serverData;
            var selectedAnnouncementItem = state.announcementsDetails;
            let announcements = serverAnnouncementItems.filter((item) => {
              let found = false;
              if (state.announcementsList) {
                for (let i = 0; i < state.announcementsList.length; i++) {
                  if (state.announcementsList[i].Id === item.Id) {
                    found = true;
                    state.announcementsList[i] = item;
                    if (selectedAnnouncementItem && selectedAnnouncementItem.Id === item.Id)
                      selectedAnnouncementItem = item;
                    break;
                  }
                }
              }

              if (found === false && item)
                return item;
            });

            let announcementsList = serverAnnouncementItems;
            state = {
              ...state,
              announcementsPending: undefined,
              announcementsRejected: undefined,
              announcementsList: announcementsList,
              announcementItemDetails: state.announcementItemDetails || (announcementsList ? announcementsList[0] : undefined)
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
        console.log('GET_ANNOUNCEMENTS_REJECTED');
        state = {
          ...state,
          announcementsPending: undefined,
          announcementsRejected: action.payload
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
          newAnnouncementAdded: false,
          addAnnouncementItemPending: 'Add announcement items pending',
          addAnnouncementItemRejected: undefined
        };
        break;
      case 'ADD_ANNOUNCEMENT_REJECTED':
        state = {
          ...state,
          newAnnouncementAdded: false,
          announcementsPending: undefined,
          announcementsRejected: action.payload
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
      case 'GET_ANNOUNCEMENT_PENDING':
        state = {
          ...state,
          announcementItem: undefined,
          getAnnouncementItemPending: 'Get announcement item pending',
          getAnnouncementItemRejected: undefined
        };
        break;
      case 'GET_ANNOUNCEMENT_REJECTED':
        state = {
          ...state,
          announcementItem: undefined,
          getAnnouncementItemPending: undefined,
          getAnnouncementItemRejected: action.payload
        };
        break;
      case 'GET_ANNOUNCEMENT_FULFILLED':
        state = {
          ...state,
          announcementItem: action.payload,
          getAnnouncementItemPending: undefined,
          getAnnouncementItemRejected: undefined
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
          editAnnouncementItemsPending: undefined,
          editAnnouncementItemsRejected: action.payload
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
      case 'GET_ANNOUNCEMENTINFO_PENDING':

        state = {
          ...state,
          announcementInfoPending: 'Get announcement info pending',
          announcementInfoRejected: undefined
        };
        break;
      case 'GET_ANNOUNCEMENTINFO_FULFILLED':
        state = {
          ...state,
          announcementInfoPending: undefined,
          announcementInfoRejected: undefined,
          announcementInfo: action.payload
        };
        break;
      case 'GET_ANNOUNCEMENTTABINFO_PENDING':

        state = {
          ...state,
          announcementTabInfoPending: 'Get announcement info pending',
          announcementTabInfoRejected: undefined,
          announcementTabInfo: undefined
        };
        break;
      case 'GET_ANNOUNCEMENTTABINFO_REJECTED':

        state = {
          ...state,
          announcementTabInfoPending: undefined,
          announcementTabInfoRejected: 'Get tab info rejected',
          announcementTabInfo: undefined
        };
        break;
      case 'GET_ANNOUNCEMENTTABINFO_FULFILLED':
        state = {
          ...state,
          announcementTabInfoPending: undefined,
          announcementTabInfoRejected: undefined,
          announcementTabInfo: action.payload
        };
        break;
      case 'GET_ANNOUNCEMENTS_REJECTED':
        state = {
          ...state,
          announcementInfoPending: undefined,
          announcementInfoRejected: 'Αποτυχία στην προσπάθεια προσκόμισης σελίδας',
          announcementInfo: undefined
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
          deleteAnnouncementPending: true,
          deleteAnnouncementRejected: undefined,
          deletedAnnouncementFulfilled: undefined
        };
        break;
      case 'DELETE_ANNOUNCEMENT_REJECTED':

        state = {
          ...state,
          variant: 'error',
          openMessage: true,
          message: 'Αποτυχία διαγραφής! ' + (action.payload ? action.payload.message : ''),
          deleteAnnouncementPending: undefined,
          deleteAnnouncementRejected: true,
          deletedAnnouncementFulfilled: undefined
        };
        break;
      case 'DELETE_ANNOUNCEMENT_FULFILLED':

        if (action.payload) {
          let items = state.announcementsList.filter((item) => {
            let found = false;
            if (item.Id === action.payload.id)
              found = true;

            if (found === false)
              return item;
          });

          state = {
            ...state,            
            deleteAnnouncementPending: undefined,
            deleteAnnouncementRejected: undefined,            
            announcementsList: items,
            announcementItemDetails: (items && items.length > 0 ? items[0] : null)
          };
        }

        break;
      default: return state;
    }
  }

  return state;
}