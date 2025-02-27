import React from "react";
import { Navigate } from "react-router-dom";
import { AxiosInterceptor } from "../helpers/AxiosInterceptor";

// const AppRoute = ({
// 	component: Component,
// 	layout: Layout,
// 	isAuthProtected,
// 	...rest
// }) => (
// 		<Route
// 			{...rest}
// 			render={props => {

// 				if (isAuthProtected && !localStorage.getItem("authUser")) {
// 					return (
// 						<Navigate to={{ pathname: "/login", state: { from: props.location } }} />
// 					);
// 				}

// 				return (
// 					<Layout>
// 						<Component {...props} />
// 					</Layout>
// 				);
// 			}}
// 		/>
// 	);

const AppRoute = (props) => {
	if (!localStorage.getItem("authUser")) {
		return (
			<Navigate to={{ pathname: "/login", state: { from: props.location } }} />
		);
	}
	return (
		<AxiosInterceptor>
			<React.Fragment>
				{props.children}
			</React.Fragment>
		</AxiosInterceptor>);
}

export default AppRoute;

