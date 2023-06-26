export default function (state = {}, action, root) {
	
	if (action) {
		switch (action.type) {
			case 'RESET_ACTION':
				state = {}
				break;				
			default:
				return state;
		}
	}

	return state;
}