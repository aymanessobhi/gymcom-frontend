import React from "react";
import { Navigate } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";
import { DASHBOARD_PAGE, REGISTER_FORM } from "./routeConstants";
import Inscription from "../modules/inscription";



const authProtectedRoutes = [
	// { path: DASHBOARD_PAGE, component: <DashboardPage /> },
	//{ path: "/main/qualite/form", component: <FormElements /> },
	// Gestion des pannes et arrets 
	{ path: REGISTER_FORM, component: <Inscription /> },
	
	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: <Navigate to="/login" /> },
];

const publicRoutes = [
	{ path: "/logout", component: <Logout /> },
	{ path: "/login", component: <Inscription /> },
	{ path: "/forgot-password", component: <ForgetPwd /> },
	{ path: "/lock-screen", component: <AuthLockScreen /> },
];

export { authProtectedRoutes, publicRoutes };
