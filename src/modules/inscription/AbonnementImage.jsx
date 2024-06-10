import { AvField } from "availity-reactstrap-validation";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Label, Row } from "reactstrap";
import { Link } from "react-router-dom";
import TableContainer from '../../components/Common/TableContainer';
import { clientActions } from "../../sagas/clientSlice";


const AbonnementImage = ({ formik }) => {
    const [file, setFile] = useState(null);
    const [docType, setDocType] = useState(null);
    const [documents, setDocuments] = useState([]);
    const { isFetching } = useSelector(state => state.client);

    const { t } = useTranslation('translation');
    const { getFieldProps, values, setFieldValue } = formik;
    const { documentType } = useSelector(state => state.data);
    const dispatch = useDispatch();

    useEffect(() => {
        if (values.documents.length > 0) {
            setDocuments([...values.documents]);
        }
    }, [values.documents])

    const handleSelectedFile = (event) => {
        const files = event.target.files;
        setFile(files[0])
        let doc = {
            id: Math.floor(Math.random() * (600 - 99 + 1)) + 99,
            file: files[0],
            documentType: docType,
        }

        uploadDoc(doc)
    }

    const handleAddFile = (doc) => {
        setFieldValue("documents", [...values.documents, doc])
    }

    const uploadDoc = (doc) => {
        const formData = new FormData();
        formData.append("file", doc.file);
        formData.append("inscriptionId", 0);
        formData.append("documentType", doc.documentType);
        let payload = {
            formData: formData,
            onSuccess: (data) => {
                handleAddFile(data)
            },
            onError: (error) => {
                console.log(error)
            },
        };
        dispatch(clientActions.uploadFile(payload));
    }


    const columns = [
        {
            Header: t('inscription.documentType'),
            accessor: 'type',
            disableFilters: true,
            filterable: false,
        },
        {
            Header: t('inscription.filename'),
            accessor: 'filenameUser',
            disableFilters: true,
            filterable: false,
        },

        {
            Header: t('actions.title'),
            accessor: (cellProps) => {
                return (
                    <React.Fragment>
                        <Link className="me-3 text-primary"
                        //onClick={() => handleEdit(cellProps)}
                        >
                            <i className="ri-delete-bin-2-line"></i></Link>

                        <Link className="me-3 text-primary"
                            onClick={() => {
                                let payload = {
                                    filename: cellProps.row.filename,
                                    onSuccess: (response) => {
                                        if (cellProps.row?.fileType == "application/pdf") {
                                            const linkSource = `data:application/pdf;base64,${response}`;
                                            const downloadLink = document.createElement("a");
                                            downloadLink.href = linkSource;
                                            downloadLink.download = cellProps.row?.filenameUser;
                                            downloadLink.click();
                                        } else {
                                            var blob = new Blob([Uint8Array.from(atob(response), c => c.charCodeAt(0))], { type: "application/octet-stream" });
                                            var url = window.URL.createObjectURL(blob);
                                            var a = document.createElement('a');
                                            a.href = url;
                                            a.download = cellProps.row.filenameUser;
                                            document.body.appendChild(a);
                                            a.click();
                                            window.URL.revokeObjectURL(url);
                                        }
                                    }
                                }

                                dispatch(clientActions.downloadFile(payload))
                            }}
                        >
                            <i className="ri-file-download-line"></i></Link>
                    </React.Fragment>
                )
            },
            disableFilters: true,
            filterable: false,
        },
    ];



    return (
        <React.Fragment>
            {isFetching ? <div id="preloader">
                <div id="status">
                    <div className="spinner">
                        <i className="ri-loader-line spin-icon"></i>
                    </div>
                </div>
            </div> :
                <Container fluid={true}>
                    <Row>
                        <Col md="2">
                            <Label className="form-label" htmlFor="genre">{t('inscription.documentType')}</Label>
                        </Col>
                        <Col md="4">
                            <AvField
                                type="select"
                                className="form-control"
                                name="docType"
                                onChange={(e) => {
                                    setDocType(e.target.value || undefined);
                                }}
                                validate={{ required: { value: false } }}
                                id="documentType">
                                <option value="">{t('Sélectionner...')}</option>
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
                                <input accept="application/pdf, image/jpeg, image/png, image/gif, image/bmp" type="file" className="form-control" id="customFile" onChange={handleSelectedFile} />
                                <div className="input-group mt-3">
                                    {file && <small>{file.name}</small>}
                                    {file && <Button className="mx-2" size="sm" type="button" color="danger" onClick={() => { setFile(null) }}><i class="ri-delete-bin-2-line"></i></Button>}
                                    {file && <Button size="sm" type="button" color="info" onClick={() => {
                                        const url = window.URL.createObjectURL(file);
                                        if (file?.type == "application/pdf") {
                                            window.open(url, '_blank').focus();
                                        } else {
                                            const link = document.createElement("a");
                                            link.href = url;
                                            link.setAttribute(
                                                "download",
                                                `${file.name}`
                                            );
                                            document.body.appendChild(link);
                                            link.click();
                                        }
                                    }}><i class="ri-file-download-line"></i></Button>}
                                </div>
                            </div>
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

                        //handleDownloadTemp={() => downloadTemp()}
                        //handleUpload={uploadData}
                        />
                    </Row>
                </Container>}
        </React.Fragment>




    );
}


export default AbonnementImage;
