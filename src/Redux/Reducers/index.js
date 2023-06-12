import { combineReducers } from 'redux';
import central_reducer from './central_reducer';
import menu_reducer from './menu_reducer';
import page_reducer from './page_reducer';
import token_reducer from './token_reducer';
import user_reducer from './user_reducer';
import media_reducer from './media_reducer';
import parametricdata_reducer from './parametricdata_reducer';
import announcement_reducer from './announcement_reducer';

const RootReducer = combineReducers({  
  central_reducer,
  menu_reducer,
  page_reducer,
  token_reducer,
  user_reducer,
  media_reducer,
  parametricdata_reducer,
  announcement_reducer
})
export default RootReducer;