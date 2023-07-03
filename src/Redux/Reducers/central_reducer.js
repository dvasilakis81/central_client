export default function (state = {}, action, root) {
	
	if (action) {
		switch (action.type) {			
			case 'SET_ADDED_NEWITEM':
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