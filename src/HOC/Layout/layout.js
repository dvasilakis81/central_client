import React, { Component } from 'react';
//import React, { useState, useEffect } from 'react';
import { setDimensions } from '../../Helper/helpermethods'
import windowSize from 'react-window-size';
import store from '../../Redux/Store/store'
import { connect } from 'react-redux'

import './layout.css'

class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirectToLogin: false
		}
	}

	componentDidMount() {
		// document.getElementById('root').style.zoom = 1
		// if (document.getElementById('root').style.width > 1800)
		// 	document.getElementById('root').style.transform = 'scale(0.9)';
		// else
		// 	document.getElementById('root').style.transform = 'scale(0.5)';

		// document.getElementById('root').style.transform = 'scale(0.5)';
		// document.getElementById('root').style.transformOrigin = '0 0';
		// document.body.style.zoom = 0.9
		// document.body.style.zoom = 1
		// document.body.style.transform = 'scale(0.9)';
		// document.body.style.transformOrigin= '0 0';
		// document.body.style.width = window.innerWidth;		
		// var scale = 'scale(1)';   
		//  document.body.style.webkitTransform = scale;    // Chrome, Opera, Safari
		//  document.body.style.msTransform = scale;       // IE 9
		//  document.body.style.transform = scale;     // General    
	}

	componentDidUpdate() {
		var dimensions = setDimensions(store);		
		// document.getElementById('root').style.zoom = 1
		// document.body.style.transformOrigin= '0 0';
		// if (dimensions.width > 1800)
		// 	document.getElementById('root').style.transform = 'scale(0.9)';
		// else
		// 	document.getElementById('root').style.transform = 'scale(0.5)';		
		
		// document.body.style.zoom = 0.9
		// document.body.style.zoom = 1
		// document.body.style.transform = 'scale(0.9)';
		// document.body.style.transformOrigin= '0 0';
		// document.body.style.width = window.innerWidth;		
		// var scale = 'scale(1)';   
		//  document.body.style.webkitTransform = scale;    // Chrome, Opera, Safari
		//  document.body.style.msTransform = scale;       // IE 9
		//  document.body.style.transform = scale;     // General    
	}

	render() {

		var dimensions = setDimensions(store);
		return (
			// <div style={{ width: dimensions.width, height: dimensions.height, background: 'red' }}>
			<div style={{ width: dimensions.width, height: dimensions.height, background: 'red' }}>
				{this.props.children}
			</div>
		)
	}
}

export default connect(null, null)(windowSize(Layout))