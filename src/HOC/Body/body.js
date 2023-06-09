import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getHeaderHeight, getFooterHeight } from '../../Helper/helpermethods';
import MySnackbar from '../../Components/Common/MySnackbar';
import store from '../../Redux/Store/store';
import { isTokenExpired } from '../../Helper/helpermethods';

export default function Body(props) {
	let bodyHeight = '100%';	
	const { screenDimensions } = useSelector(state => ({ screenDimensions: state.parametricdata_reducer.screenDimensions }));
	//const { requestRejected } = useSelector(state => ({ requestRejected: state.page_reducer.requestRejected }));
	//const { requestServerError } = useSelector(state => ({ requestServerError: state.page_reducer.requestServerError }));	

	// useEffect(() => {
	// 	if (requestRejected && requestRejected.message) {
	// 		var snackbarInfo = {}
	// 		snackbarInfo.openMessage = true;
	// 		snackbarInfo.message = requestRejected?.message
	// 		snackbarInfo.variant = 'error';
	// 		store.dispatch({ type: 'SHOW_SNACKBAR', payload: snackbarInfo });
	// 	} else if (requestServerError && requestServerError?.servererrormessage) {
	// 		var snackbarInfo = {}
	// 		snackbarInfo.openMessage = true;
	// 		snackbarInfo.message = requestServerError?.servererrormessage
	// 		snackbarInfo.variant = 'error';
	// 		store.dispatch({ type: 'SHOW_SNACKBAR', payload: snackbarInfo });
	// 	}
	// }, [requestRejected, requestServerError])

	useMemo(() => {
		//if (props && props.isLoginPage === undefined) {
		//var dtNow = new Date();

		// if (isTokenExpired(props.token) === true){
		// 	setRedirectToLogin(true);
		// }

		// if (props.token) {
		// 	var dtTokeExpiresAt = new Date(props.token.expiresAt);
		// 	var dtDiffs = (dtTokeExpiresAt - dtNow);
		// 	if (Math.abs(dtDiffs) <= 0) {
		// 		setRedirectToLogin(true);
		// 	}
		// } else
		// 	setRedirectToLogin(true);
		//let ww = screenDimensions ? screenDimensions.width : undefined;

		let wh = screenDimensions ? screenDimensions.height : undefined;
		if (wh)
			bodyHeight = wh - getHeaderHeight() - getFooterHeight();

		// const rootElement = document.getElementById('root');
		// if (ww < 1366)
		// 	rootElement.setAttribute('style', 'transform:scale(.6);transform-origin:0 0');
		// else 
		// 	rootElement.setAttribute('style', 'transform:scale(.9);transform-origin:0 0');
	});

	return (<div style={{ width: '100%', height: bodyHeight, overflowX: 'hidden', overflowY: 'hidden'}}>
		{props.children}
		<MySnackbar vertical='bottom' horizontal='right' useScreenDimensions={true} />
	</div >)
}