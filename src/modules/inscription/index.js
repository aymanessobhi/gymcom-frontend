import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, NavItem, NavLink, Progress, TabContent, TabPane } from "reactstrap";
import classnames from 'classnames';
import { Link } from "react-router-dom";
import AbonnementTab from "./AbonnementTab";
import AbonnementImage from "./AbonnementImage";
import { clientActions } from '../../sagas/clientSlice';
import PaiementTab from "./PaiementTab";
import { AvForm } from "availity-reactstrap-validation";
import { dataActions } from "../../sagas/dataSlice";
import ConfirmationTab from "./ConfirmationTab";

const initForm = {
    // inscription data
    nom: '',
    prenom: '',
    tele: '',
    datenaiss: '',
    cin: '',
    typeAbonnement: null,
    genre:null,
    dateDebut: '',
    dateFin: '',
    active: '',
    documents: [],

    // Paiement data
    typePaie:null,
    totalAPaye:'',
    montantPaye:'',
    resteAPaye:'',
    assuranceInclu:null,
    datePaiementCheque:'',
    numeroCheque:''
};
const Inscription = () => {

    const [filesToUpload, setFilesToUpload] = useState([]);
    const [activeTab, setActive] = useState(1);
    const [progressValue, setProgressValue] = useState(25);
    const [formState, setForm] = useState(initForm);
    const dispatch = useDispatch();


    const formik = useFormik({
        initialValues: { ...formState },
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log('valussss',values);
            // dispatch(clientActions.addClient(values));
            let payload = {
                data: values,
                onSuccess: () => {
                    // navigate(DATABASE_ARTICLE_PAGE)
                }
            }
            // dispatch(articleActions.create(payload));
        }
    });

    useEffect(() => {
        dispatch(dataActions.loadData());
      }, []);

    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            if (tab >= 1 && tab <= 3) {
                setActive(tab);
                if (tab === 1) { setProgressValue(25) }
                if (tab === 2) { setProgressValue(50) }
                if (tab === 3) { setProgressValue(100) }
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
                                <NavLink className={classnames({ active: activeTab === 2 })} onClick={() => { toggleTab(2); }} >
                                    <span className="step-number">02</span>
                                    <span className="step-title">PAIEMENT</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: activeTab === 3 })} onClick={() => { toggleTab(3); }} >
                                    <span className="step-number">03</span>
                                    <span className="step-title">Confirmation</span>
                                </NavLink>
                            </NavItem>
                        </ul>

                        <div id="bar" className="mt-4">
                            <Progress color="success" striped animated value={progressValue} />
                        </div>
                        <AvForm className="needs-validation" onValidSubmit={formik.handleSubmit} >
                        <TabContent activeTab={activeTab} className="twitter-bs-wizard-tab-content">
                            <TabPane tabId={1}>
                                <AbonnementTab formik={formik} />
                            </TabPane>
                            <TabPane tabId={2}>
                                <PaiementTab formik={formik} />
                            </TabPane>

                            <TabPane tabId={3}>
                                {/* <ConfirmationTab formik={formik}/> */}
                            </TabPane>
                        </TabContent>
                        </AvForm>
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