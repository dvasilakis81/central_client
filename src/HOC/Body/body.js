import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getHeaderHeight, getFooterHeight } from '../../Helper/helpermethods';
import MySnackbar from '../../Components/Common/MySnackbar';

//import { withRouter } from '../../Components/withRouter';
//import { isTokenExpired } from '../../Helper/helpermethods';

export default function Body(props) {
	const [redirectToLogin, setRedirectToLogin] = useState(false);
	const { screenDimensions } = useSelector(state => ({
		screenDimensions: state.parametricdata_reducer.screenDimensions
	}));
	let bodyHeight = '100%';

	useMemo(() => {
		// if (props && props.isLoginPage === undefined) {
		// 	var dtNow = new Date();

		// if (isTokenExpired(this.props.token) === true)
		// 	this.setState({ redirectToLogin: true });

		// if (props.token) {
		// 	var dtTokeExpiresAt = new Date(props.token.expiresAt);
		// 	var dtDiffs = (dtTokeExpiresAt - dtNow)
		// 	if (Math.abs(dtDiffs) <= 0) {
		// 		this.setState({ redirectToLogin: true });
		// 	}
		// } else {
		// 	this.setState({ redirectToLogin: true });
		// }
		//}


		let wh = screenDimensions ? screenDimensions.height : undefined;
		if (wh)
			bodyHeight = wh - getHeaderHeight() - getFooterHeight();
	});

	return (<div style={{ width: '100%', height: bodyHeight, overflowX: 'hidden', overflowY: 'hidden', background: '#f4f6f7' }}>
		{props.children}
		<MySnackbar vertical='bottom' horizontal='right' useScreenDimensions={true} />		
	</div >)
}