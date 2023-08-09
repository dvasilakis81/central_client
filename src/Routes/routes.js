import React, { Suspense, lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../HOC/Layout/layout';
import { showGenericMessage } from '../Components/Common/templates';
import Home from '../Components/Home/home';
import AdministrationPage from '../Components/Administration/AdministrationPage';
import LoginPage from '../Components/Login/login';
import MenuItemNew from '../Components/Administration/Menu/menuitemnew';
import PageItemNew from '../Components/Administration/Page/pageitemnew';
import MediaItemNew from '../Components/Administration/Media/mediaitemnew';
import AnnouncementItemNew from '../Components/Administration/Announcements/announcementitemnew';
import UserItemNew from '../Components/Administration/Users/useritemnew';
import CategoryItemNew from '../Components/Administration/Categories/categoryitemnew';
import PageInfo from '../Components/PageInfo/pageinfo';
//const PageInfo = React.lazy(() => import('../Components/PageInfo/pageinfo'));
import PhoneCatalog from '../Components/PhoneCatalog/phonecatalog';

//const Home = lazy(() => import('./Components/Home/home'));
//const Login = lazy(() => import('./Components/Login/login'));

class AppRoutes extends React.Component {

	render() {

		return (
			//   <ErrorBoundary>
			<Layout>
				<Suspense fallback={showGenericMessage('Παρακαλώ περιμένετε...', false, true)}>
					<Routes>
						{/* <Route element={<AnimationLayout />}>							 */}
						<Route path="/newmediaitem" element={<MediaItemNew />} />
						<Route path="/newmenuitem" element={<MenuItemNew />} />
						<Route path="/newpageitem" element={<PageItemNew />} />
						<Route path="/newuseritem" element={<UserItemNew />} />
						<Route path="/newannouncementitem" element={<AnnouncementItemNew />} />
						<Route path="/newcategoryitem" element={<CategoryItemNew />} />
						<Route path="/phonecatalog" element={<PhoneCatalog />} />
						<Route path="/administration" element={<AdministrationPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/:pageurl" element={<PageInfo />} />
						<Route path="/" element={<Home />} />
						{/* </Route> */}
					</Routes>
				</Suspense>
			</Layout>
			//   </ErrorBoundary>
		)
	}
}

export default AppRoutes

//Code splitting
// import React from 'react';
// import { Route, Switch } from 'react-router-dom';
// import asyncComponent from './components/AsyncComponent/asyncComponent'

// const Home = asyncComponent(() =>
//     import('./components/Home/home').then(module => module.default)
// )

// const InsertProtocolWear = asyncComponent(() =>
//     import('./components/Protocols/insertprotocolwear').then(module => module.default)
// )

// const Test = asyncComponent(() =>
//     import('./components/Protocols/test').then(module => module.default)
// )

// const Layout = asyncComponent(() =>
//     import('./hoc/Layout/layout').then(module => module.default)
// )

// class Routes extends React.Component {
//     render() {
//         return (
//             <Layout>
//                 <Switch>
//                     <Route path="/test" exact component={Test} />
//                     <Route path="/insertprotocolwear" exact component={InsertProtocolWear} />
//                     <Route path="/" exact component={Home} />
//                 </Switch>
//             </Layout>
//         )
//     }
// }

//export default Routes;