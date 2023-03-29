import React from 'react';
import MenuItem from '../Administration/Menu/menuitem';
import MediaItem from '../Administration/Media/mediaitem';
import PageItem from '../Administration/Page/pageitem';
import AnnouncementItem from '../Administration/Announcements/announcementitem';

export default function ItemList(props) {
	const itemToRender = props.item;
	let selectedItem = null;
	if (props.selectedItem)
		selectedItem = props.selectedItem;
	else
		selectedItem = props.defaultSelectedItem;

	if (props.kindss === "menuitems")
		return <MenuItem item={itemToRender} selecteditem={selectedItem} itemtype={props.itemtype} kind="menuitems" />	
	else if (props.kindss === "mediaitems")
		return <MediaItem item={itemToRender} selecteditem={selectedItem} />
	else if (props.kindss === "pageitems")
		return <PageItem item={itemToRender} selecteditem={selectedItem} />
	else if (props.kindss === "announcementitems")
		return <AnnouncementItem item={itemToRender} selecteditem={selectedItem} />
	else {
		return <></>;
		// return <div id={itemToRender.Id}
		// 	onClick={() => this.changeSelectedItem(this, itemToRender)}
		// 	onMouseEnter={(e) => handleMouseEnter(e, itemToRender.Id)}
		// 	onMouseLeave={handleMouseLeave}
		// 	style={{ padding: '10px', background: hoveredKey === itemToRender.Id ? 'lightblue' : '#ffffffb3' }}>
		// 	<Grid item style={{ flexGrow: '1' }}>
		// 		<Paper square={true}>
		// 			<Typography>
		// 				<span style={{ marginLeft: '5px' }}>{this.getTitle(itemToRender.Title)}</span>
		// 			</Typography>
		// 		</Paper>
		// 	</Grid>
		// </ div >
	}
}



