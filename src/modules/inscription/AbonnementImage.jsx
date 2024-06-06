import React from 'react';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { useTranslation } from 'react-i18next';
import { Card, CardBody, Col, Label, Row } from 'reactstrap';
import { FormikProvider } from 'formik';


const AbonnementImage = ({ formik }) => {
    const { t } = useTranslation('translation');
    const { getFieldProps } = formik;

    return (
        <FormikProvider value={formik}>
            <Card>
                <CardBody>
                    <AvForm>
                        <Row>
                            <Col md="12">
                                <div className="mb-6">
                                <h4 className="card-title">{t('product.media')}</h4>
                                    <AvField
                                        {...getFieldProps('images')}
                                        placeholder={t('product.images')}
                                        type="file"
                                        errorMessage={t('message.required')}
                                        className="form-control"
                                        validate={{ required: { value: true } }}
                                        id="images"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </AvForm>
                </CardBody>
            </Card>
        </FormikProvider>
    );
}


export default AbonnementImage;
