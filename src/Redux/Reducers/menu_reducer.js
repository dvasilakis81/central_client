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
            requestServerError: serverResponse
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
            var menuItem = undefined;
            var serviceItem = undefined;

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

            var selectedMenuItem = state.menuItemDetails || menuItem;
            var selectedServiceItem = state.serviceItemDetails || serviceItem;

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
          newItemAdded: false,
          requestPending: 'Add menu items pending',
          requestServerError: undefined,
          requestRejected: undefined
        };
        break;
      case 'ADD_MENUITEM_FULFILLED':
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

          var menuItemDetails;
          var serviceItemDetails;
          if (serverResponse.MenuItem === 1)
            menuItemDetails = serverResponse;
          else if (serverResponse.ServiceItem === 1)
            serviceItemDetails = serverResponse;

          state = {
            ...state,
            newItemAdded: true,
            requestServerError: undefined,
            requestPending: undefined,
            requestRejected: undefined,
            menuItemsList: [...state.menuItemsList, serverResponse],
            menuItemDetails: menuItemDetails,
            serviceItemDetails: serviceItemDetails
          };
        }
        break;
      case 'ADD_MENUITEM_REJECTED':
        var serverResponse = action.payload;
        state = {
          ...state,
          newItemAdded: false,
          requestPending: undefined,
          requestServerError: undefined,
          requestRejected: serverResponse
        };
        break;
      case 'EDIT_MENUITEM_PENDING':
        state = {
          ...state,
          itemChanged: false,
          requestServerError: undefined,
          requestPending: 'Add menu items pending',
          requestRejected: undefined
        };
        break;
      case 'EDIT_MENUITEM_REJECTED':
        state = {
          ...state,
          itemChanged: false,
          requestServerError: undefined,
          requestPending: undefined,
          requestRejected: action.payload
        };
        break;
      case 'EDIT_MENUITEM_FULFILLED':
        var serverResponse = action.payload;

        const updatedList = [];
        if (state.menuItemsList) {

          var updatedItem = serverResponse[0];
          state.menuItemsList.forEach((item, index) => {
            if (item.Id === updatedItem.Id)
              updatedList.push(updatedItem);
            else
              updatedList.push(item);
          });
        }

        var menuItemDetails = undefined;
        var serviceItemDetails = undefined;
        if (serverResponse.MenuItem === 1)
          menuItemDetails = serverResponse;
        else if (serverResponse.ServiceItem === 1)
          serviceItemDetails = serverResponse;

        state = {
          ...state,
          itemChanged: true,
          requestPending: undefined,
          requestRejected: undefined,
          menuItemsList: updatedList,
          menuItemDetails: menuItemDetails,
          serviceItemDetails: serviceItemDetails
        };

        break;
      case 'SET_ADDED_NEWITEM':
        state = {
          ...state,
          newItemAdded: false,
          itemChanged: false
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
          requestPending: undefined,
          requestRejected: undefined,
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
            if (item.Id !== action.payload.id)
              return item;
          });

          state = {
            ...state,
            deleteMenuItemPending: undefined,
            deleteMenuItemRejected: undefined,
            menuItemsList: items,
            menuItemsDetails: undefined,
            serviceItemDetails: undefined
          };
        }

        break;
    }
  }
  return state;
}

//  EDIT_MENUITEM