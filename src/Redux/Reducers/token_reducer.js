export default function (state = {}, action) {

  switch (action.type) {    
    case 'GET_TOKEN_JWT_PENDING':
      state = { ...state, tokenPending: 'token pending', tokenRejected: undefined, token: undefined };
      break;
    case 'GET_TOKEN_JWT_FULFILLED':
      state = { ...state, tokenPending: undefined, tokenRejected: undefined, token: action.payload };
      break;
    case 'GET_TOKEN_JWT_REJECTED':
      state = { ...state, tokenPending: undefined, tokenRejected: action.payload };
      break;
    case 'RESET_TOKEN_JWT_REJECTED':
      state = { ...state, tokenPending: undefined, tokenRejected: action.payload };
      break;
    case 'SET_TOKEN_JWT':
      state = { ...state, token: undefined };
      break;
    case 'LOGOUT_RESET_STORE':
      state = { ...state, token: undefined };
      break;
    default:
      return state;
  }

  return state;
}