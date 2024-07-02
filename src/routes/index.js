import React from "react";
import { Navigate } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";
import { ADD_PAYMENT, DASHBOARD_PAGE, LIST_ABONNEE, REGISTER_FORM, VIEW_ABONEE } from "./routeConstants";
import Inscription from "../modules/inscription";
import ListAbonnee from "../modules/inscription/ListAbonnee";
import ViewAbonnee from "../modules/inscription/ViewAbonnee";
import PaiementTab from "../modules/inscription/PaiementTab";
import NewPayment from "../modules/inscription/NewPayment";
import Dashboard from "../modules/dashboard";



const authProtectedRoutes = [
	{ path: DASHBOARD_PAGE, component: <Dashboard /> },
	// Gestion des pannes et arrets 
	{ path: REGISTER_FORM, component: <Inscription /> },
	{ path: VIEW_ABONEE, component: <ViewAbonnee /> },
	{ path: LIST_ABONNEE, component: <ListAbonnee /> },
	{ path: ADD_PAYMENT, component: <NewPayment/> },
	
	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: <Navigate to="/login" /> },
];

const publicRoutes = [
	{ path: "/logout", component: <Logout /> },
	{ path: "/login", component: <Login /> },
	// { path: VIEW_ABONEE, component: <ViewAbonnee /> },
	// { path: LIST_ABONNEE, component: <ListAbonnee /> },
	// { path: ADD_PAYMENT, component: <NewPayment/> },

	{ path: "/forgot-password", component: <ForgetPwd /> },
	{ path: "/lock-screen", component: <AuthLockScreen /> },
];

export { authProtectedRoutes, publicRoutes };
