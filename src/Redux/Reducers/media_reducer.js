export default function (state = {}, action, root) {
  //console.log(action.type);	
  switch (action.type) {
    case 'RESET_ACTION':
      console.log('RESET_ACTION')
      state = {}
      break;
    case 'GET_MEDIAITEMS_PENDING':      
      state = {
        ...state,
        mediaItemsPending: 'Get media items pending',
        mediaItemsRejected: undefined
      };
      break;
    case 'GET_MEDIAITEMS_FULFILLED':
      if (action.payload.tokenIsValid !== undefined) {
        state = {
          ...state,
          mediaItemsPending: undefined,
          mediaItemsRejected: undefined,
          mediaItemsList: action.payload
        };
      } else {
        var serverData = action.payload;
        if (serverData[0] == null) {
          state = {
            ...state,
            mediaItemsPending: undefined,
            mediaItemsRejected: undefined,
            mediaItemsList: null,
            mediaItemsDetails: null
          };
        } else {
          var serverItems = serverData;
          var selectedItem = state.mediaItemsDetails;

          state = {
            ...state,
            mediaItemsPending: undefined,
            mediaItemsRejected: undefined,
            mediaItemsList: serverItems,
            mediaItemDetails: state.mediaItemDetails || (serverItems ? serverItems[0] : undefined)
          };
        }
      }
      break;    
    case 'GET_MEDIAITEMS_REJECTED':
      console.log('GET_MEDIAITEMS_REJECTED');
      state = {
        ...state,
        mediaItemsPending: undefined,
        mediaItemsRejected: action.payload
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
        addMediaItemRejected: undefined
      };
      break;
    case 'ADD_MEDIAITEM_FULFILLED':
      state = {
        ...state,
        newMediaAdded: true,
        addMediaItemPending: undefined,
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
        mediaItemsPending: undefined,
        mediaItemsRejected: action.payload
      };
      break;
    default: return state;
  }

  return state;
}