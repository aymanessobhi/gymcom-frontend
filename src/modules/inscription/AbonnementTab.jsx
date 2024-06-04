import { useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "reactstrap";
import Breadcrumbs from '../../../components/Common/Breadcrumb';

const initForm = { code: '', nom: '', quantite: 0, pu: 0, montant: 0 };
const AbonnementTab = () => {

    const { t } = useTranslation('translation');
    const [formState, setForm] = useState(initForm);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        if (id) {
            let payload = {
                id,
                onSuccess: (data) => {
                    setForm({ ...data });
                }
            }
            dispatch(articleActions.find(payload));
        }
    }, [id, dispatch]);

    const breadcrumbItems = [
        { title: t('abonnement'), link: "#" },
        { title: id ? t('editabonn') : t('newabonn'), link: "#" }
    ];

    const formik = useFormik({
        initialValues: { ...formState },
        enableReinitialize: true,
        onSubmit: (values) => {
            let payload = {
                data: values,
                onSuccess: () => {
                    navigate(DATABASE_ARTICLE_PAGE)
                }
            }
            dispatch(articleActions.create(payload));
        }
    });

    return (
        <>
            <React.Fragment>
                <div className="page-content">
                    <Container fluid={true}>
                        <Breadcrumbs title={id ? t('editarticle') : t('newarticle')} breadcrumbItems={breadcrumbItems} />
                        <Card>
                            <CardBody>
                                <AvForm className="needs-validation" onValidSubmit={formik.handleSubmit} >

                                </AvForm>
                            </CardBody>
                        </Card>
                    </Container>
                </div>
            </React.Fragment>
        </>
    )
}

export default AbonnementTab;