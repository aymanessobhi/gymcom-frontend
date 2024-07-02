import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { Col, Container, NavItem, NavLink, Progress, TabContent, TabPane } from "reactstrap";
import classnames from 'classnames';
import { Link, useNavigate } from "react-router-dom";
import AbonnementTab from "./AbonnementTab";
import PaiementTab from "./PaiementTab";
import { AvForm } from "availity-reactstrap-validation";
import { dataActions } from "../../sagas/dataSlice";
import ConfirmationTab from "./ConfirmationTab";
import { paiementActions } from "../../sagas/paiementSlice";
import toast, { Toaster } from 'react-hot-toast';
import { LIST_ABONNEE } from "../../routes/routeConstants";
import * as Yup from 'yup';



const initInscriptionForm = {
    // inscription data
    nom: '',
    prenom: '',
    tele: '',
    datenaiss: '',
    cin: '',
    abonnment: null,
    genre: null,
    dateDebut: '',
    dateFin: '',
    active: "true",
    documents: [],
}
const initPaimentForm = {
    // Paiement data
    typePaie: null,
    totalAPaye: '',
    montantPaye: '',
    resteAPaye: '',
    datePaiement: '',
    assuranceInclu: null,
    datePaiementCheque: '',
    numeroCheque: '',
    inscription: null
};
const Inscription = () => {

    const [filesToUpload, setFilesToUpload] = useState([]);
    const [activeTab, setActive] = useState(1);
    const [progressValue, setProgressValue] = useState(25);
    const [formStateInscription, setFormInscription] = useState(initInscriptionForm);
    const [formStatePaiment, setFormPaiment] = useState(initPaimentForm);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(dataActions.loadData());
    }, []);

    const formikInscription = useFormik({
        initialValues: { ...formStateInscription },
        enableReinitialize: true,

    });

    const formikPaiement = useFormik({
        initialValues: { ...formStatePaiment, inscription: formikInscription.values, datePaiement: formikInscription.values.dateDebut },
        enableReinitialize: true,
        onSubmit: (values, { resetForm, setSubmitting }) => {
            let payload = {
                data: values,
                onSuccess: () => {
                    toast.promise(
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                            }, 3000);
                        }),
                        {
                            success: 'Données enregistrées avec succès !!',
                            error: "Erreur lors de l'enregistrement des données",
                        }
                    ).then(() => {
                        setTimeout(() => {
                            resetForm();
                            navigate(LIST_ABONNEE);
                        }, 3000);
                    });
                },
                onError:() => {
                    toast.error("Erreur lors de l'enregistrement des données: veuillez remplir tous les champs requis.")
                }
            };
            if (values.id > 0) {
                // dispatch(inscriptionActions.update(payload));
            } else {
                dispatch(paiementActions.create(payload));
                setSubmitting(false);
            }
        }
    });

    const getDateFin = () => {
        const dateDebut = new Date(formikInscription.values.dateDebut)
        let daysToAdd;
        switch (formikInscription.values.abonnment) {
            case "ABONN1":
                daysToAdd = 30;
                break;
            case "ABONN2":
                daysToAdd = 90;
                break;
            case "ABONN3":
                daysToAdd = 365;
            default: break;
        }
        const dateFin = new Date(dateDebut);
        dateFin.setDate(dateFin.getDate() + daysToAdd);

        var d = dateFin,
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    console.log(getDateFin())

    const handleSave = () => {
        formikPaiement.handleSubmit();
    };

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
                    <Toaster />
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
                        <AvForm className="needs-validation" onValidSubmit={handleSave} >
                            <TabContent activeTab={activeTab} className="twitter-bs-wizard-tab-content">
                                <TabPane tabId={1}>
                                    <AbonnementTab formik={formikInscription} dateFin={getDateFin()} />
                                </TabPane>
                                <TabPane tabId={2}>
                                    <PaiementTab formik={formikPaiement} typeValue={formikPaiement.values.inscription} />
                                </TabPane>

                                <TabPane tabId={3}>
                                    <ConfirmationTab formikPaiement={formikPaiement} formikInscription={formikInscription} />
                                </TabPane>
                            </TabContent>
                        </AvForm>
                        <ul className="pager wizard twitter-bs-wizard-pager-link">
                            <li className={activeTab === 1 ? "previous disabled" : "previous"}><Link to="#" onClick={() => { toggleTab(activeTab - 1); }}>Retour</Link></li>
                            <li className={activeTab !== 3 ? "next disabled" : "next"} disabled={formikPaiement.isSubmitting}>
                                <Link className="mx-2" to="#" onClick={handleSave} >
                                    Enregistrer
                                </Link>
                            </li>
                            <li className={activeTab !== 3 ? "next disabled" : "next"}><Link className="mx-2" to="#" onClick={() => { toggleTab(activeTab + 1); }}>Imprimer fiche inscription</Link></li>
                            <li className={activeTab === 3 ? "next disabled" : "next"}><Link to="#" onClick={() => { toggleTab(activeTab + 1); }}>Suivant</Link></li>
                        </ul>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Inscription;