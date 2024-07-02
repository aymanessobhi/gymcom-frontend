import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { paiementActions } from "../../sagas/paiementSlice";
import {
  Button,
  Col,
  Row,
  Card,
  CardBody,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { useTranslation } from "react-i18next";
import Inscription from ".";
import TableContainer from "../../components/Common/TableContainer";
import { ADD_PAYMENT } from "../../routes/routeConstants";

const ViewAbonnee = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");
  const navigate = useNavigate();
  const { id } = useParams();
  const { paiements } = useSelector((state) => state.paiement);
  const [inscription, setInscription] = useState({});
  const [paiement, setPaiement] = useState({});
  const [photoDocument, setPhotoDocument] = useState(null);
  const { typePaiement, typeAbonnement } = useSelector((state) => state.data);
  const [record, setRecord] = useState({ open: false, data: null });

  useEffect(() => {
    if (id) {
      dispatch(paiementActions.list());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (paiements && paiements.length > 0) {
      const paiement = paiements.find((p) => p.inscription.id == id);
      setPaiement(paiement);
      if (paiement) {
        setInscription(paiement.inscription);
        const photoDoc = paiement.inscription.documents.find(
          (doc) => doc.type === "CIN_V"
        );
        setPhotoDocument(photoDoc);
      }
    }
  }, [paiements, id]);

  const paiementList = paiements.filter((p) => p.inscription.id == id);

  const totalResteAPaye = paiementList.reduce((accumulator, currentPayment) => {
    return accumulator + currentPayment.resteAPaye;
  }, 0);

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
            <Link
              className="me-3 text-primary"
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

  const columnsP = [
    {
      Header: t("paiement.type"),
      accessor: "typePaie",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: t("paiement.montantPaye"),
      accessor: "montantPaye",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: t("paiement.totalAPaye"),
      accessor: "totalAPaye",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: t("paiement.assuranceInclu"),
      accessor: (cellProps) => {
        return cellProps.assuranceInclu === true ? t("Oui") : t("Non");
      },
      disableFilters: true,
      filterable: false,
    },
    {
      Header: t("paiement.datePaiementCheque"),
      accessor: "datePaiementCheque",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: t("paiement.numeroCheque"),
      accessor: "numeroCheque",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: t("paiement.datePaiement"),
      accessor: "datePaiement",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: t("actions.title"),
      accessor: (cellProps) => (
        <React.Fragment>
          <Link onClick={() => handleDelete(cellProps)}>
            <i className="ri-delete-bin-2-line"></i>
          </Link>
        </React.Fragment>
      ),
      disableFilters: true,
      filterable: false,
    },
  ];

  const handleDelete = (cellProps) => {
    setRecord({ open: true, data: cellProps });
  };
  const confirmDelete = () => {
    setRecord({ ...record, open: false });
    let payload = {
      id: record.data.id,
      onSuccess: () => {
        dispatch(paiementActions.list());
      },
      onError: (error) => {
        console.log(error);
      },
    };
    dispatch(paiementActions.delete(payload));
  };

  const getTypeAbonnementDesc = (code) => {
    return typeAbonnement.find((ta) => ta.code === code)?.description;
  };

  return (
    <div className="page-content">
      <Container fluid={true}>
        <Card>
          <CardBody>
            <Col md="12" className="d-flex justify-content-end mb-3">
              <Button
                color="success"
                className="mr-2"
                onClick={() => navigate(`/main/subscriber`)}
              >
                {t("Liste des abonnées")}
              </Button>
            </Col>
            <hr />
            <Card>
              <CardBody>
                <Row>
                  <Col md="4" sm="12" className="d-flex align-items-center">
                    <div className="d-flex">
                      <strong className="me-3">
                        {t("inscription.dateAbonnement")}
                      </strong>
                      <p className="mb-0">{inscription.dateDebut}</p>
                    </div>
                  </Col>
                  <Col md="4" sm="12" className="d-flex align-items-center">
                    <div className="d-flex">
                      <strong className="me-3">
                        {t("inscription.abonnement")}
                      </strong>
                      <p>{getTypeAbonnementDesc(inscription.abonnment)}</p>
                    </div>
                  </Col>
                  <Col md="4" sm="12" className="d-flex align-items-center">
                    <div className="d-flex">
                      <strong className="me-3">{t("Paiement dû")}</strong>
                      <p className="mb-0">{totalResteAPaye} DH</p>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <h6>{t("Identification")}</h6>
            <hr />
            <Card>
              <CardBody>
                <Row>
                  <Col md="3" sm="12">
                    <div
                      className="text-center"
                      style={{
                        width: "120px",
                        height: "120px",
                        border: "2px solid #ccc",
                        overflow: "hidden",
                      }}
                    >
                      {/* Replace 'avatarImageUrl' with the actual URL or path to your avatar image */}
                      <img
                        src=""
                        alt="image"
                        className="img-fluid"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </Col>
                  <Col md="9" sm="12">
                    <Row className="mb-3">
                      <Col md="4" sm="12" className="d-flex align-items-center">
                        <div className="d-flex">
                          <strong className="me-3">
                            {t("inscription.nom")}
                          </strong>
                          <p className="mb-0">{inscription.nom}</p>
                        </div>
                      </Col>
                      <Col md="4" sm="12" className="d-flex align-items-center">
                        <div className="d-flex">
                          <strong className="me-3">
                            {t("inscription.prenom")}
                          </strong>
                          <p className="mb-0">{inscription.prenom}</p>
                        </div>
                      </Col>
                      <Col md="4" sm="12" className="d-flex align-items-center">
                        <div className="d-flex">
                          <strong className="me-3">
                            {t("inscription.genre")}
                          </strong>
                          <p className="mb-0">{inscription.genre}</p>
                        </div>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md="4" sm="12" className="d-flex align-items-center">
                        <div className="d-flex">
                          <strong className="me-3">
                            {t("inscription.telephone")}
                          </strong>
                          <p className="mb-0">{inscription.tele}</p>
                        </div>
                      </Col>
                      <Col md="4" sm="12" className="d-flex align-items-center">
                        <div className="d-flex">
                          <strong className="me-3">
                            {t("inscription.datenaiss")}
                          </strong>
                          <p className="mb-0">{inscription.datenaiss}</p>
                        </div>
                      </Col>
                      <Col md="4" sm="12" className="d-flex align-items-center">
                        <div className="d-flex">
                          <strong className="me-3">
                            {t("inscription.cin")}
                          </strong>
                          <p className="mb-0">{inscription.cin}</p>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4" sm="12" className="d-flex align-items-center">
                        <div className="d-flex">
                          <strong className="me-3">
                            {t("inscription.abonnement")}
                          </strong>
                          <p className="mb-0">
                            {getTypeAbonnementDesc(inscription.abonnment)}
                          </p>
                        </div>
                      </Col>
                      <Col md="4" sm="12" className="d-flex align-items-center">
                        <div className="d-flex">
                          <strong className="me-3">
                            {t("inscription.dateDebut")}
                          </strong>
                          <p className="mb-0">{inscription.dateDebut}</p>
                        </div>
                      </Col>
                      <Col md="4" sm="12" className="d-flex align-items-center">
                        <div className="d-flex">
                          <strong className="me-3">
                            {t("inscription.dateFin")}
                          </strong>
                          <p className="mb-0">{inscription.dateFin}</p>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <h6>{t("Piece joint")}</h6>
            <hr />
            <Card>
              <CardBody>
                <Row>
                  <TableContainer
                    columns={columns || []}
                    data={inscription.documents ?? []}
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
                <Col md="12" className="d-flex justify-content-end mb-3">
                  <Button
                    size="sm"
                    color="success"
                    onClick={() => navigate(`/main/${id}/paiement`)}
                  >
                    {t("Nouvelle paiement")}
                  </Button>
                </Col>
                <Row>
                  <TableContainer
                    columns={columnsP || []}
                    data={paiementList ?? []}
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
          </CardBody>
        </Card>
      </Container>
      <Modal
        isOpen={record.open}
        toggle={() => setRecord({ ...record, open: false })}
        backdrop="static"
      >
        <ModalHeader toggle={() => setRecord({ ...record, open: false })}>
          {t("text.confirmation")}
        </ModalHeader>
        <ModalBody>
          <p>{t("text.msgDelete")}</p>
          <ModalFooter>
            <Button
              type="button"
              color="light"
              onClick={() => setRecord({ ...record, open: false })}
            >
              {t("actions.close")}
            </Button>
            <Button type="button" color="primary" onClick={confirmDelete}>
              {t("actions.confirm")}
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
    // <div>
    //     <h2>View Abonnee</h2>
    //     <div>
    //         <h3>Inscription Details</h3>
    //         <p>Nom: {inscription.nom}</p>
    //         <p>Prénom: {inscription.prenom}</p>
    //         <p>Téléphone: {inscription.tele}</p>
    //         <p>Date de Naissance: {inscription.datenaiss}</p>
    //         <p>CIN: {inscription.cin}</p>
    //         <p>Abonnement: {inscription.abonnment}</p>
    //         <p>Genre: {inscription.genre}</p>
    //         <p>Date Début: {inscription.dateDebut}</p>
    //         <p>Date Fin: {inscription.dateFin}</p>
    //         <p>Active: {inscription.active}</p>
    //         {/* Display other inscription details */}
    //     </div>
    //     <div>
    //         <h3>Photo Document</h3>
    //         {photoDocument ? (
    //             <div>
    //                 <p>Type: {photoDocument.type}</p>
    //                 <p>Filename: {photoDocument.filename}</p>
    //                 {photoDocument.path && (
    //                     <div style={{ border: "1px solid #000", width: "150px", height: "150px", overflow: "hidden" }}>
    //                         <img
    //                             src={`data:${photoDocument.fileType};base64,${photoDocument.path}`}
    //                             alt="Photo Document"
    //                             style={{ width: "100%", height: "100%", objectFit: "cover" }}
    //                         />
    //                     </div>
    //                 )}
    //             </div>
    //         ) : (
    //             <p>No photo document found</p>
    //         )}
    //     </div>
    // </div>
  );
};

export default ViewAbonnee;
