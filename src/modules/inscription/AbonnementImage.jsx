import { AvField } from "availity-reactstrap-validation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Label, Row } from "reactstrap";
import { Link } from "react-router-dom";
import TableContainer from "../../components/Common/TableContainer";
import { inscriptionActions } from "../../sagas/inscriptionSlice";

const AbonnementImage = ({ formik }) => {
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState(null);
  const [documents, setDocuments] = useState([]);
  const { isFetching } = useSelector((state) => state.inscription);

  const { t } = useTranslation("translation");
  const { getFieldProps, values, setFieldValue } = formik;
  const { documentType } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (values.documents.length > 0) {
      setDocuments([...values.documents]);
    }
  }, [values.documents]);

  const handleSelectedFile = (event) => {
    const files = event.target.files;
    setFile(files[0]);
  };

  const handleAddFile = () => {
    if (!file || !docType) {
      alert("Please select a file and document type.");
      return;
    }

    const doc = {
      id: Math.floor(Math.random() * (600 - 99 + 1)) + 99,
      file: file,
      documentType: docType,
    };

    uploadDoc(doc);
  };

  const uploadDoc = (doc) => {
    const formData = new FormData();
    formData.append("file", doc.file);
    formData.append("inscriptionId", 0);
    formData.append("documentType", doc.documentType);

    const payload = {
      formData: formData,
      onSuccess: (data) => {
        console.log("Uploaded Data:", data);
        setFieldValue("documents", [...values.documents, data]);
        setFile(null);
        setDocType(null);
      },
      onError: (error) => {
        console.log(error);
      },
    };
    dispatch(inscriptionActions.uploadFile(payload));
  };

  const handleDownload = (cellProps) => {
    if (cellProps.row && cellProps.row.original) {
      const { filename, filenameUser, fileType } = cellProps.row.original;
  
      if (!filename || !filenameUser) {
        console.error('Filename or filenameUser is missing.');
        return;
      }
  
      let payload = {
        filename: filename,
        onSuccess: (response) => {
          if (fileType === "application/pdf") {
            const linkSource = `data:application/pdf;base64,${response}`;
            const downloadLink = document.createElement("a");
            downloadLink.href = linkSource;
            downloadLink.download = filenameUser;
            downloadLink.click();
          } else {
            const blob = new Blob([Uint8Array.from(atob(response), c => c.charCodeAt(0))], { type: "application/octet-stream" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filenameUser;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          }
        },
      };
  
      dispatch(inscriptionActions.downloadFile(payload));
    } else {
      console.error('Row data is missing or incorrect.');
    }
  };
  

  const columns = [
    {
      Header: t("inscription.documentType"),
      accessor: (cellProps) => {
        return documentType.find(t => t.code === cellProps.type)?.description;
      },
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
        Header: t('actions.title'),
        accessor: 'actions',
        Cell: (cellProps) => {
          return (
            <React.Fragment>
                
              <Link
                className="me-3 text-primary"
                onClick={() => handleDownload(cellProps)}
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
    <React.Fragment>
      {isFetching ? (
        <div id="preloader">
          <div id="status">
            <div className="spinner">
              <i className="ri-loader-line spin-icon"></i>
            </div>
          </div>
        </div>
      ) : (
        <Container fluid={true}>
          <Row>
            <Col md="2">
              <Label className="form-label" htmlFor="genre">
                {t("inscription.documentType")}
              </Label>
            </Col>
            <Col md="4">
              <AvField
                type="select"
                className="form-control"
                name="docType"
                onChange={(e) => {
                  setDocType(e.target.value || undefined);
                }}
                validate={{ required: { value: true } }}
                id="documentType"
              >
                <option value="">{t("Sélectionner...")}</option>
                {documentType.map((g, index) => (
                  <option key={index} value={g.code}>
                    {g.description}
                  </option>
                ))}
              </AvField>
            </Col>
          </Row>
          <Row>
            <Col sm="8">
              <div className="input-group">
                <input
                  accept="application/pdf, image/jpeg, image/png, image/gif, image/bmp"
                  type="file"
                  className="form-control"
                  id="customFile"
                  onChange={handleSelectedFile}
                />
                <div className="input-group mt-3">
                  {file && <small>{file.name}</small>}
                  {file && (
                    <Button
                      className="mx-2"
                      size="sm"
                      type="button"
                      color="danger"
                      onClick={() => {
                        setFile(null);
                      }}
                    >
                      <i className="ri-delete-bin-2-line"></i>
                    </Button>
                  )}
                  {file && (
                    <Button
                      size="sm"
                      type="button"
                      color="info"
                      onClick={() => {
                        const url = window.URL.createObjectURL(file);
                        if (file?.type === "application/pdf") {
                          window.open(url, "_blank").focus();
                        } else {
                          const link = document.createElement("a");
                          link.href = url;
                          link.setAttribute("download", `${file.name}`);
                          document.body.appendChild(link);
                          link.click();
                        }
                      }}
                    >
                      <i className="ri-file-download-line"></i>
                    </Button>
                  )}
                </div>
              </div>
            </Col>
            <Col>
              {file && (
                <Button
                  size="sm"
                  type="button"
                  color="success"
                  onClick={handleAddFile}
                >
                  {t("Ajouer le fichier")}
                </Button>
              )}
            </Col>
          </Row>
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
        </Container>
      )}
    </React.Fragment>
  );
};

export default AbonnementImage;
