import format from 'string-format';
import { Checkbox } from '@material-ui/core';
import parse from 'html-react-parser';

export function checkIfFileIsImage(imageName) {
	var ret = false;
	var imageExtensions = ['.jpg', '.png', '.jpeg', '.gif', '.tif', '.svg', '.bmp', '.ico'];

	for (var i = 0; i < imageExtensions.length; i++) {
		if (imageName.endsWith(imageExtensions[i]) === true) {
			ret = true;
			break;
		}
	}

	return ret;
}
export function isTokenExpired(tokenjwt) {
	var ret = false;

	var dtNow = new Date();
	if (tokenjwt && tokenjwt.data && tokenjwt.data.expiresAt) {
		var tokenExpiresAt = new Date(tokenjwt.data.expiresAt);
		//console.log('isTokenExpired');
		//console.log('tokenExpiresAt:' + tokenExpiresAt);
		//console.log('dtNow:' + dtNow);
		if (tokenExpiresAt <= dtNow)
			ret = true;
		else
			ret = false;
	} else
		ret = true;

	return ret;
}
export function tokenExpiresAt(tokenjwt) {
	var ret = ''

	var dtNow = new Date()
	if (tokenjwt && tokenjwt.data) {
		var dtTokeExpiresAt = new Date(tokenjwt.data.expiresAt);
		var dtDiffs = (dtTokeExpiresAt - dtNow)
		if (dtDiffs <= 0)
			return 'Η συνεδρία έληξε!';
		else {
			var diffMins = Math.round(dtDiffs / 60000);
			return format('H συνεδρία θα λήξει σε {} {}! {}', diffMins, diffMins > 1 ? 'λεπτά' : 'λεπτό', diffMins < 5 ? 'Θα ήταν προτιμότερο να γίνει έξοδος!' : '');
		}
	}

	// if (tokenjwt && tokenjwt.data && tokenjwt.data.expiresAt)
	//   return <Moment toNow> {new Date(tokenjwt.data.expiresAt).toString('YYYY-MM-DDTHH:mm:ssZ')}</Moment>
	// // return <Moment toNow> {tokenjwt.data.expiresAt.format('YYYY-MM-DD HH:mm:ss')}</Moment>
	// // return <Moment toNow>2020-5-19 17:41:18</Moment>

	return ret;
}
export function setDimensions(store) {
	let windowDimensions = getWindowDimensions(window.innerWidth, window.innerHeight, document.getElementById('root').style.transform)
	var dimensions = {};
	dimensions.width = windowDimensions[0]['width'];
	dimensions.height = windowDimensions[1]['height'];
	store.dispatch({ type: 'SCREEN_DIMENSIONS', payload: dimensions })
	return dimensions;
}
export function resetData(store) {	
	store.dispatch({ type: 'RESET_ACTION', payload: null });
	setDimensions(store);
}
export function getWindowDimensions(windowWidth, windowHeight, transform, zoom) {
	var ret = []
	var scale = transform.substring(6);
	scale = Number(scale.substring(0, scale.length - 1));

	let windowWidth100 = windowWidth
	let windowHeight100 = windowHeight
	if (scale) {
		windowHeight100 = windowHeight / scale;
		windowWidth100 = windowWidth / scale;
	} else if (zoom) {
		windowHeight100 = windowHeight / Number(zoom);
		windowWidth100 = windowWidth / Number(zoom);
	}

	ret.push({ 'width': windowWidth100 })
	ret.push({ 'height': windowHeight100 })

	return ret;
}
export function getScreenWidth() {
	let windowDimensions = getWindowDimensions(window.innerWidth, window.innerHeight, document.getElementById('root').style.transform)
	return windowDimensions[0]['width'];
}
export function getScreenHeight() {
	let windowDimensions = getWindowDimensions(window.innerWidth, window.innerHeight, document.getElementById('root').style.transform)
	return windowDimensions[1]['height'];
}
export function getBodyHeight() {
	let windowDimensions = getWindowDimensions(window.innerWidth, window.innerHeight, document.getElementById('root').style.transform)
	return windowDimensions[1]['height'] - (getHeaderHeight() + getFooterHeight());
}
export function getConsultationsLimit(loadedContracts) {
	let contractsItems = window.CONTRACTS_PAGING || process.env.REACT_APP_CONTRACTS_PAGING
	if (loadedContracts && loadedContracts > contractsItems)
		contractsItems = loadedContracts
	return contractsItems;
}
export function getHostUrl() {
	return window.SERVER_URL
}
export function getLoginUrl(url, isLdap, username, password) {
	var ret = '';

	if (isLdap === true)
		ret = url + '/loginWithLDAP?u=' + username + '&p=' + password;
	else
		ret = url + '/login?u=' + username + '&p=' + password;

	return ret;
}
export const capitalize = (s) => {
	if (typeof s !== 'string') return ''
	return s.charAt(0).toUpperCase() + s.slice(1)
}
export function getFpaLabel(fpaValue) {
	return 'Φ.Π.Α. ' + fpaValue + '%';
}
export function getServerErrorResponseMessage(serverError) {
	var ret = '';
	if (serverError.response) {
		ret = serverError.response && serverError.response.statusText ? serverError.response.statusText : '';
		ret += serverError.response && serverError.response.status ? '(' + serverError.response.status + ')' : '';
	} else
		ret = serverError.message

	return ret;
}
export function getFpaValueFromReservations(reservations) {
	var ret = '';
	if (reservations) {
		var fpa = reservations.find((e) => e.Name === 'Φ.Π.Α.')
		ret = parseFloat(fpa.Percentage);
	}
	return ret;
}
export function getStringInLower(input) {
	let ret = '';

	if (input) {
		input = input.toString().toLowerCase();
		const inputArray = input.split(' ');
		inputArray.forEach(element => {
			ret += capitalize(element) + ' '
		});
	}
	else
		ret = '';

	return ret.trim();
}
export function addHostUrl(url) {
	return getHostUrl() + url;
}
export function getDateFormat(dateValue) {
	let ret = '';

	try {

		if (dateValue) {
			var dt = new Date(dateValue);
			if (dt.getHours() > 0) {
				ret = Intl.DateTimeFormat('el-GR', {
					year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
				}).format(new Date(dateValue))
			} else {

				ret = Intl.DateTimeFormat('el-GR', {
					year: 'numeric', month: 'short', day: 'numeric'
				}).format(new Date(dateValue));
			}
		}
		else
			ret = '';
	} catch (error) {
		ret = '';
	}

	return ret;
}
export function getDatePeriod(start, end) {
	let ret = '';

	//try {

	if (start) {
		var dtStart = new Date(start);
		var dtEnd = new Date(end);
		var month = Intl.DateTimeFormat('el-GR', { month: 'short' }).format(new Date(start))
		var startMonthNumber = ((parseInt(dtStart.getMonth()) + 1).length > 1 ? '0' : 0) + (parseInt(dtStart.getMonth()) + 1);
		var endMonthNumber = ((parseInt(dtEnd.getMonth()) + 1).length > 1 ? '0' : 0) + (parseInt(dtEnd.getMonth()) + 1);
		if (dtStart.getFullYear() == dtEnd.getFullYear()) {
			if (dtStart.getMonth() == dtEnd.getMonth())
				return dtStart.getDate() + '-' + dtEnd.getDate() + ' ' + month + ' ' + dtStart.getFullYear();
			else
				return dtStart.getDate() + '/' + startMonthNumber + ' - ' + dtEnd.getDate() + '/' + endMonthNumber + ' ' + dtStart.getFullYear();
		}
		else

			return dtStart.getDate() + '/' + startMonthNumber + '/' + + dtStart.getFullYear() + ' - ' + dtEnd.getDate() + '/' + endMonthNumber + '/' + dtEnd.getFullYear();
	}
}
export function getNullString(value) {
	var ret;

	if (value === null || value === undefined)
		ret = '';

	return ret;
}
export function getDateFormatForActivities(dateValue) {
	let ret = '';

	try {
		if (dateValue) {
			ret = Intl.DateTimeFormat('el-GR', {
				day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'
			}).format(new Date(dateValue)).replace("/", "-").replace("/", "-")
		}
		else
			ret = '';

	} catch (error) {
		ret = '';
	}

	return ret;
}
export function getDateFormatForDocument(dateValue) {
	let ret = '';

	try {
		if (dateValue) {
			ret = Intl.DateTimeFormat('el-GR', {
				day: 'numeric', month: 'numeric', year: 'numeric'
			}).format(new Date(dateValue)).replace("/", "-").replace("/", "-")
		}
		else
			ret = '';

	} catch (error) {
		ret = '';
	}

	return ret;
}
export function extractYearFromDate(dateValue) {
	let ret = '';

	try {
		if (dateValue)
			ret = Intl.DateTimeFormat('el-GR', { year: 'numeric' }).format(new Date(dateValue))
	} catch (error) {
		ret = '';
	}

	return ret;
}
export function getDateFormatWithDash(dateValue) {
	let ret = '';

	try {
		if (dateValue) {
			ret = Intl.DateTimeFormat('el-GR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateValue)).replace("/", "-").replace("/", "-")
		}
		else
			ret = '';
	}
	catch (error) {
		ret = '';
	}

	return ret;
}
export function getDateFormatForMaterialUIComponent(dateValue) {
	let ret = '';

	try {
		if (dateValue)
			ret = 'todo';
		//ret = dateFormat(dateValue, "yyyy-mm-dd");
	}
	catch (error) {
		ret = '';
	}

	return ret;
}
export function getDateTimeFormat(dateValue) {
	let ret = '';

	try {
		if (dateValue)
			ret = 'todo';
		//ret = dateFormat(dateValue, "dd/mm/yyyy HH:mm");
	} catch (error) {
		ret = '';
	}

	return ret;
}
export function getValidMaterialDateFormat(dateValue) {

	var dt = new Date(dateValue);

	var dd = dt.getDate();
	var mm = dt.getMonth() + 1;
	var yyyy = dt.getFullYear();
	var hours = dt.getHours();
	var min = dt.getMinutes();

	if (dd < 10)
		dd = '0' + dd;
	if (mm < 10)
		mm = '0' + mm;
	if (hours < 10)
		hours = '0' + hours;
	if (min < 10)
		min = '0' + min;

	return yyyy + '-' + mm + '-' + dd + 'T' + hours + ':' + min;
}
export function getAmountInWords(amount, capital) {
	//Number(amount)
	var ret = '';
	var div, rem = '';

	//Ακέραιο μέρος
	div = Math.trunc(Number(amount) / 1000);
	rem = Math.floor(Number(amount) % 1000);
	ret += getThousandsLex(div)

	div = Math.trunc(Number(rem) / 100);
	rem = Math.floor(Number(rem) % 100);
	if (ret.length > 0)
		ret += ' '
	ret += getHundrendsLex(div)

	if (rem === 11)
		ret += "έντεκα ευρώ"
	else if (rem === 12)
		ret += "δώδεκα ευρώ"
	else {
		div = Math.trunc(Number(rem) / 10);
		rem = Math.floor(Number(rem) % 10);
		ret += getDecadesLex(div)
		ret += getUnitsLex(rem)
		ret += 'ευρώ'
	}

	//Δεκαδικό μέρος
	var decimalPart = (Number(amount) - Math.floor(Number(amount))).toFixed(2) * 100
	if (decimalPart > 0) {
		div = Math.trunc(decimalPart / 10);
		rem = Math.floor(decimalPart % 10);
		ret += ' και '
		if (decimalPart === 11)
			ret += "έντεκα"
		else if (decimalPart === 12)
			ret += "δώδεκα"
		else {
			ret += getDecadesLex(div)
			ret += getUnitsLex(rem)
			ret = ret.trim()
		}
		ret += ' λεπτών'
	}

	if (capital) {
		ret = ret.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
		ret = ret.toUpperCase();
	}

	return ret;
}
export function getThousandsLex(div) {
	var ret = '';

	if (div === 1)
		ret = 'χιλίων'
	else if (div === 2)
		ret = 'δυο χιλιάδων'
	else if (div === 3)
		ret = 'τριών χιλιάδων'
	else if (div === 4)
		ret = 'τεσσάρων χιλιάδων'
	else if (div === 5)
		ret = 'πέντε χιλιάδων'
	else if (div === 6)
		ret = 'έξι χιλιάδων'
	else if (div === 7)
		ret = 'εφτά χιλιάδων'
	else if (div === 8)
		ret = 'οκτώ χιλιάδων'
	else if (div === 9)
		ret = 'εννιά χιλιάδων'
	else {
		if (div > 0 && div < 100000) {
			if (div === 11)
				ret = 'έντεκα χιλιάδων'
			else if (div === 12)
				ret = 'δώδεκα χιλιάδων'
			else {
				var rem = div;
				if (div > 100) {
					ret += getHundrendsLex(Math.trunc(Number(div) / 100));
					rem = Math.floor(Number(div) % 100);
				}

				ret += getDecadesLex(Math.trunc(Number(rem) / 10));
				rem = Math.floor(Number(rem) % 10);

				ret += getUnitsLex(rem);
				ret += 'χιλιάδων';
			}
		}
	}
	return ret;
}
export function getHundrendsLex(div) {
	var ret = '';
	if (div === 1)
		ret = 'εκατόν'
	else if (div === 2)
		ret = 'διακοσίων'
	else if (div === 3)
		ret = 'τριακοσίων'
	else if (div === 4)
		ret = 'τετρακοσίων'
	else if (div === 5)
		ret = 'πεντακοσίων'
	else if (div === 6)
		ret = 'εξακοσίων'
	else if (div === 7)
		ret = 'εφτακοσίων'
	else if (div === 8)
		ret = 'οκτακοσίων'
	else if (div === 9)
		ret = 'εννιακοσίων'

	ret += ' ';
	return ret;
}
export function getDecadesLex(div) {
	var ret = '';
	if (div === 1)
		ret = 'δέκα'
	else if (div === 2)
		ret = 'είκοσι'
	else if (div === 3)
		ret = 'τριάντα'
	else if (div === 4)
		ret = 'σαράντα'
	else if (div === 5)
		ret = 'πενήντα'
	else if (div === 6)
		ret = 'εξήντα'
	else if (div === 7)
		ret = 'εβδημόντα'
	else if (div === 8)
		ret = 'ογδόντα'
	else if (div === 9)
		ret = 'ενενήντα'

	ret += ' ';
	return ret;
}
export function getUnitsLex(div) {
	var ret = '';
	if (div === 1)
		ret = 'ενός'
	else if (div === 2)
		ret = 'δύο'
	else if (div === 3)
		ret = 'τριών'
	else if (div === 4)
		ret = 'τεσσάρων'
	else if (div === 5)
		ret = 'πέντε'
	else if (div === 6)
		ret = 'έξι'
	else if (div === 7)
		ret = 'εφτά'
	else if (div === 8)
		ret = 'οκτώ'
	else if (div === 9)
		ret = 'εννιά'

	ret += ' ';
	return ret;
}
export function getHeaderHeight() {
	return 80;
}
export function getFooterHeight() {
	return 40;
}
/* ES6 */
export function findLocalIp() {
	return new Promise((resolve, reject) => {
		window.RTCPeerConnection = window.RTCPeerConnection
			|| window.mozRTCPeerConnection
			|| window.webkitRTCPeerConnection;

		if (typeof window.RTCPeerConnection == 'undefined')
			return reject('WebRTC not supported by browser');

		let pc = new RTCPeerConnection();
		let ips = [];

		pc.createDataChannel("");
		pc.createOffer()
			.then(offer => pc.setLocalDescription(offer))
			.catch(err => reject(err));
		pc.onicecandidate = event => {
			if (!event || !event.candidate) {
				// All ICE candidates have been sent.
				if (ips.length == 0)
					return reject('WebRTC disabled or restricted by browser');

				return resolve(ips);
			}

			let parts = event.candidate.candidate.split(' ');
			let [base, componentId, protocol, priority, ip, port, , type, ...attr] = parts;
			let component = ['rtp', 'rtpc'];

			if (!ips.some(e => e == ip))
				ips.push(ip);

			console.log(" candidate: " + base.split(':')[1]);
			console.log(" component: " + component[componentId - 1]);
			console.log("  protocol: " + protocol);
			console.log("  priority: " + priority);
			console.log("        ip: " + ip);
			console.log("      port: " + port);
			console.log("      type: " + type);

			if (attr.length) {
				console.log("attributes: ");
				for (let i = 0; i < attr.length; i += 2)
					console.log("> " + attr[i] + ": " + attr[i + 1]);
			}
		}
	});
}
export function filterValue(fields, searchValue) {

	var ret = false;
	if (searchValue) {
		for (var i = 0; i < fields.length; i++) {
			if (fields[i] && includeStrings(fields[i], searchValue) === true)
				return true;
		}
	}
	else
		ret = true;


	return ret;
}
export function includeStrings(str1, searchvalue) {
	var ret = false;

	if (searchvalue) {
		if (ignoreTonousAndLowercase(str1).includes(ignoreTonousAndLowercase(searchvalue)) === true)
			ret = true;
	}
	else
		return true;

	return ret;
}
export function ignoreTonousAndLowercase(searchValue) {
	var ret = '';
	for (var i = 0; i < searchValue?.length; i++) {
		if (searchValue[i] === 'ά' || searchValue[i] === 'Ά')
			ret += 'α';
		else if (searchValue[i] === 'έ' || searchValue[i] === 'Έ')
			ret += 'ε';
		else if (searchValue[i] === 'ή' || searchValue[i] === 'Ή')
			ret += 'η';
		else if (searchValue[i] === 'ί' || searchValue[i] === 'Ί')
			ret += 'ι';
		else if (searchValue[i] === 'ό' || searchValue[i] === 'Ό')
			ret += 'ο';
		else if (searchValue[i] === 'ύ' || searchValue[i] === 'Ύ')
			ret += 'υ';
		else if (searchValue[i] === 'Ώ' || searchValue[i] === 'ώ')
			ret += 'Ω';
		else if (searchValue[i] === 'w' || searchValue[i] === 'W')
			ret += 'ς';
		else if (searchValue[i] === 'e' || searchValue[i] === 'E')
			ret += 'ε';
		else if (searchValue[i] === 'r' || searchValue[i] === 'R')
			ret += 'ρ';
		else if (searchValue[i] === 't' || searchValue[i] === 'T')
			ret += 'τ';
		else if (searchValue[i] === 'y' || searchValue[i] === 'Y')
			ret += 'υ';
		else if (searchValue[i] === 'u' || searchValue[i] === 'U')
			ret += 'θ';
		else if (searchValue[i] === 'i' || searchValue[i] === 'I')
			ret += 'ι';
		else if (searchValue[i] === 'o' || searchValue[i] === 'O')
			ret += 'ο';
		else if (searchValue[i] === 'p' || searchValue[i] === 'P')
			ret += 'π';
		else if (searchValue[i] === 'a' || searchValue[i] === 'A')
			ret += 'α';
		else if (searchValue[i] === 's' || searchValue[i] === 'S')
			ret += 'σ';
		else if (searchValue[i] === 'd' || searchValue[i] === 'D')
			ret += 'δ';
		else if (searchValue[i] === 'f' || searchValue[i] === 'F')
			ret += 'φ';
		else if (searchValue[i] === 'g' || searchValue[i] === 'G')
			ret += 'γ';
		else if (searchValue[i] === 'h' || searchValue[i] === 'H')
			ret += 'η';
		else if (searchValue[i] === 'j' || searchValue[i] === 'J')
			ret += 'ξ';
		else if (searchValue[i] === 'k' || searchValue[i] === 'K')
			ret += 'κ';
		else if (searchValue[i] === 'l' || searchValue[i] === 'L')
			ret += 'λ';
		else if (searchValue[i] === 'z' || searchValue[i] === 'Z')
			ret += 'ζ';
		else if (searchValue[i] === 'x' || searchValue[i] === 'X')
			ret += 'χ';
		else if (searchValue[i] === 'c' || searchValue[i] === 'C')
			ret += 'ψ';
		else if (searchValue[i] === 'v' || searchValue[i] === 'V')
			ret += 'ω';
		else if (searchValue[i] === 'b' || searchValue[i] === 'B')
			ret += 'β';
		else if (searchValue[i] === 'n' || searchValue[i] === 'N')
			ret += 'ν';
		else if (searchValue[i] === 'm' || searchValue[i] === 'M')
			ret += 'μ';
		else
			ret += searchValue[i];
	}

	return ret.toLowerCase();
}
export function renderImage(itemtype, item) {
	var imageMenu = item.ImageMenu;
	var imageService = item.ImageService;

	if (itemtype === 2) {
		if (imageMenu) {
			if (imageMenu.includes("fa-") === true)
				return <div className='service-image-circle'>
					<span style={{ marginLeft: '10px' }}>
						<i class={imageMenu} />
					</span>
				</div>
			else
				return <span><img src={getHostUrl() + imageMenu} /></span>
		}

		if (imageService) {
			if (imageService.includes("fa-") === true)
				return <div className='service-image-circle'>
					<span style={{ marginLeft: '10px' }}>
						<i className={imageService} />
					</span>
				</div>
			else
				return <img src={getHostUrl() + imageService} />
		}
	} else if (itemtype === 1) {
		if (imageMenu) {
			if (imageMenu.includes("fa-") === true)
				return <span style={{ marginLeft: '10px' }}><i className={imageMenu} /></span>
			else
				return <span><img src={getHostUrl() + imageMenu} /></span>
		}

		if (imageService) {
			if (imageService.includes("fa-") === true)
				return <span style={{ marginLeft: '10px' }}><i className={imageService} /></span>
			else
				return <img src={getHostUrl() + imageService} />
		}
	}

	return <></>;
}
function renderValueUrl(value) {

	if (value && (value.startsWith('http://') || value.startsWith('https://')))
		return <a href={value} target='_blank'><span style={{ fontSize: '1.5rem', fontWeight: "normal", marginLeft: '20px' }}>{value}</span></a>
	else {
		if (value === 'phonecatalog')
			return <a href={getHostUrl() + value}><span style={{ fontSize: '1.5rem', fontWeight: "normal", marginLeft: '20px' }}>{getHostUrl() + value}</span></a>
		else
			return <a href={getHostUrl() + value} target='_blank'><span style={{ fontSize: '1.5rem', fontWeight: "normal", marginLeft: '20px' }}>{getHostUrl() + value}</span></a>
	}
}
function renderValue(value) {
	return <span style={{ fontSize: '1.5rem', fontWeight: "normal", marginLeft: '20px' }}>{value}</span>
}
export function renderHtml(value) {
	//return <span style={{ fontSize: '1.5rem', fontWeight: "normal", marginLeft: '20px' }}>{parse(value)}</span>
	return parse(value || '')
}
export function renderCheckbox(value) {

	return <span style={{ marginLeft: '15px' }}>
		<Checkbox
			contentEditable={false}
			color='primary'
			checked={value}
			style={{ transform: "scale(1)" }}
			inputProps={{ 'aria-label': 'controlled' }} />
	</span>
}
export function renderDate(value) {
	return <span style={{ marginLeft: '5px' }}>{getDateFormatForActivities(value)}</span>;
}
export function renderColor(value) {
	return <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
		<div style={{ marginLeft: '5px', width: '50px', height: '50px', background: value, border: '2px solid black' }}></div>
		<div style={{ marginLeft: '25px' }}>{value}</div>
	</div>
}
export function renderList(list) {
	if (Array.isArray(list) === true) {
		if (list && list.length > 0) {
			var value = list.map((item) => {
				return <div style={{
					background: 'lightgrey',
					padding: '7px',
					borderRadius: '10px',
					margin: '10px',
				}}>
					{item && item.Name}
				</div>;
			})
			return <div style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
				{value}
			</div>
		} else
			return <></>
	} else
		console.log(list);
}
export function renderDetail(label, value, info) {
	if (value !== undefined && value !== null)
		return <div style={{ display: 'flex', flex: 1, flexDirection: 'row', fontSize: '1.5rem', fontWeight: "normal", width: '100%', paddingBottom: '20px' }}>
			<div style={{ fontSize: '1.5rem', fontWeight: "bold", minWidth: '250px', maxWidth: '250px', textAlign: 'right', flexWrap: 'wrap', alignSelf: 'center' }}>{label}: </div>
			{info && info.isHtml === true ? renderHtml(value) : <></>}
			{info && info.isDate === true ? renderDate(value) : <></>}
			{info && info.isImage === true ? <span style={{ marginLeft: '5px' }}>{renderImage(value)}</span> : <></>}
			{info && info.isCheckbox === true ? renderCheckbox(value) : <></>}
			{info && info.isUrl === true ? renderValueUrl(value) : <></>}
			{info && info.isText === true ? renderValue(value) : <></>}
			{info && info.isColor === true ? renderColor(value) : <></>}
			{info && info.isList === true ? renderList(value) : <></>}
		</div>
	else
		return <></>
}