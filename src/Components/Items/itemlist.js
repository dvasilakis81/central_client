import React from 'react';
import MenuItem from '../Administration/Menu/menuitem';
import MediaItem from '../Administration/Media/mediaitem';
import PageItem from '../Administration/Page/pageitem';
import AnnouncementItem from '../Administration/Announcements/announcementitem';
import UserItem from '../Administration/Users/useritem';
import CategoryItem from '../Administration/Categories/categoryitem';

export default function ItemList(props) {
	const itemToRender = props.item;
	let selectedItem = null;
	if (props.selectedItem)
		selectedItem = props.selectedItem;	

	if (props.kindss === "menuitems")
		return <MenuItem item={itemToRender} selecteditem={selectedItem} itemtype={props.itemtype} kind="menuitems" searchValue={props.searchValue}/>	
	else if (props.kindss === "mediaitems")
		return <MediaItem item={itemToRender} selecteditem={selectedItem} searchValue={props.searchValue}/>
	else if (props.kindss === "pageitems")
		return <PageItem item={itemToRender} selecteditem={selectedItem} searchValue={props.searchValue}/>
	else if (props.kindss === "announcementitems")
		return <AnnouncementItem item={itemToRender} selecteditem={selectedItem} searchValue={props.searchValue}/>
	else if (props.kindss === "useritems")
		return <UserItem item={itemToRender} selecteditem={selectedItem} searchValue={props.searchValue}/>
	else if (props.kindss === "categoryitems")
		return <CategoryItem item={itemToRender} selecteditem={selectedItem} searchValue={props.searchValue}/>
	else {
		return <></>;
	}
}



