import React, { useEffect, useState } from "react";
import {
  AvForm,
  AvField,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation";
import { useTranslation } from "react-i18next";
import { Button, Card, CardBody, Col, Container, Label, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { FormikProvider, useFormik } from "formik";
import { Toaster, toast } from "react-hot-toast";
import { inscriptionActions } from "../../sagas/inscriptionSlice";
import { dataActions } from "../../sagas/dataSlice";
import { paiementActions } from "../../sagas/paiementSlice";

const initForm = {
  typePaie: "",
  totalAPaye: "",
  montantPaye: "",
  resteAPaye: "",
  assuranceInclu: "",
  datePaiementCheque: "",
  numeroCheque: "",
  inscription: null,
  datePaiement: "",
};

const NewPayment = () => {
  const { t } = useTranslation("translation");
  const { typePaiement, typeAbonnement } = useSelector((state) => state.data);
  const { inscriptions } = useSelector((state) => state.inscription);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idInscription } = useParams();
  const [TPaiement, setTPaiment] = useState("");

  useEffect(() => {
    dispatch(dataActions.loadData());
    dispatch(inscriptionActions.list());
  }, []);

  const currentInscription = inscriptions.find(
    (i) => i.id === parseInt(idInscription)
  );

  const formik = useFormik({
    initialValues: {
      ...initForm,
      datePaiement: formatDate(new Date()),
      inscription: currentInscription,
    },
    enableReinitialize: true,
    onSubmit: (values, { resetForm, setSubmitting }) => {

      const updatedInscription = {
        data: { ...currentInscription, dateFin: getDateFin() }, 
        onSuccess: () => {}
      };
  
      const payload = {
        data: values,
        onSuccess: () => {
          toast
            .promise(
              new Promise((resolve) => {
                setTimeout(() => {
                  resolve();
                }, 3000);
              }),
              {
                success: "Données enregistrées avec succès !!",
              }
            )
            .then(() => {
              resetForm();
              setSubmitting(false);
              navigate(`/main/view/${idInscription}`);
            });
        },
        onError: (error) => {
          console.error("Erreur de suppression:", error);
          toast.error(
            "Erreur lors de l'ajout : veuillez remplir tous les champs requis."
          );
        },
      };
      dispatch(paiementActions.create(payload));
      dispatch(inscriptionActions.update(updatedInscription));
    },
  });

  useEffect(() => {
    if (currentInscription) {
      const type = typeAbonnement.find(
        (t) => t.code === currentInscription.abonnment
      )?.value;
      formik.setFieldValue("totalAPaye", type || "");
    }
  }, [currentInscription, typeAbonnement]);

  useEffect(() => {
    const rest = formik.values.totalAPaye - formik.values.montantPaye;
    formik.setFieldValue("resteAPaye", rest || 0);
  }, [formik.values.montantPaye, formik.values.totalAPaye]);

  const handleChangeTPaiment = (event) => {
    const { value } = event.target;
    setTPaiment(value);
    formik.setFieldValue("typePaie", value);
  };

  const handleFraisAssuranceChange = ({ target }) => {
    formik.setFieldValue("assuranceInclu", target.value);
  };

  const getDateFin = () => {
    const { datePaiement } = formik.values;
    const dateDebut = new Date(datePaiement);
    let daysToAdd;

    switch (currentInscription.abonnment) {
      case "ABONN1":
        daysToAdd = 30;
        break;
      case "ABONN2":
        daysToAdd = 90;
        break;
      case "ABONN3":
        daysToAdd = 365;
        break;
      default:
        return null;
    }
    const df = new Date(dateDebut);
    df.setDate(df.getDate() + daysToAdd);
    return formatDate(df);
  };

  function formatDate(date) {
    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Toaster />
          <Card>
            <CardBody>
              <AvForm
                className="needs-validation"
                onValidSubmit={formik.handleSubmit}
              >
                <Col xs={12}>
                  <Card>
                    <CardBody>
                      <Col md="12">
                        <div className="mb-3">
                          <Label className="form-label" htmlFor="typePaiement">
                            {t("paiement.type")}
                          </Label>
                          <AvField
                            type="select"
                            className="form-control"
                            {...formik.getFieldProps("typePaie")}
                            onChange={handleChangeTPaiment}
                            validate={{
                              required: {
                                value: true,
                                errorMessage: t("message.required"),
                              },
                            }}
                            id="typePaiement"
                          >
                            <option value="">{t("Sélectionner...")}</option>
                            {typePaiement.map((g, index) => (
                              <option key={index} value={g.code}>
                                {g.description}
                              </option>
                            ))}
                          </AvField>
                        </div>
                      </Col>

                      {TPaiement === "CHEQUE" && (
                        <Card>
                          <CardBody>
                            <h6>{t("Information du chèque")}</h6>
                            <hr />
                            <Row>
                              <Col md="6" sm="12">
                                <div className="mb-3">
                                  <Label
                                    className="form-label"
                                    htmlFor="datePaiementCheque"
                                  >
                                    {t("paiement.datePaiementCheque")}
                                  </Label>
                                  <AvField
                                    {...formik.getFieldProps(
                                      "datePaiementCheque"
                                    )}
                                    placeholder={t(
                                      "paiement.datePaiementCheque"
                                    )}
                                    type="date"
                                    errorMessage={t("message.required")}
                                    className="form-control"
                                    validate={{
                                      required: {
                                        value: true,
                                        errorMessage: t("message.required"),
                                      },
                                    }}
                                    id="datePaiementCheque"
                                  />
                                </div>
                              </Col>
                              <Col md="6" sm="12">
                                <div className="mb-3">
                                  <Label
                                    className="form-label"
                                    htmlFor="numeroCheque"
                                  >
                                    {t("paiement.numeroCheque")}
                                  </Label>
                                  <AvField
                                    {...formik.getFieldProps("numeroCheque")}
                                    placeholder={t("paiement.numeroCheque")}
                                    type="text"
                                    errorMessage={t("message.required")}
                                    className="form-control"
                                    validate={{
                                      required: {
                                        value: true,
                                        errorMessage: t("message.required"),
                                      },
                                    }}
                                    id="numeroCheque"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      )}

                      <Row className="mb-2">
                        <Col md="4">
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="totalAPaye">
                              {t("paiement.totalAPaye")}
                            </Label>
                            <AvField
                              {...formik.getFieldProps("totalAPaye")}
                              placeholder={t("paiement.totalAPaye")}
                              type="text"
                              value={formik.values.totalAPaye}
                              errorMessage={t("message.required")}
                              className="form-control"
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: t("message.required"),
                                },
                              }}
                              id="totalAPaye"
                              readOnly
                            />
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="montantPaye">
                              {t("paiement.montantPaye")}
                            </Label>
                            <AvField
                              {...formik.getFieldProps("montantPaye")}
                              placeholder={t("paiement.montantPaye")}
                              type="text"
                              errorMessage={t("message.required")}
                              className="form-control"
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: t("message.required"),
                                },
                              }}
                              id="montantPaye"
                            />
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3">
                            <Label className="form-label" htmlFor="resteAPaye">
                              {t("paiement.resteAPaye")}
                            </Label>
                            <AvField
                              {...formik.getFieldProps("resteAPaye")}
                              placeholder={t("paiement.resteAPaye")}
                              type="text"
                              value={formik.values.resteAPaye}
                              errorMessage={t("message.required")}
                              className="form-control"
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: t("message.required"),
                                },
                              }}
                              id="resteAPaye"
                              readOnly
                            />
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mb-3">
                            <Label
                              className="form-label"
                              htmlFor="datePaiement"
                            >
                              {t("paiement.datePaiement")}
                            </Label>
                            <AvField
                              {...formik.getFieldProps("datePaiement")}
                              placeholder={t("paiement.datePaiement")}
                              type="date"
                              errorMessage={t("message.required")}
                              className="form-control"
                              value={formatDate(new Date())}
                              validate={{
                                required: {
                                  value: true,
                                  errorMessage: t("message.required"),
                                },
                              }}
                              id="datePaiement"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <div className="mb-3">
                            <Label className="form-label">
                              {t("paiement.assuranceInclu")}
                            </Label>
                            <AvRadioGroup
                              {...formik.getFieldProps("assuranceInclu")}
                              required
                              errorMessage={t("message.required")}
                              inline
                              className="d-flex flex-row"
                              onChange={handleFraisAssuranceChange}
                            >
                              <AvRadio label="Oui" value="true" />
                              <AvRadio label="Non" value="false" />
                            </AvRadioGroup>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </AvForm>
              <Row>
                <Col md="6">
                  <Button
                    color="success"
                    className="mr-2"
                    onClick={() => navigate(`/main/view/${idInscription}`)}
                  >
                    {t("Retour")}
                  </Button>
                </Col>
                <Col md="6" className="d-flex justify-content-end mb-3">
                  <Button color="success" onClick={formik.handleSubmit}>
                    {t("Enregistrer")}
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default NewPayment;
