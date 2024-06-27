import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Label,
  Row,
  FormGroup,
  Form,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { FormikProvider } from "formik";
import { AvForm, AvField, AvRadioGroup, AvRadio } from "availity-reactstrap-validation";
import AbonnementImage from "./AbonnementImage";
import { dataActions } from "../../sagas/dataSlice";

const AbonnementTab = ({ formik }) => {
  const inlineStyle = {
    display: "inline-flex",
    marginRight: "10px",
  };

  const { t } = useTranslation("translation");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();

  const { genre, typeAbonnement } = useSelector((state) => state.data);

  const breadcrumbItems = [
    { title: t("abonnement"), link: "#" },
    { title: id ? t("editabonn") : t("newabonn"), link: "#" },
  ];

  const handleChangeGenre = ({ target }) => {
    formik.setFieldValue("genre", target.value);
  };
  const handleChangeTypeAbonnement = ({ target }) => {
    formik.setFieldValue("typeAbonnement", target.value);
  };

  const handleChangeTActive = ({ target }) => {
    formik.setFieldValue("active", target.value);
  };
  return (
    <>
      <React.Fragment>
        <FormikProvider value={formik}>
          <Container fluid={true}>
            <Card>
              <CardBody>
                <Row>
                  <Col xs={12}>
                    <Card>
                      <CardBody>
                        <Row>
                          <Row className="mb-1">
                            <Col md="4">
                              <div className="mb-3">
                                <Label className="form-label" htmlFor="nom">
                                  {t("inscription.nom")}
                                </Label>
                                <AvField
                                  {...formik.getFieldProps("nom")}
                                  placeholder={t("inscription.nom")}
                                  type="text"
                                  errorMessage={t("message.required")}
                                  className="form-control"
                                  validate={{ required: { value: true } }}
                                  id="nom"
                                />
                              </div>
                            </Col>
                            <Col md="4">
                              <div className="mb-3">
                                <Label className="form-label" htmlFor="prenom">
                                  {t("inscription.prenom")}
                                </Label>
                                <AvField
                                  {...formik.getFieldProps("prenom")}
                                  placeholder={t("inscription.prenom")}
                                  type="text"
                                  errorMessage={t("message.required")}
                                  className="form-control"
                                  validate={{ required: { value: false } }}
                                  id="prenom"
                                />
                              </div>
                            </Col>
                            <Col md="4">
                              <div className="mb-3">
                                <Label className="form-label" htmlFor="genre">
                                  {t("inscription.genre")}
                                </Label>
                                <AvField
                                  type="select"
                                  className="form-control"
                                  {...formik.getFieldProps("genre")}
                                  onChange={handleChangeGenre}
                                  validate={{ required: { value: false } }}
                                  id="genre"
                                >
                                  <option value="">
                                    {t("Sélectionner...")}
                                  </option>
                                  {genre.map((g, index) => (
                                    <option key={index} value={g.code}>
                                      {g.description}
                                    </option>
                                  ))}
                                </AvField>
                              </div>
                            </Col>
                            <Col md="4">
                              <div className="mb-3">
                                <Label className="form-label" htmlFor="tele">
                                  {t("inscription.telephone")}
                                </Label>
                                <AvField
                                  {...formik.getFieldProps("tele")}
                                  placeholder={t("inscription.telephone")}
                                  type="text"
                                  errorMessage={t("message.required")}
                                  className="form-control"
                                  validate={{ required: { value: false } }}
                                  id="tele"
                                />
                              </div>
                            </Col>
                            <Col md="4">
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="datenaiss"
                                >
                                  {t("inscription.datenaiss")}
                                </Label>
                                <AvField
                                  {...formik.getFieldProps("datenaiss")}
                                  placeholder={t("inscription.datenaiss")}
                                  type="date"
                                  errorMessage={t("message.required")}
                                  className="form-control"
                                  validate={{ required: { value: false } }}
                                  id="datenaiss"
                                />
                              </div>
                            </Col>
                            <Col md="4">
                              <div className="mb-3">
                                <Label className="form-label" htmlFor="cin">
                                  {t("inscription.cin")}
                                </Label>
                                <AvField
                                  {...formik.getFieldProps("cin")}
                                  placeholder={t("inscription.cin")}
                                  type="text"
                                  errorMessage={t("message.required")}
                                  className="form-control"
                                  validate={{ required: { value: false } }}
                                  id="cin"
                                />
                              </div>
                            </Col>
                          </Row>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xs={12}>
                    <Card>
                      <CardBody>
                        <Row>
                          <Row className="mb-1">
                            <Col md="4">
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="abonnment"
                                >
                                  {t("inscription.abonnement")}
                                </Label>
                                <AvField
                                  type="select"
                                  className="form-control"
                                  {...formik.getFieldProps("typeAbonnement")}
                                  onChange={handleChangeTypeAbonnement}
                                  validate={{ required: { value: false } }}
                                  id="abonnment"
                                >
                                  <option value="">
                                    {t("Sélectionner...")}
                                  </option>
                                  {typeAbonnement.map((g, index) => (
                                    <option key={index} value={g.code}>
                                      {g.description}
                                    </option>
                                  ))}
                                </AvField>
                              </div>
                            </Col>
                            <Col md="4">
                              <div className="mb-3">
                                <Label
                                  className="form-label"
                                  htmlFor="dateDebut"
                                >
                                  {t("inscription.dateDebut")}
                                </Label>
                                <AvField
                                  {...formik.getFieldProps("dateDebut")}
                                  placeholder={t("inscription.dateDebut")}
                                  type="date"
                                  errorMessage={t("message.required")}
                                  className="form-control"
                                  validate={{ required: { value: false } }}
                                  id="dateDebut"
                                />
                              </div>
                            </Col>
                            <Col md="4">
                              <div className="mb-3">
                                <Label className="form-label" htmlFor="dateFin">
                                  {t("inscription.dateFin")}
                                </Label>
                                <AvField
                                  {...formik.getFieldProps("dateFin")}
                                  placeholder={t("inscription.dateFin")}
                                  type="date"
                                  errorMessage={t("message.required")}
                                  className="form-control"
                                  validate={{ required: { value: false } }}
                                  id="dateFin"
                                />
                              </div>
                            </Col>
                            <Row className="mb-0">
                              <Col md="12">
                                <div className="mb-3">
                                  <Label className="form-label">
                                    {t("inscription.active")}
                                  </Label>
                                  <AvRadioGroup
                                    {...formik.getFieldProps("active")}
                                    required
                                    errorMessage={t("message.required")}
                                    inline
                                    className="d-flex flex-row"
                                    onChange={handleChangeTActive}
                                  >
                                    <AvRadio label="Oui" value="true" />
                                    <AvRadio label="Non" value="false" />
                                  </AvRadioGroup>
                                </div>
                              </Col>
                            </Row>
                          </Row>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Col xs={12}>
                  <Card>
                    <CardBody>
                      <Row>
                        <AbonnementImage formik={formik} />
                      </Row>
                    </CardBody>
                  </Card>
                </Col>

                <Button color="primary" type="submit">
                  {t("actions.save")}
                </Button>
              </CardBody>
            </Card>
          </Container>
        </FormikProvider>
      </React.Fragment>
    </>
  );
};

export default AbonnementTab;
