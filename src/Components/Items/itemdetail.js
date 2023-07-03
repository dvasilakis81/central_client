import React from 'react';
import MenuItemDetails from '../Administration/Menu/menuitemdetail';
import PageItemDetails from '../Administration/Page/pageitemdetail';
import MediaItemDetails from '../Administration/Media/mediaitemdetail';
import AnnouncementItemDetails from '../Administration/Announcements/announcementitemdetail';
import UserItemDetails from '../Administration/Users/useritemdetail';
import CategoryItemDetails from '../Administration/Categories/categoryitemdetail';

export default function ItemDetail(props) {
		
	if (props.kind === "menuitems")
		return <MenuItemDetails itemtype={props.itemtype} />
	else if (props.kind === "pageitems")
		return <PageItemDetails />
	else if (props.kind === "mediaitems")
		return <MediaItemDetails />
	else if (props.kind === "announcementitems")
		return <AnnouncementItemDetails />
	else if (props.kind === "useritems")
		return <UserItemDetails />
	else if (props.kind === "categoryitems")
		return <CategoryItemDetails />
	else
		return <></>	
}