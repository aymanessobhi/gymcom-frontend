import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/auth/login/userSlice";
import React from 'react';

import { Row, Col, Input, Button, Alert, Container, Label } from "reactstrap";

// Redux
import { Link } from 'react-router-dom';

// availity-reactstrap-validation
import { AvForm, AvField } from 'availity-reactstrap-validation';

// import images
import logodark from "../../assets/images/logo.jpg";
import logolight from "../../assets/images/logo.jpg";
import { useTranslation } from "react-i18next";


function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation('translation');
    const {loading, error} = useSelector(state => state.user);

    useEffect(() => {
        document.body.classList.add("auth-body-bg");
        return () => {
            document.body.classList.remove("auth-body-bg");
        }
    }, []);

    const formik = useFormik({
        initialValues: { username: '', password: '' },
        onSubmit: (values) => {
            dispatch(userActions.login({ user: values, history: navigate }));
        }
    });

    return (
        <React.Fragment>
            {loading ? <div id="preloader">
                    <div id="status">
                        <div className="spinner">
                            <i className="ri-loader-line spin-icon"></i>
                        </div>
                    </div>
                </div> :
            <div>
                <Container fluid className="p-0">
                    <Row className="g-0">
                        <Col lg={4}>
                            <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                                <div className="w-100">
                                    <Row className="justify-content-center">
                                        <Col lg={9}>
                                            <div>
                                                <div className="text-center">
                                                    <div>
                                                        <Link to="/" className="">
                                                            <img src={logodark} alt="" height="20" className="auth-logo logo-dark mx-auto" />
                                                            <img src={logolight} alt="" height="20" className="auth-logo logo-light mx-auto" />
                                                        </Link>
                                                    </div>
                                                    <h4 className="font-size-18 mt-4">Welcome Back !</h4>
                                                    <p className="text-muted">{t('login.title')}</p>
                                                </div>
                                                {error && error ? <Alert color="danger">{error}</Alert> : null}
                                                <div className="p-2 mt-5">
                                                    <AvForm className="form-horizontal" onValidSubmit={formik.handleSubmit} >
                                                        <div className="auth-form-group-custom mb-4">
                                                            <i className="ri-user-2-line auti-custom-input-icon"></i>
                                                            <Label htmlFor="username">{t('login.username')}</Label>
                                                            <AvField {...formik.getFieldProps('username')} type="text" className="form-control" id="username"  
                                                            placeholder={t('login.username')} validate={{ required: { value: true } }}/>
                                                        </div>

                                                        <div className="auth-form-group-custom mb-4">
                                                            <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                                            <Label htmlFor="userpassword">{t('login.password')}</Label>
                                                            <AvField {...formik.getFieldProps('password')} type="password" className="form-control" id="userpassword" 
                                                            placeholder={t('login.password')} validate={{ required: { value: true } }}/>
                                                        </div>

                                                        <div className="form-check">
                                                            <Input type="checkbox" className="form-check-input" id="customControlInline" />
                                                            <Label className="form-check-label" htmlFor="customControlInline">{t('login.rememberme')}</Label>
                                                        </div>

                                                        <div className="mt-4 text-center">
                                                            <Button color="primary" className="w-md waves-effect waves-light" type="submit">{t('actions.login')}</Button>
                                                        </div>

                                                        <div className="mt-4 text-center">
                                                            <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock me-1"></i> {t('login.forgetpass')}</Link>
                                                        </div>
                                                    </AvForm>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p>© 2024 PPM - Performance Pathfinder Metrics. Développé par ONEDOZ</p>
                                                </div>
                                            </div>

                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col lg={8}>
                            <div className="authentication-bg">
                                <div className="bg-overlay"></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>}
        </React.Fragment>
    )
}

export default Login;