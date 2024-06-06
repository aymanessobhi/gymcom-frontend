import React,{ useEffect, useState, useRef } from "react";
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { useTranslation } from 'react-i18next';
import {  Col,  Row ,Table ,Input  ,Button  } from 'reactstrap';
import './MyForm.css';  // Import the CSS file


const AbonnementImage = ({ setFilesToUpload }) => {
    const [selectedFiles, setSelectedFiles] = useState({ photo: null, cinRecto: null, cinVerso: null });
    const inputFileRefs = {
        photo: useRef(null),
        cinRecto: useRef(null),
        cinVerso: useRef(null),
    };

    const [files, setFiles] = useState([]);
    const inputFileRef = useRef();
    const { t } = useTranslation('translation');

    const handleRemoveFile = (file) => {
        if (files.length !== 0) {
            setFiles(files.filter(d => d.name !== file.name));
        }
        inputFileRef.current.value = null;
    }

    const selectFile = (imageKey) => {
        inputFileRefs[imageKey].current.click();
    };

    const handleSelectFile = (event,imageKey) => {
        setSelectedFiles({
            ...selectedFiles,
            [imageKey]: event.target.files[0]
        });
    };

    const handleUpload = () => {
        if (selectedFiles) {
            
            setFiles([...files, selectedFiles]);
            selectedFiles(undefined);
            inputFileRef.current.value = null;
        }
    };
    useEffect(() => {
        setFilesToUpload(files);
    }, [files, setFilesToUpload]);

    return (


                    <AvForm>
                                <Row>
                                    <Col md="12">
                                        <div className="mb-3">
                                            <h4 className="card-title">Client Images</h4>
                                            <div className="table-responsive">
                                                <Table bordered className="custom-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Type</th>
                                                            <th>Télécharger</th>
                                                            <th>Aperçu</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Photo</td>
                                                            <td className="custom-tableA">
                                                                <Input
                                                                    accept="image/png, image/jpeg"
                                                                    name="btn-upload-photo"
                                                                    style={{ display: 'none' }}
                                                                    innerRef={inputFileRefs.photo}
                                                                    type="file"
                                                                    onChange={(event) => handleSelectFile(event, 'photo')}
                                                                />
                                                                <Button color="primary" onClick={() => selectFile('photo')}>
                                                                    Select File
                                                                </Button>
                                                                <Input
                                                                    name="btn-upload-photo"
                                                                    disabled={true}
                                                                    type="text"
                                                                    value={selectedFiles.photo ? selectedFiles.photo.name : ""}
                                                                    style={{ marginLeft: 8, marginTop: 8 ,maxWidth : 200 }}
                                                                />
                                                            </td>
                                                            <td>
                                                                {selectedFiles.photo && (
                                                                    <div
                                                                        style={{
                                                                            overflowY: 'auto',
                                                                            marginTop: '16px',
                                                                            marginRight: '-8px',
                                                                            paddingRight: '8px',
                                                                        }}
                                                                    >
                                                                        <img
                                                                            src={URL.createObjectURL(selectedFiles.photo)}
                                                                            alt="Selected photo"
                                                                            style={{ maxWidth: '100px', height: '100px' }}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>CIN (recto)</td>
                                                            <td className="custom-tableA">
                                                                <Input
                                                                    accept="image/png, image/jpeg"
                                                                    name="btn-upload-cin-recto"
                                                                    style={{ display: 'none' }}
                                                                    innerRef={inputFileRefs.cinRecto}
                                                                    type="file"
                                                                    onChange={(event) => handleSelectFile(event, 'cinRecto')}
                                                                />
                                                                <Button color="primary" onClick={() => selectFile('cinRecto')}>
                                                                    Select File
                                                                </Button>
                                                                <Input
                                                                    name="btn-upload-cin-recto"
                                                                    disabled={true}
                                                                    type="text"
                                                                    value={selectedFiles.cinRecto ? selectedFiles.cinRecto.name : ""}
                                                                    style={{ marginLeft: 8, marginTop: 8 ,maxWidth : 200 }}
                                                                />
                                                            </td>
                                                            <td>
                                                                {selectedFiles.cinRecto && (
                                                                    <div
                                                                        style={{
                                                                            overflowY: 'auto',
                                                                            marginTop: '16px',
                                                                            marginRight: '-8px',
                                                                            paddingRight: '8px',
                                                                        }}
                                                                    >
                                                                        <img
                                                                            src={URL.createObjectURL(selectedFiles.cinRecto)}
                                                                            alt="Selected CIN (recto)"
                                                                            style={{ maxWidth: '100px', height: '100px' }}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>CIN (verso)</td>
                                                            <td className="custom-tableA">
                                                                <Input
                                                                    accept="image/png, image/jpeg"
                                                                    name="btn-upload-cin-verso"
                                                                    style={{ display: 'none' }}
                                                                    innerRef={inputFileRefs.cinVerso}
                                                                    type="file"
                                                                    onChange={(event) => handleSelectFile(event, 'cinVerso')}
                                                                />
                                                                <Button color="primary" onClick={() => selectFile('cinVerso')}>
                                                                    Select File
                                                                </Button>
                                                                <Input
                                                                    name="btn-upload-cin-verso"
                                                                    disabled={true}
                                                                    type="text"
                                                                    value={selectedFiles.cinVerso ? selectedFiles.cinVerso.name : ""}
                                                                    style={{ marginLeft: 8, marginTop: 8 ,maxWidth : 200 }}
                                                                />
                                                            </td>
                                                            <td>
                                                                {selectedFiles.cinVerso && (
                                                                    <div
                                                                        style={{
                                                                            overflowY: 'auto',
                                                                            marginTop: '16px',
                                                                            marginRight: '-8px',
                                                                            paddingRight: '8px',
                                                                        }}
                                                                    >
                                                                        <img
                                                                            src={URL.createObjectURL(selectedFiles.cinVerso)}
                                                                            alt="Selected CIN (verso)"
                                                                            style={{ maxWidth: '100px', height: '100px' }}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                            <Button
                                                color="success"
                                                disabled={!selectedFiles.photo || !selectedFiles.cinRecto || !selectedFiles.cinVerso}
                                                onClick={handleUpload}
                                                style={{ marginTop: 16 }}
                                            >
                                                Télécharger
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </AvForm>

        
         

    );
}


export default AbonnementImage;
