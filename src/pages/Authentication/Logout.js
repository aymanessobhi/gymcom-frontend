import React, { Component, useEffect } from 'react';
// import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/auth/login/userSlice';
import { useNavigate } from 'react-router-dom';

function Logout (){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        // Fire Action for Remove all Item from localstorage and redirect to login page
        setTimeout(() => {
            dispatch(userActions.logout({ history: navigate }));
        }, [100]);
    }, []);

    return (
        <React.Fragment>
            <h1>&nbsp;</h1>
        </React.Fragment>
    )

};

export default Logout;

