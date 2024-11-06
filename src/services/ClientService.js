// const initForm = {
//   station: null,
//   equipe: null,
//   responsable: null,
//   dateDebut: '',
//   heurDebut: '',
//   heurFin: '',
//   type: '',
//   description: '',
//   categorie: null,
//   equipements: [],
//   articles: [],
//   dateFin: ''
// }

// const PanneForm = () => {
//   const { t } = useTranslation('translation');
//   const [formState, setForm] = useState(initForm);
//   const { station, equipe, employee, categorie, equipement, article } = useSelector(state => state.data);
//   const { equipements } = useSelector(state => state.equipement);
//   console.log(article + "asd")

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const breadcrumbItems = [
//       { title: t('Gestpanne'), link: "#" },
//       { title: t('Pannes'), link: "#" },
//       { title: t('Panne'), link: PANNE_ARRET_PAGE },
//       { title: id ? t('editPanne') : t('newPanne'), link: "#" }
//   ];

//   useEffect(() => {
//       if (id) {
//           let payload = {
//               id,
//               onSuccess: (data) => {
//                   setForm({
//                       ...data,
//                       station: data.station?.code,
//                       equipe: data.equipe?.code,
//                       responsable: data.responsable?.code,
//                       categorie: data.categorie?.code,
//                   });
//               }
//           }
//           dispatch(panneActions.find(payload))
//       }
//   }, [])

//   const formik = useFormik({
//       initialValues: { ...formState },
//       enableReinitialize: true,
//       onSubmit: (values) => {
//           let payload = {
//               data: {
//                   ...values,
//                   station: station.find(d => d.code === values.station),
//                   equipe: equipe.find(d => d.code === values.equipe),
//                   responsable: employee.find(d => d.code === values.responsable),
//                   categorie: categorie.find(d => d.code === values.categorie)
//               },
//               onSuccess: () => {
//                   navigate(PANNE_ARRET_PAGE);
//               }
//           }
//           dispatch(panneActions.create(payload))
//       }
//   });

//   const handleChangeStation = ({ target }) => {
//       formik.setFieldValue('station', station.find(d => d.code === target.value).code);
//   }
//   const handleChangeEquipe = ({ target }) => {
//       formik.setFieldValue('equipe', equipe.find(d => d.code === target.value).code);
//   }
//   const handleChangeResponsable = ({ target }) => {
//       formik.setFieldValue('responsable', employee.find(d => d.code === target.value).code);
//   }
//   const handleChangeCategorie = ({ target }) => {
//       formik.setFieldValue('categorie', categorie.find(d => d.code === target.value).code);
//   }

//   const handleChangeType = ({ target }) => {
//       formik.setFieldValue('type', target.value);
//   }

//   const handleEquipment = (checked, equip) => {
//       if (checked) {
//           formik.setFieldValue('equipements', [...formik.values.equipements, equip]);
//       } else {
//           let filtred = formik.values.equipements.filter(e => e.code !== equip.code);
//           formik.setFieldValue('equipements', [...filtred]);
//       }
//   }

//   const handleArticle = (checked, article) => {
//       if (checked) {
//           formik.setFieldValue('articles', [...formik.values.articles, article]);
//       } else {
//           let filtred = formik.values.articles.filter(e => e.code !== article.code);
//           formik.setFieldValue('articles', [...filtred]);
//       }
//   }

//   const columns = useMemo(
//       () => [
//           {
//               Header: t('action'),
//               accessor: (cellProps) => {
//                   return (
//                       <React.Fragment>
//                           <h5 className="font-size-14 mb-4">Form Checkboxes</h5>
//                           <div className="form-check mb-3">
//                               <Input className="form-check-input" type="checkbox" onChange={(event) => handleEquipment(event.target.checked, cellProps)} />
//                           </div>
//                       </React.Fragment>
//                   )
//               },
//               disableFilters: true,
//               filterable: false,
//           },
//           {
//               Header: t('employef.code'),
//               accessor: "code",
//               disableFilters: true,
//               filterable: false,
//           },
//           {
//               Header: t('employef.nom'),
//               accessor: "nom",
//               disableFilters: true,
//               filterable: false,
//           },
//           {
//               Header: t('employef.matricule'),
//               accessor: "matricule",
//               disableFilters: true,
//               filterable: false,
//           },


//       ],
//       []
//   );

//   const isCheckedE = (e) => {
//       let item = formik.values.equipements.find(x => x.code === e.code);
//       if (item) {
//           return true;
//       } else {
//           return false;
//       }
//   }
//   const isCheckedA = (a) => {
//       let item = formik.values.articles.find(x => x.code === a.code);
//       if (item) {
//           return true;
//       } else {
//           return false;
//       }
//   }

//   function calculateDuration(values) {
//       const startDate = new Date(`${values.dateDebut}T${values.heurDebut}`);
//       const endDate = new Date(`${values.dateFin}T${values.heurFin}`);
//       const differenceInMilliseconds = endDate - startDate;
//       if (differenceInMilliseconds < 0) {
//           return 0;
//       } else {
//           const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
//           return differenceInHours + " hours";
//       }
//   }

//   return (
//       <React.Fragment>
//           <div className="page-content">
//               <Container fluid={true}>
//                   <Breadcrumbs title={ id ? t('editPanne') : t('newPanne')} breadcrumbItems={breadcrumbItems} />
//                   <Card>
//                       <CardBody>
//                           <AvForm className="needs-validation" onValidSubmit={formik.handleSubmit} >
//                               <Row>
//                                   <Col xs={12}>
//                                       <Card>
//                                           <CardBody>
//                                               <h4 className="card-title">{t('panne.identification')}</h4>
//                                               <Row className="mb-2">
//                                                   <Col md="4">
//                                                       <div className="mb-3">
//                                                           <Label className="form-label" htmlFor="station">{t('panne.station')}</Label>
//                                                           <AvField
//                                                               type="select"
//                                                               {...formik.getFieldProps('station')}
//                                                               className="form-control"
//                                                               onChange={handleChangeStation}
//                                                               validate={{ required: { value: true } }}
//                                                               id="station"
//                                                           >
//                                                               <option value="">{t('select')}</option>
//                                                               {station.map((s, index) => (
//                                                                   <option key={index} value={s.code}>{s.nom}</option>
//                                                               ))}
//                                                           </AvField>
//                                                       </div>
//                                                   </Col>
//                                                   <Col md="4">
//                                                       <div className="mb-3">
//                                                           <Label className="form-label" htmlFor="equipe">{t('panne.equipe')}</Label>
//                                                           <AvField
//                                                               type="select"
//                                                               {...formik.getFieldProps('equipe')}
//                                                               className="form-control"
//                                                               onChange={handleChangeEquipe}
//                                                               validate={{ required: { value: true } }}
//                                                               id="equipe">
//                                                               <option value="">{t('select')}</option>
//                                                               {equipe.map((e, index) => (
//                                                                   <option key={index} value={e.code}>{e.nom}</option>
//                                                               ))}
//                                                           </AvField>
//                                                       </div>
//                                                   </Col>
//                                               </Row>
//                                               <Row className="mb-3">
//                                                   <Col md="4">
//                                                       <div className="mb-3">
//                                                           <Label className="form-label" htmlFor="responsable">{t('panne.responsable')}</Label>
//                                                           <AvField
//                                                               type="select"
//                                                               {...formik.getFieldProps('responsable')}
//                                                               className="form-control"
//                                                               onChange={handleChangeResponsable}
//                                                               validate={{ required: { value: true } }}
//                                                               id="responsable"
//                                                           >
//                                                               <option value="">{t('select')}</option>
//                                                               {employee.map((e, index) => (
//                                                                   <option key={index} value={e.code}>{e.nom}</option>
//                                                               ))}
//                                                           </AvField>
//                                                       </div>
//                                                   </Col>
//                                                   <Col md="4">
//                                                       <div className="mb-3">
//                                                           <Label className="form-label" htmlFor="categorie">{t('panne.category')}</Label>
//                                                           <AvField
//                                                               type="select"
//                                                               {...formik.getFieldProps('categorie')}
//                                                               className="form-control"
//                                                               onChange={handleChangeCategorie}
//                                                               validate={{ required: { value: true } }}
//                                                               id="categorie"
//                                                           >
//                                                               <option value="">{t('select')}</option>
//                                                               {categorie.map((c, index) => (
//                                                                   <option key={index} value={c.code}>{c.nom}</option>
//                                                               ))}
//                                                           </AvField>
//                                                       </div>
//                                                   </Col>
//                                                   <Col md="4">

//                                                       <div className="mb-3">
//                                                           <Label className="form-label" htmlFor="type">{t('panne.type')}</Label>
//                                                           <AvField
//                                                               type="select"
//                                                               {...formik.getFieldProps('type')}
//                                                               className="form-control"
//                                                               onChange={handleChangeType}
//                                                               validate={{ required: { value: true } }}
//                                                               id="type"
//                                                           >
//                                                               <option value="">{t('select')}</option>
//                                                               <option value="PANNE">Panne</option>
//                                                               <option value="ARRET">Arret</option>
//                                                           </AvField>
//                                                       </div>
//                                                   </Col>
//                                               </Row>
//                                               <Row className="mb-3">
//                                                   <Col md="8">
//                                                       <div className="mb-3">
//                                                           <Label className="form-label" htmlFor="description">{t('panne.description')}</Label>
//                                                           <AvField
//                                                               {...formik.getFieldProps('description')}
//                                                               placeholder={t('panne.description')}
//                                                               type="textarea"
//                                                               errorMessage={t('message.required')}
//                                                               className="form-control"
//                                                               validate={{ required: { value: true } }}
//                                                               id="description"
//                                                           />
//                                                       </div>
//                                                   </Col>
//                                               </Row>
//                                               <Row className="mb-3">
//                                                   <Col md="4">
//                                                       <div className="mb-3">
//                                                           <Label className="form-label" htmlFor="dateDebut">{t('panne.dateDebut')}</Label>
//                                                           <AvField
//                                                               {...formik.getFieldProps('dateDebut')}
//                                                               placeholder={t('panne.dateDebut')}
//                                                               type="date"
//                                                               errorMessage={t('message.required')}
//                                                               className="form-control"
//                                                               validate={{ required: { value: true } }}
//                                                               id="dateDebut"
//                                                           />
//                                                       </div>
//                                                   </Col>
//                                                   <Col md="2">
//                                                       <div className="mb-3">
//                                                           <Label className="form-label" htmlFor="heureDebut">{t('panne.heureDebut')}</Label>
//                                                           <AvField
//                                                               {...formik.getFieldProps('heurDebut')}
//                                                               placeholder={t('panne.heureDebut')}
//                                                               type="time"
//                                                               errorMessage={t('message.required')}
//                                                               className="form-control"
//                                                               validate={{ required: { value: true } }}
//                                                               id="heureDebut"
//                                                           />
//                                                       </div>
//                                                   </Col>
//                                                   <Col md="4">
//                                                       <div className="mb-3">
//                                                           <Label className="form-label" htmlFor="dateFin">{t('panne.dateFin')}</Label>
//                                                           <AvField
//                                                               {...formik.getFieldProps('dateFin')}
//                                                               placeholder={t('panne.dateFin')}
//                                                               type="date"
//                                                               errorMessage={t('message.required')}
//                                                               className="form-control"
//                                                               validate={{ required: { value: true } }}
//                                                               id="dateFin"
//                                                           />
//                                                       </div>
//                                                   </Col>
//                                                   <Col md="2">
//                                                       <div className="mb-3">
//                                                           <Label className="form-label" htmlFor="heureFin">{t('panne.heureFin')}</Label>
//                                                           <AvField
//                                                               {...formik.getFieldProps('heurFin')}
//                                                               placeholder={t('panne.heureFin')}
//                                                               type="time"
//                                                               errorMessage={t('message.required')}
//                                                               className="form-control"
//                                                               validate={{ required: { value: true } }}
//                                                               id="heureFin"
//                                                           />
//                                                       </div>
//                                                   </Col>
//                                                   <Col md="4">
//                                                       <div className="mb-3">
//                                                           <Label className="form-label" htmlFor="duree">{t('panne.duree')}</Label>
//                                                           <input
//                                                               type="text"
//                                                               className="form-control"
//                                                               readOnly
//                                                               value={calculateDuration(formik.values)}
//                                                           />
//                                                       </div>
//                                                   </Col>
//                                               </Row>
//                                               <Row>
//                                                   <Col xs={12}>
//                                                       <Card>
//                                                           <CardBody>
//                                                               <h4 className="card-title">List des équipements</h4>
//                                                               <p className="card-title-desc">Cocher les équipements nécessaire</p>

//                                                               <div className="table-responsive">
//                                                                   <Table striped className=" mb-0">

//                                                                       <thead>
//                                                                           <tr>
//                                                                               <th>#</th>
//                                                                               <th>Code</th>
//                                                                               <th>Nom</th>
//                                                                               <th>Constat</th>
//                                                                               <th>Solution</th>
//                                                                               <th>Station</th>
//                                                                           </tr>
//                                                                       </thead>
//                                                                       <tbody>
//                                                                           {
//                                                                               equipements
//                                                                                   .filter(e => e.actifs === "OUI")
//                                                                                   .map(e => {
//                                                                                       return (
//                                                                                           <tr key={e.id}>
//                                                                                               <td>
//                                                                                                   <React.Fragment>
//                                                                                                       <div className="form-check mb-3">
//                                                                                                           <Input
//                                                                                                               className="form-check-input"
//                                                                                                               type="checkbox"
//                                                                                                               onChange={(event) => handleEquipment(event.target.checked, e)}
//                                                                                                               checked={isCheckedE(e)}
//                                                                                                           />
//                                                                                                       </div>
//                                                                                                   </React.Fragment>
//                                                                                               </td>
//                                                                                               <td>{e.code}</td>
//                                                                                               <td>{e.nom}</td>
//                                                                                               <td>{e.station.nom}</td>
//                                                                                           </tr>
//                                                                                       );
//                                                                                   })
//                                                                           }
//                                                                       </tbody>
//                                                                   </Table>
//                                                               </div>

//                                                           </CardBody>
//                                                       </Card>
//                                                   </Col>
//                                               </Row>
//                                               <Row>
//                                                   <Col xs={12}>
//                                                       <Card>
//                                                           <CardBody>
//                                                               <h4 className="card-title">List des articles</h4>
//                                                               <p className="card-title-desc">Cocher les articles nécessaire</p>

//                                                               <div className="table-responsive">
//                                                                   <Table striped className=" mb-0">

//                                                                       <thead>
//                                                                           <tr>
//                                                                               <th>#</th>
//                                                                               <th>Code</th>
//                                                                               <th>Nom</th>
//                                                                               <th>Quantité</th>
//                                                                               <th>Pu</th>
//                                                                               <th>Montant</th>
//                                                                           </tr>
//                                                                       </thead>
//                                                                       <tbody>
//                                                                           {
//                                                                               article.map(a => {
//                                                                                   return (
//                                                                                       <tr>
//                                                                                           <td>
//                                                                                               <React.Fragment>
//                                                                                                   <div className="form-check mb-3">
//                                                                                                       <Input className="form-check-input" type="checkbox" onChange={(event) => handleArticle(event.target.checked, a)} checked={isCheckedA(a)} />
//                                                                                                   </div>
//                                                                                               </React.Fragment>
//                                                                                           </td>
//                                                                                           <td>{a.code}</td>
//                                                                                           <td>{a.nom}</td>
//                                                                                           <td>{a.quantite}</td>
//                                                                                           <td>{a.pu}</td>
//                                                                                           <td>{a.montant}</td>
//                                                                                       </tr>
//                                                                                   )
//                                                                               })
//                                                                           }


//                                                                       </tbody>
//                                                                   </Table>
//                                                               </div>

//                                                           </CardBody>
//                                                       </Card>
//                                                   </Col>
//                                               </Row>
//                                           </CardBody>
//                                       </Card>
//                                   </Col>
//                               </Row>
//                               <Button color="primary" type="submit">{t('actions.save')}</Button>
//                           </AvForm>
//                       </CardBody>
//                   </Card>
//               </Container>
//           </div>
//       </React.Fragment>
//   )
// }

// export default PanneForm;
