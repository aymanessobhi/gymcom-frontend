import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {Button,Card,CardBody,Col,Container,Label,Row,FormGroup,Form,} from "reactstrap";

const MiniWidgets = () => {
    const { t } = useTranslation("translation");
    const { inscriptions } = useSelector(state => state.inscription);

    const nbreGenreInsc = inscriptions.length;
    const nbreFemme = inscriptions.filter( f => f.genre === "FEMME").length;
    const nbreHomme = inscriptions.filter( h => h.genre === "HOMME").length;
    const nbreEnfant = inscriptions.filter( e => e.genre === "ENFANT").length;

    const nbreAnnuelle = inscriptions.filter(a => a.abonnment =="ABONN3").length;
    const nbreMentuelle = inscriptions.filter(a => a.abonnment =="ABONN1").length;
    const nbreTrimestrielle = inscriptions.filter(a => a.abonnment =="ABONN2").length;

  return (
    <React.Fragment>
      <Col md={4}>
        <Card>
          <CardBody>
            <div className="d-flex">
              <div className="flex-1 overflow-hidden">
                <p className="text-truncate font-size-14 mb-2">
                  {t("Nombre des abonnées par Genre")}
                </p>
                <h4 className="mb-0">{nbreGenreInsc}</h4>
              </div>
            </div>
          </CardBody>

          <CardBody className="border-top py-3 d-flex">
            <div className="text-truncate">
              <span className="text-muted ms-2">{nbreFemme} Femme</span>
              <span className="text-muted ms-2">{nbreHomme} Homme</span>
              <span className="text-muted ms-2">{nbreEnfant} {t("Enfant < 15")}</span>
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <CardBody>
            <div className="d-flex">
              <div className="flex-1 overflow-hidden">
                <p className="text-truncate font-size-14 mb-2">
                  {t("Nombre des abonnées par abonnement")}
                </p>
                <h4 className="mb-0">{nbreGenreInsc}</h4>
              </div>
            </div>
          </CardBody>

          <CardBody className="border-top py-3 d-flex">
            <div className="text-truncate">
              <span className="text-muted ms-2">{nbreAnnuelle} Annuelle</span>
              <span className="text-muted ms-2">{nbreMentuelle} Mentuelle</span>
              <span className="text-muted ms-2">{nbreTrimestrielle} Trimestrielle</span>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default MiniWidgets;
