import React, { useState } from "react";
import { Col, Container, Form, Input, Label, NavItem, NavLink, Progress, Row, TabContent, TabPane } from "reactstrap";
import classnames from 'classnames';
import { Link } from "react-router-dom";
import AbonnementTab from "./AbonnementTab";
import PaiementTab from "./PaiementTab";

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
                                    <span className="step-title">IDENFICATION DE L'ABONNE </span>
                                </NavLink>
                            </NavItem>
                            
                            <NavItem>
                                <NavLink className={classnames({ active: activeTab === 3 })} onClick={() => { toggleTab(3); }} >
                                    <span className="step-number">02</span>
                                    <span className="step-title">PAIEMENT</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: activeTab === 4 })} onClick={() => { toggleTab(4); }} >
                                    <span className="step-number">03</span>
                                    <span className="step-title">Confirmation</span>
                                </NavLink>
                            </NavItem>
                        </ul>

                        <div id="bar" className="mt-4">
                            <Progress color="success" striped animated value={progressValue} />
                        </div>
                        <TabContent activeTab={activeTab} className="twitter-bs-wizard-tab-content">
                            <TabPane tabId={1}>
                                <AbonnementTab/>
                            </TabPane>
                            <TabPane tabId={2}>
                                <PaiementTab/>
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