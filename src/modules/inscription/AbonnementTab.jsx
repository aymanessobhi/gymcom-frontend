import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, CardBody, Col, Container, Label, Row, FormGroup, Form } from "reactstrap";
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router";
import { FormikProvider } from 'formik';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import AbonnementImage from "./AbonnementImage";


const AbonnementTab = ({ formik }) => {
    const inlineStyle = {
        display: 'inline-flex',
        marginRight: '10px',
    };

    const { t } = useTranslation('translation');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {

        // dispatch(articleActions.find(payload));

    }, []);

    const breadcrumbItems = [
        { title: t('abonnement'), link: "#" },
        { title: id ? t('editabonn') : t('newabonn'), link: "#" }
    ];

    const handleChangeTAbonnment = ({ target }) => {
        formik.setFieldValue('abonnment', target.value);
    }
    const handleChangeTActive = ({ target }) => {
        formik.setFieldValue('active', target.value);
    }

    return (
        <>
            <React.Fragment>
                <div className="page-content">
                    <Container fluid={true}>
                        <Breadcrumbs title={id ? t('editarticle') : t('newarticle')} breadcrumbItems={breadcrumbItems} />
                        <Card>
                            <CardBody>
                                <AvForm className="needs-validation" onValidSubmit={formik.handleSubmit} >
                                    <Row>
                                        <Col xs={12}>
                                            <Card>
                                                <CardBody>
                                                    <h4 className="card-title">{t('client.form')}</h4>

                                                    <Row className="mb-2">
                                                        <Row className="mb-3">
                                                            <Col md="6">
                                                                <div className="mb-3">
                                                                    <Label className="form-label" htmlFor="nom">{t('client.nom')}</Label>
                                                                    <AvField
                                                                        {...formik.getFieldProps('nom')}
                                                                        placeholder={t('client.nom')}
                                                                        type="text"
                                                                        errorMessage={t('message.required')}
                                                                        className="form-control"
                                                                        validate={{ required: { value: true } }}
                                                                        id="nom"
                                                                    />
                                                                </div>
                                                            </Col>

                                                            <Col md="6">
                                                                <div className="mb-3">
                                                                    <Label className="form-label" htmlFor="prenom">{t('client.prenom')}</Label>
                                                                    <AvField
                                                                        {...formik.getFieldProps('prenom')}
                                                                        placeholder={t('client.prenom')}
                                                                        type="text"
                                                                        errorMessage={t('message.required')}
                                                                        className="form-control"
                                                                        validate={{ required: { value: false } }}
                                                                        id="prenom"
                                                                    />
                                                                </div>
                                                            </Col>

                                                        </Row>
                                                        <Row className="mb-3">
                                                            <Col md="6">
                                                                <div className="mb-3">
                                                                    <Label className="form-label" htmlFor="tele">{t('client.tele')}</Label>
                                                                    <AvField
                                                                        {...formik.getFieldProps('tele')}
                                                                        placeholder={t('client.tele')}
                                                                        type="text"
                                                                        errorMessage={t('message.required')}
                                                                        className="form-control"
                                                                        validate={{ required: { value: false } }}
                                                                        id="tele"
                                                                    />
                                                                </div>
                                                            </Col>

                                                            <Col md="4">
                                                                <div className="mb-3">
                                                                    <Label className="form-label" htmlFor="date">{t('client.date')}</Label>
                                                                    <AvField
                                                                        {...formik.getFieldProps('date')}
                                                                        placeholder={t('client.date')}
                                                                        type="date"
                                                                        errorMessage={t('message.required')}
                                                                        className="form-control"
                                                                        validate={{ required: { value: false } }}
                                                                        id="date"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row className="mb-3">
                                                            <Col md="6">
                                                                <div className="mb-3">
                                                                    <Label className="form-label" htmlFor="cin">{t('client.cin')}</Label>
                                                                    <AvField
                                                                        {...formik.getFieldProps('cin')}
                                                                        placeholder={t('client.cin')}
                                                                        type="text"
                                                                        errorMessage={t('message.required')}
                                                                        className="form-control"
                                                                        validate={{ required: { value: false } }}
                                                                        id="cin"
                                                                    />
                                                                </div>
                                                            </Col>
                                                        </Row>

                                                        <Col md="4">
                                                            <div className="mb-3">
                                                                <Label className="form-label" htmlFor="abonnment">{t('client.abonnment')}</Label>
                                                                <AvField
                                                                    type="select"
                                                                    {...formik.getFieldProps('abonnment')}
                                                                    className="form-control"
                                                                    onChange={handleChangeTAbonnment}
                                                                    validate={{ required: { value: true } }}
                                                                    id="abonnment"
                                                                >
                                                                    <option value="">{t('select')}</option>

                                                                    <option value="1 ANS">1 Ans</option>
                                                                    <option value="6 MOIS">6 mois</option>

                                                                </AvField>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Col md="4">
                                                            <div className="mb-3">
                                                                <Label className="form-label" htmlFor="dateDebut">{t('client.dateDebut')}</Label>
                                                                <AvField
                                                                    {...formik.getFieldProps('dateDebut')}
                                                                    placeholder={t('client.dateDebut')}
                                                                    type="date"
                                                                    errorMessage={t('message.required')}
                                                                    className="form-control"
                                                                    validate={{ required: { value: false } }}
                                                                    id="dateDebut"
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col md="4">
                                                            <div className="mb-3">
                                                                <Label className="form-label" htmlFor="dateFin">{t('client.dateFin')}</Label>
                                                                <AvField
                                                                    {...formik.getFieldProps('dateFin')}
                                                                    placeholder={t('client.dateFin')}
                                                                    type="date"
                                                                    errorMessage={t('message.required')}
                                                                    className="form-control"
                                                                    validate={{ required: { value: false } }}
                                                                    id="dateFin"
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                    <Row className="mb-3">
                                                        <Form>
                                                            <Label for="checkbox2" sm={2}>Active</Label>

                                                            <FormGroup check style={inlineStyle} >
                                                                <AvField
                                                                    {...formik.getFieldProps('active')}
                                                                    type="radio"
                                                                    name="active"
                                                                    value="Oui"
                                                                    onChange={handleChangeTActive}

                                                                />
                                                                <Label check  >
                                                                    Oui
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup check inline style={inlineStyle} >
                                                                <AvField
                                                                    {...formik.getFieldProps('active')}
                                                                    type="radio"
                                                                    name="active"
                                                                    value="Non"
                                                                    onChange={handleChangeTActive}

                                                                />
                                                                <Label check className="radio-label">
                                                                    Non
                                                                </Label>
                                                            </FormGroup>
                                                        </Form>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <AbonnementImage formik={formik} />
                                    </Row>
                                    <Button color="primary" type="submit">{t('actions.save')}</Button>
                                </AvForm>
                            </CardBody>
                        </Card>
                    </Container>
                </div>
            </React.Fragment>
        </>
    )
}

export default AbonnementTab;