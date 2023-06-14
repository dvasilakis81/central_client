import axios from 'axios';
import { getHostUrl, getLoginUrl } from '../../Helper/helpermethods';

//MENU
export function getServiceItems() {
  const request = axios.get(getHostUrl() + 'getServiceItems').then(response => response.data);
  return { type: 'GET_SERVICEMENUITEMS', payload: request };
}
export function getServiceItemsByGroup() {
  const request = axios.get(getHostUrl() + 'getServiceItemsByGroup').then(response => response.data);
  return { type: 'GET_SERVICEMENUITEMS', payload: request };
}
export function getMenuItems() {
  const request = axios.get(getHostUrl() + 'getMenuItems').then(response => response.data);
  return { type: 'GET_MENUITEMS', payload: request };
}
export function editNewMenuItem(data) {
  const request = axios.post(getHostUrl() + 'editMenuItem', data).then(response => response.data);
  return { type: 'EDIT_MENUITEM', payload: request };
}
export function addNewMenuItem(data) {
  const request = axios.post(getHostUrl() + 'addMenuItem', data).then(response => response.data)
  return { type: 'ADD_MENUITEM', payload: request };
}
export function searchMenuItems() {
  const request = axios.get(getHostUrl() + 'searchMenuItems').then(response => response.data);
  return { type: 'SEARCH_MENUITEMS', payload: request };
}

//MEDIA
export function getMediaItems() {
  const request = axios.get(getHostUrl() + 'getMediaItems').then(response => response.data);
  return { type: 'GET_MEDIAITEMS', payload: request };
}
export function addNewMediaItem(data) {
  const request = axios.post(getHostUrl() + 'addMediaItem', data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }).then(response => response.data)
  return { type: 'ADD_MEDIAITEM', payload: request };
}

//Pages
export function addPageItem(data) {
  const request = axios.post(getHostUrl() + 'addPageItem', data).then(response => response.data)
  return { type: 'ADD_PAGEITEM', payload: request };
}
export function editPageItem(data) {
  const request = axios.post(getHostUrl() + 'editPageItem', data).then(response => response.data)
  return { type: "EDIT_PAGEITEM", payload: request };
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

//Categories
export function getCategories() {
  const request = axios.get(getHostUrl() + 'getCategories').then(response => response.data);
  return { type: 'GET_CATEGORIES', payload: request };
}
export function addCategory(data) {
  const request = axios.post(getHostUrl() + 'addCategory', data).then(response => response.data);
  return { type: 'ADD_CATEGORY', payload: request };
}
export function editCategory(data) {
  const request = axios.post(getHostUrl() + 'editCategory', data).then(response => response.data);
  return { type: 'EDIT_CATEGORY', payload: request };
}

//Users
export function getUsers() {
  const request = axios.get(getHostUrl() + 'getUsers').then(response => response.data);
  return { type: 'GET_USERS', payload: request };
}
export function loginUser(data) {
  const request = axios.post(getHostUrl() + 'loginUser', data).then(response => response.data);
  return { type: 'GET_TOKEN_JWT', payload: request };
}
export function addUser(data) {
  const request = axios.post(getHostUrl() + 'addUser', data).then(response => response.data);
  return { type: 'ADD_USER', payload: request };
}
export function editUser(data) {
  const request = axios.post(getHostUrl() + 'editUser', data).then(response => response.data);
  return { type: 'EDIT_USER', payload: request };
}

export function deleteItem(data) {
  const request = axios.post(getHostUrl() + 'deleteItem', data).then(response => response.data);
  if (data.kind === 1)
    return { type: 'DELETE_MENU', payload: request };
  else if (data.kind === 2)
    return { type: 'DELETE_PAGE', payload: request };
  else if (data.kind === 3)
    return { type: 'DELETE_MEDIA', payload: request };
  else if (data.kind === 4)
    return { type: 'DELETE_ANNOUNCEMENT', payload: request };
  else if (data.kind === 5)
    return { type: 'DELETE_CATEGORY', payload: request };
  else if (data.kind === 6)
    return { type: 'DELETE_USER', payload: request };
}