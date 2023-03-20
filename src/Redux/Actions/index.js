import axios from 'axios';
import { getHostUrl, getLoginUrl } from '../../Helper/helpermethods';
import store from '../Store/store';

const URL = getHostUrl();

export function getCentralData(tokenData, offset, limit) {
  var data = {}
  data.loginUserInfo = tokenData ? tokenData.user : null;
  data.offset = offset;
  data.limit = limit;
  var token = tokenData ? tokenData.token : null;

  // const request = axios.post(`${URL}consultations/list`, data, { headers: { Authorization: 'Bearer ' + token } })
  // const request = axios.post(`${URL}consultations/list`, data)
  //const request = axios.get(`${URL}consultations/list`)
  const request = axios.get('http://localhost/consultations/index.php/consultations/list')
  // .then( response => {
  //   response.data;
  // })

  return { type: 'GET_CENTRAL_DATA', payload: request }
}

export function getMediaItems() {
  const request = axios.get('http://localhost:3000/getMediaItems').then(response => response.data);
  return { type: 'GET_MEDIAITEMS', payload: request };
}

export function getMenuItems() {
  const request = axios.get('http://localhost:3000/getMenuItems').then(response => response.data);
  return { type: 'GET_MENUITEMS', payload: request };
}
export function searchMenuItems() {
  const request = axios.get('http://localhost:3000/searchMenuItems').then(response => response.data);
  return { type: 'SEARCH_MENUITEMS', payload: request };
}
export function getPageItems() {
  const request = axios.get('http://localhost:3000/getPageItems').then(response => response.data);
  return { type: 'GET_PAGEITEMS', payload: request };
}

export function getPageInfo(data) {
  const request = axios.post('http://localhost:3000/getPageInfo', data).then(response => response.data);
  return { type: 'GET_PAGEINFO', payload: request };
}
export function getPageTabInfo(data) {
  const request = axios.post('http://localhost:3000/getPageInfo', data).then(response => response.data);
  return { type: 'GET_PAGETABINFO', payload: request };
}

export function addNewMenuItem(data) {
  const request = axios.post('http://localhost:3000/addMenuItem', data).then(response => response.data)
  return { type: 'ADD_MENUITEM', payload: request };
}

export function addNewMediaItem(data) {
  const request = axios.post('http://localhost:3000/addMediaItem', data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then(response => response.data)
  return { type: 'ADD_MEDIAITEM', payload: request };
  //,
}

export function editNewMenuItem(data) {
  const request = axios.post('http://localhost:3000/editMenuItem', data).then(response => response.data);
  return { type: 'EDIT_MENUITEM', payload: request };
}

export function addPageItem(data) {
  const request = axios.post('http://localhost:3000/addPageItem', data).then(response => response.data)
  return { type: 'ADD_PAGEITEM', payload: request };
}

export function getPageItem(data) {
  const request = axios.post('http://localhost:3000/getPageItem', data).then(response => response.data)
  return { type: 'GET_PAGEITEM', payload: request };
}

export function editPageItem(dispatch, data) {
  //const dispatch = useDispatch();
  return new Promise((resolve, reject) => {
    const request = axios.post('http://localhost:3000/editPageItem', data).then(response => response.data)
    dispatch({ type: "myaction", payload: request });
    resolve();
  });

  // const request = axios.post('http://localhost:3000/editPageItem', data).then(response => response.data)
  // return { type: 'EDIT_PAGEITEM', payload: request };


  // const request = axios.post('http://localhost:3000/editPageItem', data).then(response => response.data)
  //  return { type: 'EDIT_PAGEITEM', payload: request };
}

export function getPages(tokenData, offset, limit) {
}