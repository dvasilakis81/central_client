import React from 'react';
import ItemList from './itemlist';
import { useSelector } from 'react-redux';

function ItemsList(props) {

	let itemDetails = useSelector(state => {
		if (props.kind === 'menuitems') {
			var itemDetails = null;
			if (props.itemtype === 1)
				itemDetails = state.menu_reducer.menuItemDetails;
			else
				itemDetails = state.menu_reducer.serviceItemDetails;

			return itemDetails;
		}
		else if (props.kind === 'pageitems')
			return state.page_reducer.pageItemDetails;
		else if (props.kind === 'mediaitems')
			return state.media_reducer.mediaItemDetails;
		else if (props.kind === 'announcementitems')
			return state.announcement_reducer.announcementItemDetails;
		else if (props.kind === 'announcementitems')
			return state.announcement_reducer.announcementItemDetails;
		else if (props.kind === 'useritems')
			return state.user_reducer.userItemDetails;
		else
			return null;
	});

	
	if (props.data) {
		return props.data.map((item, i) => (
			<ItemList
				key={item.Id}
				item={item}
				itemtype={props.itemtype}				
				kindss={props.kind}
				selectedItem={itemDetails}
				searchValue={props.searchValue}
			/>
		));		
	} else {		
		<>Δεν βρέθηκαν.</>
	}
}
export default ItemsList;
