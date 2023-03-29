import axios from 'axios';
import { getHostUrl, getLoginUrl } from '../../Helper/helpermethods';

// export function getCentralData(tokenData, offset, limit) {
//   var data = {}
//   data.loginUserInfo = tokenData ? tokenData.user : null;
//   data.offset = offset;
//   data.limit = limit;
//   var token = tokenData ? tokenData.token : null;

//   // const request = axios.post(`${URL}consultations/list`, data, { headers: { Authorization: 'Bearer ' + token } })
//   // const request = axios.post(`${URL}consultations/list`, data)
//   //const request = axios.get(`${URL}consultations/list`)
//   const request = axios.get('http://localhost/consultations/index.php/consultations/list')
//   // .then( response => {
//   //   response.data;
//   // })

//   return { type: 'GET_CENTRAL_DATA', payload: request }
// }

export function getMediaItems() {
  const request = axios.get(getHostUrl() + 'getMediaItems').then(response => response.data);
  return { type: 'GET_MEDIAITEMS', payload: request };
}
export function getMenuItems() {
  const request = axios.get(getHostUrl() + 'getMenuItems').then(response => response.data);
  return { type: 'GET_MENUITEMS', payload: request };
}

export function searchMenuItems() {
  const request = axios.get(getHostUrl() + 'searchMenuItems').then(response => response.data);
  return { type: 'SEARCH_MENUITEMS', payload: request };
}
export function addNewMenuItem(data) {
  const request = axios.post(getHostUrl() + 'addMenuItem', data).then(response => response.data)
  return { type: 'ADD_MENUITEM', payload: request };
}
export function addNewMediaItem(data) {
  const request = axios.post(getHostUrl() + 'addMediaItem', data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then(response => response.data)
  return { type: 'ADD_MEDIAITEM', payload: request };
  //,
}
export function editNewMenuItem(data) {
  const request = axios.post(getHostUrl() + 'editMenuItem', data).then(response => response.data);
  return { type: 'EDIT_MENUITEM', payload: request };
}

//Pages
export function addPageItem(data) {
  const request = axios.post(getHostUrl() + 'addPageItem', data).then(response => response.data)
  return { type: 'ADD_PAGEITEM', payload: request };
}
export function getPageItem(data) {
  const request = axios.post(getHostUrl() + 'getPageItem', data).then(response => response.data)
  return { type: 'GET_PAGEITEM', payload: request };
}
export function editPageItem(dispatch, data) {
  //const dispatch = useDispatch();
  return new Promise((resolve, reject) => {
    const request = axios.post(getHostUrl() + 'editPageItem', data).then(response => response.data)
    dispatch({ type: "myaction", payload: request });
    resolve();
  });
}
export function getPageItems() {
  const request = axios.get(getHostUrl() + 'getPageItems').then(response => response.data);
  return { type: 'GET_PAGEITEMS', payload: request };
}
export function getPageInfo(data) {
  const request = axios.post(getHostUrl() + 'getPageInfo', data).then(response => response.data);
  return { type: 'GET_PAGEINFO', payload: request };
}
export function getPageTabInfo(data) {
  const request = axios.post(getHostUrl() + 'getPageInfo', data).then(response => response.data);
  return { type: 'GET_PAGETABINFO', payload: request };
}
export function deletePage(data) {
  const request = axios.post(getHostUrl() + 'deletePage', data).then(response => response.data);
  return { type: 'DELETE_PAGE', payload: request };
}

//Announcement
export function getAnnouncements() {
  const request = axios.get(getHostUrl() + 'getAnnouncements').then(response => response.data);
  return { type: 'GET_ANNOUNCEMENTS', payload: request };
}
export function addAnnouncement(data) {
  const request = axios.post(getHostUrl() + 'addAnnouncement', data).then(response => response.data)
  return { type: 'ADD_ANNOUNCEMENT', payload: request };
}
export function editAnnouncement(data) {
  const request = axios.post(getHostUrl() + 'editAnnouncement', data).then(response => response.data);
  return { type: 'EDIT_ANNOUNCEMENT', payload: request };
}
export function deleteAnnouncement(data) {
  const request = axios.post(getHostUrl() + 'deleteAnnouncement', data).then(response => response.data);
  return { type: 'DELETE_ANNOUNCEMENT', payload: request };
}

export function deleteItem(data) {
  const request = axios.post(getHostUrl() + 'deleteItem', data).then(response => response.data);
  if (data.kind === 1)
    return { type: 'DELETE_MENU', payload: request };
  if (data.kind === 4)
    return { type: 'DELETE_ANNOUNCEMENT', payload: request };
}