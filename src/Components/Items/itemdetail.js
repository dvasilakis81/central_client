import React, { useCallback } from 'react';
import { useState } from 'react';
import { Navigate } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Scrollbars } from 'react-custom-scrollbars';

import parse from 'html-react-parser';
import store from '../../Redux/Store/store';

import { getDateFormat, getDateFormatForDocument, getHostUrl, getFpaLabel, getServerErrorResponseMessage } from '../../Helper/helpermethods';
import { useSelector, useDispatch } from 'react-redux';
import MenuItemDetails from '../Administration/Menu/menuitemdetail';
import PageItemDetails from '../Administration/Page/pageitemdetail';
import MediaItemDetails from '../Administration/Media/mediaitemdetail';

const styles = {
	paperConsultationMonetaryInfoFrame: {
		padding: '10px',
		borderLeft: '1px solid black',
		borderRight: '1px solid black',
		background: '#013220'
	},
	paperConsultationMonetaryInfoLabel: {
		margin: '20px',
		color: 'white'
	},
	paperConsultationInfo: {
		padding: '10px',
		borderLeft: '0px solid black',
		borderRight: '0px solid black'
	},
	paperConsultationInfoLast: {
		padding: '10px',
		borderLeft: '0px solid black',
		borderRight: '0px solid black',
		borderBottom: '0px solid black'
	},
	paperMoreConsultationInfo: {
		padding: '10px',
		background: '#fff'
	},
	consultationTitle: {
		padding: '10px',
		background: '#fff',
		fontSize: '16px',
		fontWeight: 1600
	}
};

export default function ItemDetail(props) {

	const [navigateToNew, setNavigateToNew] = useState(false);
	if (navigateToNew === true)
		return <Navigate push to='/newmenuitem' />
	else {
		if (props.kind === "menuitems")
			return <MenuItemDetails itemtype={props.itemtype}/>
		else if (props.kind === "pageitems")
			return <PageItemDetails />
		else if (props.kind === "mediaitems")
			return <MediaItemDetails />
		else
			return <></>
	}
}