import { Redirect, Route } from 'react-router-dom';



function PrivateRoute({ component: Component, ...rest }: any) {
	const isLogin = localStorage.getItem("accessToken");
	// let search = window.location.search;
	// let params = new URLSearchParams(search);
	// let foo = params.get('ref');
	let reUrl = "/signin?ref=" + window.location.href
	return (
		<Route
			{...rest}
			render={props => {
				return isLogin ? <Component {...props} /> : <Redirect to={reUrl} />;
			}}
		></Route>
	);
}
export default PrivateRoute;
