export default function (state = {}, action, root) {

  if (action) {
    switch (action.type) {
      case 'RESET_ACTION':
        console.log('RESET_ACTION');
        state = {}
        break;

        state = {
          ...state,
          announcementItemDetails: action.payload
        };
        break;
      case 'DELETE_ITEM_PENDING':

        state = {
          ...state,
          openMessage: false,
          deleteItemPending: true,
          deleteItemRejected: undefined          
        };
        break;
      case 'DELETE_ITEM_REJECTED':

        state = {
          ...state,          
          deleteItemPending: undefined,
          deleteItemRejected: true          
        };
        break;
      case 'DELETE_ITEM_FULFILLED':
        var serverResponse = action.payload;
        if (serverResponse) {
          var items = [];
          if (serverResponse.kind === 1)
            items = state.menuItemsList;
          else if (serverResponse.kind === 2)
            items = state.pageItemsList;
          else if (serverResponse.kind === 3)
            items = state.mediaItemsList;
          else if (serverResponse.kind === 4)
            items = state.announcementItemsList;

          let filteredItems = items.filter((item) => {
            let found = false;
            if (item.Id === action.payload.id)
              found = true;

            if (found === false)
              return item;
          });

          if (serverResponse.kind === 1){
            state = {
              ...state,
              deleteItemPending: undefined,
              deleteItemRejected: undefined,
              menuItemsList: items,
              menuItemsDetails: (items && items.length > 0 ? items[0] : null)
            };
          } else if (serverResponse.kind === 2){
            state = {
              ...state,
              deleteItemPending: undefined,
              deleteItemRejected: undefined,
              pageItemsList: items,
              pageItemDetails: (items && items.length > 0 ? items[0] : null)
            };
          } else if (serverResponse.kind === 3) {
            state = {
              ...state,
              deleteItemPending: undefined,
              deleteItemRejected: undefined,
              mediaItemsList: items,
              mediaItemsDetails: (items && items.length > 0 ? items[0] : null)
            };
          } else if (serverResponse.kind === 4) {
            state = {
              ...state,
              deleteAnnouncementPending: undefined,
              deleteAnnouncementRejected: undefined,
              announcementsList: items,
              announcementItemDetails: (items && items.length > 0 ? items[0] : null)
            };
          }
        }

        break;
      default: return state;
    }
  }

  return state;
}