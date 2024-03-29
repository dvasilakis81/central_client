export default function (state = {}, action, root) {

  if (action) {
    switch (action.type) {
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
            if (serverMenuItems.length > 0)
              menuItem = serverMenuItems[0];

            var selectedMenuItem = state.menuItemDetails || menuItem;

            state = {
              ...state,
              requestPending: undefined,
              requestRejected: undefined,
              requestServerError: undefined,
              menuItemsList: serverMenuItems,
              menuItemDetails: selectedMenuItem
            };
          } else {
            state = {
              ...state,
              requestPending: undefined,
              requestRejected: undefined,
              requestServerError: undefined,
              menuItemsList: [],
              menuItemsDetails: undefined
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
      case 'GET_SERVICEMENUITEMS_PENDING':
        state = {
          ...state,
          requestPending: 'Get menu items pending',
          requestServerError: undefined,
          requestRejected: undefined
        };
        break;
      case 'GET_SERVICEMENUITEMS_FULFILLED':
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
            serviceItemsList: action.payload
          };
        } else {
          if (serverResponse && serverResponse.length > 0) {
            var serverMenuItems = serverResponse;
            var serviceItem = undefined;
            if (serverMenuItems.length > 0)
              serviceItem = serverMenuItems[0];

            state = {
              ...state,
              requestPending: undefined,
              requestRejected: undefined,
              requestServerError: undefined,
              serviceItemsList: serverMenuItems,
              serviceItemDetails: state.serviceItemDetails || serviceItem,
              groupServicesSelected: serviceItem
            };
          } else {
            state = {
              ...state,
              requestPending: undefined,
              requestRejected: undefined,
              requestServerError: undefined,
              serviceItemsList: [],
              serviceItemDetails: undefined
            };
          }
        }
        break;
      case 'SET_SELECTED_GROUP_SERVICES':
        state = {
          ...state,
          groupServicesSelected: action.payload
        };
        break;
      case 'SET_SELECTED_CATEGORY_WITH_SUBCATEGORIES':
        state = {
          ...state,
          categoryWithSubCategoriesSelected: action.payload
        };
        break;
      case 'CLOSE_CATEGORY_LIST':
        state = {
          ...state,
          categoryWithSubCategoriesSelected: undefined
        };
        break;
      case 'GET_SERVICEMENUITEMS_REJECTED':

        state = {
          ...state,
          requestPending: undefined,
          requestServerError: undefined,
          requestRejected: action.payload
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
          requestPending: 'Edit menu item pending',
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
        if (serverResponse && serverResponse.servererrormessage) {

          state = {
            ...state,
            itemChanged: false,
            requestPending: undefined,
            requestRejected: undefined,
            requestServerError: serverResponse.errormessage
          };
        } else {
          const updatedList = [];

          if (serverResponse.MenuItem === 1)
            state.menuItemDetails = serverResponse;
          else if (serverResponse.ServiceItem === 1)
            state.serviceItemDetails = serverResponse;

          state.menuItemsList.forEach((item, index) => {
            if (item.Id === serverResponse.Id)
              updatedList.push(serverResponse);
            else
              updatedList.push(item);
          });

          state = {
            ...state,
            itemChanged: true,
            requestServerError: undefined,
            requestPending: undefined,
            requestRejected: undefined,
            menuItemsList: updatedList
          };
        }

        break;
      case 'SEARCH_MENUITEMS':
        var searchValue = action.payload;
        const searchList = [];
        if (searchValue !== '') {
          if (state.serviceItemsList) {
            state.serviceItemsList.forEach((item, index) => {
              if (item.Name.contains(searchValue))
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
        var serverResponse = action.payload;

        if (serverResponse) {
          if (serverResponse.itemtype === 1) {
            let items = state.menuItemsList.filter((item) => {
              if (item.Id !== serverResponse.id) {
                return item;
              }
            });
            state = {
              ...state,
              deleteMenuItemPending: undefined,
              deleteMenuItemRejected: undefined,
              menuItemsList: items,
              menuItemDetails: state.menuItemsList && state.menuItemsList.length > 0 ? state.menuItemsList[0] : undefined
            };

            var itemDetail = undefined;
            if (state.serviceItemsList && state.menuItemsList.length <= 1)
              itemDetail = undefined;
            else {
              if (serverResponse.id === state.menuItemsList[0].Id)
                itemDetail = state.menuItemsList[1];
              else
                itemDetail = state.menuItemsList[0];
            }

          } else if (serverResponse.itemtype === 2) {
            let items = state.serviceItemsList.filter((item) => {
              if (item.Id !== serverResponse.id) {
                return item;
              }
            })
            var itemDetail = undefined;
            if (state.serviceItemsList && state.serviceItemsList.length <= 1)
              itemDetail = undefined;
            else {
              if (serverResponse.id === state.serviceItemsList[0].Id)
                itemDetail = state.serviceItemsList[1];
              else
                itemDetail = state.serviceItemsList[0];
            }

            state = {
              ...state,
              deleteMenuItemPending: undefined,
              deleteMenuItemRejected: undefined,
              serviceItemsList: items,
              serviceItemDetails: itemDetail
            };
          }
        }

        break;
      case 'SET_ADDED_NEWMENUITEM':
        state = {
          ...state,
          newItemAdded: action.payload,
          itemChanged: action.payload
        };
        break;

      default: return state;
    }
  }
  return state;
}

//  EDIT_MENUITEM