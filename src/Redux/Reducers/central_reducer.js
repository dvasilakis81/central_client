export default function (state = {}, action, root) {
	//console.log(action.type);	
	switch (action.type) {
		case 'RESET_ACTION':
			console.log('RESET_ACTION')
			state = {}
			break;		
		
		default: return state;
	}

	return state;
}