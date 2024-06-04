import React, { useState } from "react";
import { Col, Container, Form, Input, Label, NavItem, NavLink, Progress, Row, TabContent, TabPane } from "reactstrap";
import classnames from 'classnames';
import { Link } from "react-router-dom";

const Inscription = () => {

    const [activeTab, setActive] = useState(1);
    const [progressValue, setProgressValue] = useState(25);

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            if (tab >= 1 && tab <= 4) {
                setActive(tab);

                if (tab === 1) { setProgressValue(25) }
                if (tab === 2) { setProgressValue(50) }
                if (tab === 3) { setProgressValue(75) }
                if (tab === 4) { setProgressValue(100) }
            }
        }
    }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <div id="progrss-wizard" className="twitter-bs-wizard">
                        <ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
                            <NavItem>
                                <NavLink className={classnames({ active: activeTab === 1 })} onClick={() => { toggleTab(1); }} >
                                    <span className="step-number">01</span>
                                    <span className="step-title">IDENFICATION DU CANDIDAT </span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: activeTab === 2 })} onClick={() => { toggleTab(2); }} >
                                    <span className="step-number">02</span>
                                    <span className="step-title">TELECHARGEMENT DES DOCUMENTS PHYSIQUES</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: activeTab === 3 })} onClick={() => { toggleTab(3); }} >
                                    <span className="step-number">03</span>
                                    <span className="step-title">PAIEMENT</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: activeTab === 4 })} onClick={() => { toggleTab(4); }} >
                                    <span className="step-number">04</span>
                                    <span className="step-title">Confirmation</span>
                                </NavLink>
                            </NavItem>
                        </ul>

                        <div id="bar" className="mt-4">
                            <Progress color="success" striped animated value={progressValue} />
                        </div>
                        <TabContent activeTab={activeTab} className="twitter-bs-wizard-tab-content">
                            <TabPane tabId={1}>
                                <Form>
                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-firstname-input14">First name</Label>
                                                <Input type="text" className="form-control" id="basicpill-firstname-input14" />
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-lastname-input15">Last name</Label>
                                                <Input type="text" className="form-control" id="basicpill-lastname-input15" />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-phoneno-input16">Phone</Label>
                                                <Input type="text" className="form-control" id="basicpill-phoneno-input16" />
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-email-input17">Email</Label>
                                                <Input type="email" className="form-control" id="basicpill-email-input17" />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg="12">
                                            <div className="mb-3">
                                                <Label className="form-label" htmlFor="basicpill-address-input2">Address</Label>
                                                <textarea id="basicpill-address-input2" className="form-control" rows="2"></textarea>
                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </TabPane>
                            <TabPane tabId={2}>
                                <div>
                                    <Form>
                                        <Row>
                                            <Col lg="6">
                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="basicpill-pancard-input18">PAN Card</Label>
                                                    <Input type="text" className="form-control" id="basicpill-pancard-input18" />
                                                </div>
                                            </Col>

                                            <Col lg="6">
                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="basicpill-vatno-input19">VAT/TIN No.</Label>
                                                    <Input type="text" className="form-control" id="basicpill-vatno-input19" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="basicpill-cstno-input20">CST No.</Label>
                                                    <Input type="text" className="form-control" id="basicpill-cstno-input20" />
                                                </div>
                                            </Col>

                                            <Col lg="6">
                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="basicpill-servicetax-input21">Service Tax No.</Label>
                                                    <Input type="text" className="form-control" id="basicpill-servicetax-input21" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="basicpill-companyuin-input22">Company UIN</Label>
                                                    <Input type="text" className="form-control" id="basicpill-companyuin-input22" />
                                                </div>
                                            </Col>

                                            <Col lg="6">
                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="basicpill-declaration-input23">Declaration</Label>
                                                    <Input type="text" className="form-control" id="basicpill-Declaration-input23" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </TabPane>
                            <TabPane tabId={3}>
                                <div>
                                    <Form>
                                        <Row>
                                            <Col lg="6">
                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="basicpill-namecard-input24">Name on Card</Label>
                                                    <Input type="text" className="form-control" id="basicpill-namecard-input24" />
                                                </div>
                                            </Col>

                                            <Col lg="6">
                                                <div className="mb-3">
                                                    <Label>Credit Card Type</Label>
                                                    <select className="form-select">
                                                        <option defaultValue>Select Card Type</option>
                                                        <option value="AE">American Express</option>
                                                        <option value="VI">Visa</option>
                                                        <option value="MC">MasterCard</option>
                                                        <option value="DI">Discover</option>
                                                    </select>
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="basicpill-cardno-input25">Credit Card Number</Label>
                                                    <Input type="text" className="form-control" id="basicpill-cardno-input25" />
                                                </div>
                                            </Col>

                                            <Col lg="6">
                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="basicpill-card-verification-input26">Card Verification Number</Label>
                                                    <Input type="text" className="form-control" id="basicpill-card-verification-input26" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="6">
                                                <div className="mb-3">
                                                    <Label className="form-label" htmlFor="basicpill-expiration-input27">Expiration Date</Label>
                                                    <Input type="text" className="form-control" id="basicpill-expiration-input27" />
                                                </div>
                                            </Col>

                                        </Row>
                                    </Form>
                                </div>
                            </TabPane>
                            <TabPane tabId={4}>
                                <div className="row justify-content-center">
                                    <Col lg="6">
                                        <div className="text-center">
                                            <div className="mb-4">
                                                <i className="mdi mdi-check-circle-outline text-success display-4"></i>
                                            </div>
                                            <div>
                                                <h5>Confirm Detail</h5>
                                                <p className="text-muted">If several languages coalesce, the grammar of the resulting</p>
                                            </div>
                                        </div>
                                    </Col>
                                </div>
                            </TabPane>
                        </TabContent>
                        <ul className="pager wizard twitter-bs-wizard-pager-link">
                            <li className={activeTab === 1 ? "previous disabled" : "previous"}><Link to="#" onClick={() => { toggleTab(activeTab - 1); }}>Previous</Link></li>
                            <li className={activeTab === 4 ? "next disabled" : "next"}><Link to="#" onClick={() => { toggleTab(activeTab + 1); }}>Next</Link></li>
                        </ul>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Inscription;