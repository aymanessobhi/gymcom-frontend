import { AvField } from "availity-reactstrap-validation";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Col, Row, Card, CardBody, Container, Label } from "reactstrap";

const booleanLabels = {
  true: "Oui",
  false: "Non",
};

const ConfirmationTab = ({ formik }) => {
  const { t } = useTranslation("translation");
  const { typePaiement, typeAbonnement } = useSelector((state) => state.data);
  const { values } = formik;

  const getTypePaiementDesc = (code) => {
    return typePaiement.find((tp) => tp.code === code)?.description;
  };

  const getTypeAbonnementDesc = (code) => {
    return typeAbonnement.find((ta) => ta.code === code)?.description;
  };

  const getLabel = (value) => booleanLabels[value];

  return (
    <Container fluid={true}>
      <Card>
        <CardBody>
          <h6>{t("identification")}</h6>
          <hr />
          <Card>
            <CardBody>
              <Row>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="nom">
                      {t("inscription.nom")}
                    </Label>
                    <AvField
                      name="nom"
                      type="text"
                      value={values.nom}
                      readOnly/>
                  </div>
                </Col>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="prenom">
                      {t("inscription.prenom")}
                    </Label>
                    <AvField name="prenom" type="text" value={values.prenom} readOnly/>
                  </div>
                </Col>

                <Col md="4" sm="12">
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="genre">
                      {t("inscription.genre")}
                    </Label>
                    <AvField name="genre" type="text" value={values.genre} readOnly/>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="tele">
                      {t("inscription.telephone")}
                    </Label>
                    <AvField name="tele" type="text" value={values.tele} readOnly/>
                  </div>
                </Col>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="datenaiss">
                      {t("inscription.datenaiss")}
                    </Label>
                    <AvField
                      name="datenaiss"
                      type="date"
                      value={values.datenaiss}
                      readOnly
                    />
                  </div>
                </Col>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="cin">
                      {t("inscription.cin")}
                    </Label>
                    <AvField name="cin" type="text" value={values.cin} readOnly/>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <strong>{t("inscription.abonnement")}</strong>
                    <p>{getTypeAbonnementDesc(values.typeAbonnement)}</p>
                  </div>
                </Col>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <strong>{t("inscription.dateDebut")}</strong>
                    <p>{values.dateDebut}</p>
                  </div>
                </Col>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <strong>{t("inscription.dateFin")}</strong>
                    <p>{values.dateFin}</p>
                  </div>
                </Col>
                <Col md="6" sm="12">
                  <div className="mb-3">
                    <strong>{t("inscription.active")}</strong>
                    <p>{getLabel(values.active)}</p>
                  </div>
                </Col>


              </Row>
            </CardBody>
          </Card>

          <h6>{t("Paiement")}</h6>
          <hr />
          <Card>
            <CardBody>
              <Row>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <strong>{t("paiement.type")}</strong>
                    <p>{getTypePaiementDesc(values.typePaiement)}</p>
                  </div>
                </Col>
                {values.typePaiement === "CHEQUE" && (
                  <>
                    <Col md="4" sm="12">
                      <div className="mb-3">
                        <strong>{t("paiement.dateDebut")}</strong>
                        <p>{values.dateDebut}</p>
                      </div>
                    </Col>
                    <Col md="4" sm="12">
                      <div className="mb-3">
                        <strong>{t("paiement.numeroCheque")}</strong>
                        <p>{values.numeroCheque}</p>
                      </div>
                    </Col>
                  </>
                )}
              </Row>
              <Row>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <strong>{t("paiement.totalAPaye")}</strong>
                    <p>{values.totalAPaye}</p>
                  </div>
                </Col>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <strong>{t("paiement.montantPaye")}</strong>
                    <p>{values.montantPaye}</p>
                  </div>
                </Col>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <strong>{t("paiement.resteAPaye")}</strong>
                    <p>{values.resteAPaye}</p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="6" sm="12">
                  <div className="mb-3">
                    <strong>{t("paiement.assuranceInclu")}</strong>
                    <p>{getLabel(values.assuranceInclu)}</p>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ConfirmationTab;
