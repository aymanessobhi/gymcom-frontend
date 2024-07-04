import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import TableContainer from "../../components/Common/TableContainer";
import { REGISTER_FORM, VIEW_ABONEE } from "../../routes/routeConstants";
import { inscriptionActions } from "../../sagas/inscriptionSlice";
import { Toaster, toast } from "react-hot-toast";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const ListAbonnee = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");
  const navigate = useNavigate();
  const { isFetching, inscriptions } = useSelector(
    (state) => state.inscription
  );
  const{ genre } = useSelector(
    (state) => state.data
  );
  const [record, setRecord] = useState({ open: false, data: null });

  const breadcrumbItems = [
    { title: "Principale", link: "#" },
    { title: t("menu.inscription"), link: "#" },
  ];

  useEffect(() => {
    setTimeout(() => {
      dispatch(inscriptionActions.list());
    }, 1000);
  }, []);

  const columns = [
    {
      Header: t("inscription.nom"),
      accessor: "nom",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: t("inscription.prenom"),
      accessor: "prenom",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: t("inscription.dateDebut"),
      accessor: "dateDebut",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: t("inscription.dateFin"),
      accessor: "dateFin",
      disableFilters: true,
      filterable: false,
    },
    {
      Header: t("inscription.genre"),
      accessor: (cellProps)=>{
        return genre.find( g => g.code === cellProps.genre)?.description;
      },
      disableFilters: true,
      filterable: false,
    },
    {
      Header: t("inscription.status"),
      accessor: (cellProps) => {
        const currentDate = new Date();
        const dateFin = new Date(cellProps.dateFin);
        const redCircle = "\uD83D\uDD34";
        const greenCircle = "\uD83D\uDFE2";

        return dateFin > currentDate ? greenCircle : redCircle;
      },
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
          <Link to={VIEW_ABONEE.replace(":id", cellProps.id)}>
            <i className="mdi mdi-eye font-size-18"></i>
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
        dispatch(inscriptionActions.list());
        toast.success("Suppression réussie");
      },
      onError: (error) => {
        console.error("Erreur de suppression:", error);
        toast.error("Erreur lors de la suppression de l'enregistrement");
      },
    };

    dispatch(inscriptionActions.delete(payload));
  };

  return (
    <React.Fragment>
      <Toaster />
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs
              title={t("Abonnement")}
              breadcrumbItems={breadcrumbItems}
            />
            
            <Card>
              <CardBody>
                <Col md="12" className="d-flex justify-content-end mb-3">
                  <Button
                    color="success"
                    className="mr-2"
                    onClick={() => navigate(REGISTER_FORM)}
                  >
                    {t("Nouvelle inscription")}
                  </Button>
                </Col>
                <hr />
                <Card>
                  <CardBody>
                    <Row>
                      <TableContainer
                        columns={columns || []}
                        data={inscriptions ?? []}
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
    </React.Fragment>
  );
};

export default ListAbonnee;
