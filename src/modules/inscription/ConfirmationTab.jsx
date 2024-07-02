import { AvField } from "availity-reactstrap-validation";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Col, Row, Card, CardBody, Container, Label } from "reactstrap";
import TableContainer from "../../components/Common/TableContainer";
import { Link } from "react-router-dom";

const booleanLabels = {
  true: "Oui",
  false: "Non",
};

const ConfirmationTab = ({ formikPaiement,formikInscription}) => {
  const { t } = useTranslation("translation");
  const { typePaiement, typeAbonnement } = useSelector((state) => state.data);
  

  const getTypePaiementDesc = (code) => {
    return typePaiement.find((tp) => tp.code === code)?.description;
  };

  const getTypeAbonnementDesc = (code) => {
    return typeAbonnement.find((ta) => ta.code === code)?.description;
  };

  const getLabel = (value) => booleanLabels[value];

  const documents = formikInscription.values.documents;

  const columns = [
    {
      Header: t("inscription.documentType"),
      accessor: "type",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: t("inscription.filename"),
      accessor: "filename",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: t("actions.title"),
      accessor: (cellProps) => {
        return (
          <React.Fragment>
            <Link className="me-3 text-primary"
              //onClick={() => handleEdit(cellProps)}
            >
              <i className="ri-delete-bin-2-line"></i>
            </Link>

            <Link
              className="me-3 text-primary"
              onClick={() => {
                let payload = {
                  filename: cellProps.row.filename,
                  onSuccess: (response) => {
                    if (cellProps.row?.fileType === "application/pdf") {
                      const linkSource = `data:application/pdf;base64,${response}`;
                      const downloadLink = document.createElement("a");
                      downloadLink.href = linkSource;
                      downloadLink.download = cellProps.row?.filenameUser;
                      downloadLink.click();
                    } else {
                      var blob = new Blob(
                        [
                          Uint8Array.from(atob(response), (c) =>
                            c.charCodeAt(0)
                          ),
                        ],
                        { type: "application/octet-stream" }
                      );
                      var url = window.URL.createObjectURL(blob);
                      var a = document.createElement("a");
                      a.href = url;
                      a.download = cellProps.row.filenameUser;
                      document.body.appendChild(a);
                      a.click();
                      window.URL.revokeObjectURL(url);
                    }
                  },
                };

                //dispatch(inscriptionActions.downloadFile(payload));
              }}
            >
              <i className="ri-file-download-line"></i>
            </Link>
          </React.Fragment>
        );
      },
      disableFilters: true,
      filterable: false,
    },
  ];

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
                      value={formikInscription.values.nom}
                      readOnly
                    />
                  </div>
                </Col>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="prenom">
                      {t("inscription.prenom")}
                    </Label>
                    <AvField
                      name="prenom"
                      type="text"
                      value={formikInscription.values.prenom}
                      readOnly
                    />
                  </div>
                </Col>

                <Col md="4" sm="12">
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="genre">
                      {t("inscription.genre")}
                    </Label>
                    <AvField
                      name="genre"
                      type="text"
                      value={formikInscription.values.genre}
                      readOnly
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="tele">
                      {t("inscription.telephone")}
                    </Label>
                    <AvField
                      name="tele"
                      type="text"
                      value={formikInscription.values.tele}
                      readOnly
                    />
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
                      value={formikInscription.values.datenaiss}
                      readOnly
                    />
                  </div>
                </Col>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="cin">
                      {t("inscription.cin")}
                    </Label>
                    <AvField
                      name="cin"
                      type="text"
                      value={formikInscription.values.cin}
                      readOnly
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <strong>{t("inscription.abonnement")}</strong>
                    <p>{getTypeAbonnementDesc(formikInscription.values.abonnment)}</p>
                  </div>
                </Col>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <strong>{t("inscription.dateDebut")}</strong>
                    <p>{formikInscription.values.dateDebut}</p>
                  </div>
                </Col>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <strong>{t("inscription.dateFin")}</strong>
                    <p>{formikInscription.values.dateFin}</p>
                  </div>
                </Col>
                <Col md="6" sm="12">
                  <div className="mb-3">
                    <strong>{t("inscription.active")}</strong>
                    <p>{getLabel(formikInscription.values.active)}</p>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>

          <h6>{t("Piecejoint")}</h6>
          <hr />
          <Card>
            <CardBody>
              <Row>
              <TableContainer
                        columns={columns || []}
                        data={documents ?? []}
                        isPagination={false}
                        isAddParamList={true}
                        customPageSizeOptions={true}
                        iscustomPageSize={false}
                        isBordered={false}
                        customPageSize={10}
                        canDownloadtemp={true}
                        isGlobalFilter={false}
                        className="table-primary"
                    />
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
                    <p>{getTypePaiementDesc(formikPaiement.values.typePaie)}</p>
                  </div>
                </Col>
                {formikPaiement.values.typePaiement === "CHEQUE" && (
                  <>
                    <Col md="4" sm="12">
                      <div className="mb-3">
                        <strong>{t("paiement.dateDebut")}</strong>
                        <p>{formikPaiement.values.dateDebut}</p>
                      </div>
                    </Col>
                    <Col md="4" sm="12">
                      <div className="mb-3">
                        <strong>{t("paiement.numeroCheque")}</strong>
                        <p>{formikPaiement.values.numeroCheque}</p>
                      </div>
                    </Col>
                  </>
                )}
              </Row>
              <Row>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <strong>{t("paiement.totalAPaye")}</strong>
                    <p>{formikPaiement.values.totalAPaye}</p>
                  </div>
                </Col>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <strong>{t("paiement.montantPaye")}</strong>
                    <p>{formikPaiement.values.montantPaye}</p>
                  </div>
                </Col>
                <Col md="4" sm="12">
                  <div className="mb-3">
                    <strong>{t("paiement.resteAPaye")}</strong>
                    <p>{formikPaiement.values.resteAPaye}</p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="6" sm="12">
                  <div className="mb-3">
                    <strong>{t("paiement.assuranceInclu")}</strong>
                    <p>{getLabel(formikPaiement.values.assuranceInclu)}</p>
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
