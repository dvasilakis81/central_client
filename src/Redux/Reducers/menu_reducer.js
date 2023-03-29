export default function (state = {}, action, root) {
  // console.log('MENU action: ' + action);
  if (action) {
    switch (action.type) {
      case 'RESET_ACTION':
        console.log('RESET_ACTION')
        state = {}
        break;
      case 'GET_MENUITEMS_PENDING':
        state = {
          ...state,
          menuItemsPending: 'Get menu items pending',
          menuItemsRejected: undefined
        };
        break;
      case 'GET_MENUITEMS_FULFILLED':
        if (action.payload.tokenIsValid !== undefined) {
          state = {
            ...state,
            menuItemsPending: undefined,
            menuItemsRejected: undefined,
            menuItemsList: action.payload
          };
        } else {
          var serverData = action.payload;
          if (serverData[0] == null) {
            state = {
              ...state,
              menuItemsPending: undefined,
              menuItemsRejected: undefined,
              menuItemsList: null,
              menuItemsDetails: null
            };
          } else {
            var serverMenuItems = serverData;
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
              menuItemsPending: undefined,
              menuItemsRejected: undefined,
              menuItemsList: serverMenuItems,
              menuItemDetails: selectedMenuItem,
              serviceItemDetails: selectedServiceItem
            };
          }
        }
        break;
      case 'GET_MENUITEMS_REJECTED':
        console.log('GET_MENUITEMS_REJECTED');
        state = {
          ...state,
          menuItemsPending: undefined,
          menuItemsRejected: action.payload
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
        // let updatedList = state.menuItemsList.map((item) => {

        //   var updatedItem = action.payload[0];
        //   // if (item.Id === updatedItem.Id) {
        //   //   item.Url = updatedItem.Url
        //   // }

        //   var updatedItem = action.payload[0];
        //   if (item.Id === updatedItem.Id) {
        //     item = updatedItem;
        //   }

        //   return item;
        // })
        const updatedList = [];
        if (state.menuItemsList) {

          var updatedItem = action.payload[0];
          state.menuItemsList.forEach((item, index) => {
            if (item.Id === updatedItem.Id) {
              updatedList.push(updatedItem);
              console.log('updatedItem: ' + updatedItem);
            }
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
            menuItemList: items,
            menuItemDetails: (items && items.length > 0 ? items[0] : null)
          };
        }

        break;
    }
  }
  return state;
}

//  EDIT_MENUITEM