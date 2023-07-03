export default function (state = {}, action, root) {

	if (action) {
		switch (action.type) {
			case 'GET_CATEGORIES_PENDING':
				state = {
					...state,
					requestPending: 'Get categories pending',
					requestRejected: undefined,
					requestServerError: undefined,
					categoriesList: undefined
				};
				break;
			case 'ADD_CATEGORY_PENDING':
				state = {
					...state,
					newItemAdded: false,
					requestPending: 'Add category pending',
					requestServerError: undefined,
					requestRejected: undefined
				};
				break;
			case 'ADD_CATEGORY_REJECTED':
				var serverResponse = action.payload;
				state = {
					...state,
					newItemAdded: false,
					requestPending: undefined,
					requestServerError: undefined,
					requestRejected: serverResponse
				};
				break;
			case 'ADD_CATEGORY_FULFILLED':
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
						categoriesList: [serverResponse, ...state.categoriesList],
						categoryItemDetails: serverResponse
					};
				}
				break;
			case 'EDIT_CATEGORY_PENDING':
				state = {
					...state,
					itemChanged: false,
					requestServerError: undefined,
					requestPending: 'Edit category pending',
					requestRejected: undefined
				};
				break;
			case 'EDIT_CATEGORY_REJECTED':
				state = {
					...state,
					itemChanged: false,
					requestPending: undefined,
					requestServerError: undefined,
					requestRejected: action.payload
				};
				break;
			case 'EDIT_CATEGORY_FULFILLED':

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
					if (state.categoriesList) {
						state.categoriesList.forEach((item, index) => {
							if (item.Id === serverResponse.Id)
								updatedList.push(serverResponse);
							else
								updatedList.push(item);
						});
					}

					var itemDetails = serverResponse || state.categoryItemDetails;
					state = {
						...state,
						itemChanged: true,
						requestPending: undefined,
						requestRejected: undefined,
						requestServerError: undefined,
						categoriesList: updatedList,
						categoryItemDetails: itemDetails
					};
				}
				break;
			case 'GET_CATEGORIES_REJECTED':
				state = {
					...state,
					requestPending: undefined,
					requestRejected: action.payload,
					requestServerError: undefined,
					categoriesList: undefined
				};
				break;
			case 'GET_CATEGORIES_FULFILLED':
				var serverResponse = action.payload;
				if (serverResponse && serverResponse.servererrormessage) {
					state = {
						...state,
						requestPending: undefined,
						requestRejected: undefined,
						requestServerError: serverResponse,
						categoriesList: undefined
					};
				} else if (serverResponse && serverResponse.tokenIsValid !== undefined) {
					state = {
						...state,
						requestPending: undefined,
						requestRejected: undefined,
						requestServerError: undefined,
						categoriesList: action.payload
					};
				} else {
					if (serverResponse && serverResponse.length > 0) {
						var itemsList = serverResponse;
						var itemDetails = itemsList ? itemsList[0] : undefined;
						state = {
							...state,
							requestPending: undefined,
							requestRejected: undefined,
							requestServerError: undefined,
							categoryItemDetails: state.categoryItemDetails || itemDetails,
							categoriesList: itemsList
						};
					} else {
						state = {
							...state,
							requestPending: undefined,
							requestRejected: undefined,
							requestServerError: undefined,
							categoryItemDetails: undefined,
							categoriesList: []
						};
					}
				}
				break;
			case 'UPDATE_CATEGORY_LIST_ITEM':
				const updatedList = [];
				var catItem = action.payload;
				if (state.categoriesList) {
					state.categoriesList.forEach((item, index) => {
						if (item.Id === catItem.Id) {
							var newItem = item;
							newItem.Name = catItem.val;
							updatedList.push(newItem);
						}
						else
							updatedList.push(item);
					});
				}

				state = {
					...state,
					categoriesList: updatedList
				};
				break;
			case 'EDIT_CATEGORY_LIST_ITEM':
				const updatedList2 = [];
				var catItem = action.payload;
				if (state.categoriesList) {
					state.categoriesList.forEach((item, index) => {
						if (item.Id === catItem.Id) {
							var newItem = item;
							newItem.Name = catItem.val;
							updatedList.push(newItem);
						}
						else
							updatedList.push(item);
					});
				}

				state = {
					...state,
					categoriesList: updatedList2
				};
				break;
			case 'OPEN_CATEGORIES':
				state = {
					...state,
					opencategories: true
				};
				break;
			case 'DELETE_CATEGORY_PENDING':

				state = {
					...state,
					openMessage: false,
					requestPending: true,
					requestRejected: undefined,
					requestServerError: undefined
				};
				break;
			case 'DELETE_CATEGORY_REJECTED':

				state = {
					...state,
					requestPending: undefined,
					requestRejected: action.payload,
					requestServerError: undefined
				};
				break;
			case 'DELETE_CATEGORY_FULFILLED':
				var serverResponse = action.payload;
				if (serverResponse) {
					let items = state.categoriesList.filter((item) => {
						if (item.Id !== serverResponse.id)
							return item;
					});

					state = {
						...state,
						requestPending: undefined,
						requestRejected: undefined,
						requestServerError: undefined,
						categoriesList: items,
						categoryItemDetails: undefined
					};
				}

				break;
			case 'CLOSE_CATEGORIES':
				state = {
					...state,
					opencategories: false
				};
				break;
			case 'SET_CATEGORYITEM_DETAIL':
				state = {
					...state,
					categoryItemDetails: action.payload
				};
				break;
			case 'SET_ADDED_NEWCATEGORYITEM':
				state = {
					...state,
					newItemAdded: action.payload,
					itemChanged: action.payload
				};
				break;
			default:
				return state;
		}
	}

	return state;
}