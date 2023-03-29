import React from 'react';
import MenuItemDetails from '../Administration/Menu/menuitemdetail';
import PageItemDetails from '../Administration/Page/pageitemdetail';
import MediaItemDetails from '../Administration/Media/mediaitemdetail';
import AnnouncementItemDetails from '../Administration/Announcements/announcementitemdetail';

export default function ItemDetail(props) {
		
	if (props.kind === "menuitems")
		return <MenuItemDetails itemtype={props.itemtype} />
	else if (props.kind === "pageitems")
		return <PageItemDetails />
	else if (props.kind === "mediaitems")
		return <MediaItemDetails />
	else if (props.kind === "announcementitems")
		return <AnnouncementItemDetails />
	else
		return <></>	
}