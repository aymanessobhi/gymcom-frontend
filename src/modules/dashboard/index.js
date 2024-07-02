import React, { useEffect } from 'react'
import MiniWidgets from './MiniWidgets'
import { useDispatch, useSelector } from 'react-redux';
import { dataActions } from '../../sagas/dataSlice';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import {Button,Card,CardBody,Col,Container,Label,Row,FormGroup,Form,} from "reactstrap";
import { useTranslation } from 'react-i18next';
import { inscriptionActions } from '../../sagas/inscriptionSlice';

const Dashboard = () => {
    const { t } = useTranslation("translation");
    const { isFetching } = useSelector(state => state.data);
    const dispatch = useDispatch();

    const breadcrumbItems = [
        { title: "Principale", link: "#" },
        { title: t('menu.dashboard'), link: "#" }
    ];

    useEffect(() => {
        setTimeout(() => {
            dispatch(inscriptionActions.list());
        }, 3000);
    }, [])

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
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs
                            title={t("menu.dashboard")}
                            breadcrumbItems={breadcrumbItems}
                        />
                        <Row>
                            <Col xl={12}>
                                <Row>
                                    <MiniWidgets />
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
        </React.Fragment>
    );
}

export default Dashboard