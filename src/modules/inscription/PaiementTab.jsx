import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button,Card, CardBody,Col,Container,Label,Row,FormGroup,Form,} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { FormikProvider } from "formik";
import {
  AvForm,
  AvField,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation";


const PaiementTab = ({ formik, typeValue }) => {
  const { t } = useTranslation("translation");
  const [ TPaiement, setTPaiment ] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { id } = useParams();
  const { getFieldProps, values, setFieldValue} = formik;
  const { typePaiement, typeAbonnement } = useSelector((state) => state.data);

  useEffect(() => {
    const type = typeAbonnement.find(t => t.code === typeValue.abonnment)?.value;
      setFieldValue("totalAPaye", type);
  }, [typeValue]);

  console.log(typeValue.abonnment)

  useEffect(() => {
    const rest = values.totalAPaye - values.montantPaye;
    if(rest < 0){
      setFieldValue("resteAPaye", 0);
    }else{
      setFieldValue("resteAPaye", rest);
    }
    
  }, [values.montantPaye]);
  
  const handleChangeTPaiment = (event) => {
    const { value } = event.target;
    setTPaiment(value);
    setFieldValue("typePaie", value);
  }
  
  const handleFraisAssuranceChange = ({ target }) => {
    setFieldValue("assuranceInclu", target.value);
  }; 

  return (
    <React.Fragment>
      <FormikProvider value={formik}>
        <Container fluid={true}>
          <Card>
            <CardBody>
              <Col xs={12}>
                <Card>
                  <CardBody>
                    <Col md="12">
                      <div className="mb-3">
                        <Label className="form-label" htmlFor="typePaiement">
                          {" "}
                          {t("paiement.type")}
                        </Label>
                        <AvField
                          type="select"
                          className="form-control"
                          {...getFieldProps("typePaie")}
                          onChange={handleChangeTPaiment}
                          validate={{ required: { value: false } }}
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

                    {TPaiement === "CHEQUE" &&(
                    <Card>
                      <CardBody>
                        <h6>{t("Information du chèque")}</h6>
                        <hr></hr>
                        <Row>
                          <Col md="6" sm="12">
                            <div className="mb-3">
                              <Label className="form-label" htmlFor="datePaiementCheque">
                                {t("paiement.datePaiementCheque")}
                              </Label>
                              <AvField
                                {...formik.getFieldProps("datePaiementCheque")}
                                placeholder={t("paiement.datePaiementCheque")}
                                type="date"
                                errorMessage={t("message.required")}
                                className="form-control"
                                validate={{ required: { value: true } }}
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
                                validate={{ required: { value: true } }}
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
                            {...getFieldProps("totalAPaye")}
                            placeholder={t("paiement.totalAPaye")}
                            type="text"
                            value={values.totalAPaye}
                            errorMessage={t("message.required")}
                            className="form-control"
                            validate={{ required: { value: true } }}
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
                            validate={{ required: { value: false } }}
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
                            {...getFieldProps("resteAPaye")}
                            placeholder={t("paiement.resteAPaye")}
                            type="text"
                            value={values.resteAPaye}
                            errorMessage={t("message.required")}
                            className="form-control"
                            validate={{ required: { value: false } }}
                            id="resteAPaye"
                            readOnly
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
            </CardBody>
          </Card>
        </Container>
      </FormikProvider>
    </React.Fragment>
  );

}

export default PaiementTab;