export default function (state = {}, action, root) {
  
  if (action) {
    switch (action.type) {
      case 'RESET_ACTION':        
        state = {}
        break;
      case 'GET_MENUITEMS_PENDING':
        state = {
          ...state,
          requestPending: 'Get menu items pending',
          requestServerError: undefined,
          requestRejected: undefined
        };
        break;
      case 'GET_MENUITEMS_FULFILLED':
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
            menuItemsList: action.payload
          };
        } else {          
          if (serverResponse && serverResponse.length > 0) {

            var serverMenuItems = serverResponse;
            var menuItem;
            var serviceItem;

            for (var i = 0; i < serverMenuItems.length; i++) {
              if (serverMenuItems[i].MenuItem === 1) {
                menuItem = serverMenuItems[i];
                break;
              }
            }

            for (var i = 0; i < serverMenuItems.length; i++) {
              if (serverMenuItems[i].ServiceItem === 1) {
                serviceItem = serverMenuItems[i];
                break;
              }
            }

            var selectedMenuItem = state.menuItemDetails || (serverMenuItems ? menuItem : undefined);
            var selectedServiceItem = state.serviceItemDetails || (serverMenuItems ? serviceItem : undefined);

            state = {
              ...state,
              requestPending: undefined,
              requestRejected: undefined,
              requestServerError: undefined,
              menuItemsList: serverMenuItems,
              menuItemDetails: selectedMenuItem,
              serviceItemDetails: selectedServiceItem
            };           
          } else {
            state = {
              ...state,
              requestPending: undefined,
              requestRejected: undefined,
              requestServerError: undefined,
              menuItemsList: [],
              menuItemsDetails: undefined,
              serviceItemDetails: undefined
            };
          }

          // if (serverData[0] == null) {
          //   state = {
          //     ...state,
          //     requestPending: undefined,
          //     requestRejected: undefined,
          //     requestServerError: undefined,
          //     menuItemsList: null,
          //     menuItemsDetails: null
          //   };
          // } else {
          //   var serverMenuItems = serverData;
          //   var menuItem;
          //   var serviceItem;

          //   for (var i = 0; i < serverMenuItems.length; i++) {
          //     if (serverMenuItems[i].MenuItem === 1) {
          //       menuItem = serverMenuItems[i];
          //       break;
          //     }
          //   }

          //   for (var i = 0; i < serverMenuItems.length; i++) {
          //     if (serverMenuItems[i].ServiceItem === 1) {
          //       serviceItem = serverMenuItems[i];
          //       break;
          //     }
          //   }

          //   var selectedMenuItem = state.menuItemDetails || (serverMenuItems ? menuItem : undefined);
          //   var selectedServiceItem = state.serviceItemDetails || (serverMenuItems ? serviceItem : undefined);

          //   state = {
          //     ...state,
          //     requestPending: undefined,
          //     requestRejected: undefined,
          //     requestServerError: undefined,
          //     menuItemsList: serverMenuItems,
          //     menuItemDetails: selectedMenuItem,
          //     serviceItemDetails: selectedServiceItem
          //   };
          // }
        }
        break;
      case 'GET_MENUITEMS_REJECTED':
        
        state = {
          ...state,
          requestPending: undefined,
          requestServerError: undefined,
          requestRejected: action.payload
        };
        break;
      case 'SET_MENUITEM_DETAIL':

        state = {
          ...state,
          menuItemDetails: action.payload
        };
        break;
      case 'SET_SERVICEITEM_DETAIL':

        state = {
          ...state,
          serviceItemDetails: action.payload
        };
        break;
      case 'ADD_MENUITEM_PENDING':
        state = {
          ...state,
          newMenuAdded: false,
          addMenuItemPending: 'Add menu items pending',
          addMenuItemRejected: undefined
        };
        break;
      case 'ADD_MENUITEM_FULFILLED':
        state = {
          ...state,
          newMenuAdded: true,
          addMenuItemPending: undefined,
          addMenuItemRejected: undefined
        };
        break;
      case 'EDIT_MENUITEM_PENDING':
        state = {
          ...state,
          editMenuItemPending: 'Add menu items pending',
          editMenuItemRejected: undefined
        };
        break;
      case 'EDIT_MENUITEM_FULFILLED':
        const updatedList = [];
        if (state.menuItemsList) {

          var updatedItem = action.payload[0];
          state.menuItemsList.forEach((item, index) => {
            if (item.Id === updatedItem.Id)
              updatedList.push(updatedItem);            
            else
              updatedList.push(item);
          });
        }
        state = {
          ...state,
          editMenuItemPending: undefined,
          editMenuItemRejected: undefined,
          menuItemsList: updatedList,
          menuItemDetails: action.payload ? action.payload[0] : undefined
        };

        break;
      case 'SET_ADDED_NEWITEM':
        state = {
          ...state,
          newMenuAdded: false,
        };
        break;
      case 'SEARCH_MENUITEMS':
        var searchValue = action.payload;
        const searchList = [];
        if (searchValue !== '') {
          if (state.menuItemsList) {
            state.menuItemsList.forEach((item, index) => {
              if (item.ServiceItem === 1 && item.Name.contains(searchValue))
                searchList.push(item);
            });
          }
        }

        state = {
          ...state,
          editMenuItemPending: undefined,
          editMenuItemRejected: undefined,
          searchMenuItemsList: searchList
        };
        break;
      case 'DELETE_MENU_PENDING':

        state = {
          ...state,
          openMessage: false,
          deleteMenuItemPending: true,
          deleteMenuItemRejected: undefined,          
        };
        break;
      case 'DELETE_MENU_REJECTED':

        state = {
          ...state,       
          deleteMenuItemPending: undefined,
          deleteMenuItemRejected: true,
          deletedMenuItemFulfilled: undefined
        };
        break;
      case 'DELETE_MENU_FULFILLED':

        if (action.payload) {
          let items = state.menuItemsList.filter((item) => {
            let found = false;
            if (item.Id === action.payload.id)
              found = true;

            if (found === false)
              return item;
          });

          state = {
            ...state,
            deleteMenuItemPending: undefined,
            deleteMenuItemRejected: undefined,
            menuItemsList: items,
            menuItemsDetails: (items && items.length > 0 ? items[0] : null)
          };
        }

        break;
    }
  }
  return state;
}

//  EDIT_MENUITEM