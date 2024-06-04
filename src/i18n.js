import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import translationGr from './locales/gr/translation.json';
import translationIT from './locales/it/translation.json';
import translationRS from './locales/rs/translation.json';
import translationSP from './locales/sp/translation.json';
import translationENG from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';


//translations
const resources = {
  // gr: {
  //   translation: translationGr
  // },
  fr: {
    translation: {
      Gestpanne: "Pannes et arrêts",
      Stations: "Stations",
      Personnel: "Personnel",
      Equipe: "Equipe",
      categorie:"Catégorie",
      department: "Département",
      employe: "Employe",
      Categpanne: "Catégorie",
      Equipprod: "Equipements",
      database:"Données de base",
      localite:"Localité",
      nationalite:"Nationalité",
      origine:"Origine",
      equipement:"Equiepement",
      action: "Action",
      articlee:"Article",
      Production:"Production",
      Gestqualite: "Qualité",
      typeFournisseur:"Type Fournisseur",
      fournisseurr:"Fournisseur",
      producteurr:"Producteur",
      unitemesure:"Unité de mésure",
      parcellee:"Parcelle",
      produitt:"Produit",
      marquee:"Marque",
      varietee:"Varieté",
      variete:{
        code:"Code",
        nom:"Nom",
        produit:"Produit"
      },
      marque:{
        code:"Code",
        produit:"Produit",
        nom:"Nom",
        orderMarque:"Ordre",
        abrege:"Abrege"
      },
      produit:{
        code:'Code',
        nom:"Nom",
        description:'Nom',
        prefNumBE:'Pref.N° B.E',
        prochainNumBE: 'Prochain N°',
        cpteAchat: 'Cpte Ach.',
        tauxBIC: 'Taux B.I.C',
        prefNumBS: 'Pref.N° B.S',
        prochainNumBS: 'Prochain N°',
        cpteVente: 'Cpte Vte.',
        cpteBIC: 'Cpte B.I.C',
        uniteAchat: 'Unité de mesure Achat',
        uniteStation: 'Unité de mesure Station',
        puAchatProducteur: 'P.U Achat Producteur',
        puAchatTechDeRecolte: 'P.U Achat Technicien de recolte',
        redevanceProducteur: 'Redevance Producteur',
        nbreCartonParDefault: 'Nombre carton par default',
        redevanceTR: 'Redevance TR',
        redevanceExporateur: 'Redevance Exporteur'
      },
      parcelle:{
        codep:"Code",
        numParcelle:"N° Parcelle",
        localite:"Localité",
        produit:"Produit",
        variete:"Varieté",
        surfPdt:"Surf.Pdt(ha)",
        surfTot:"Surf.Tot(ha)",
        estimation:"Estimation(Kg)",
        prodReelle:"Prod.réelle(kg)",
        producteur:"Producteur"
      },
      unitedemesure:{
        code:"Code",
        nom:"Nom"
      },
      producteur:{
        code:"Code",
        nom:"Nom",
        date:"Date",
        identification:"Identification",
        photo:"Photo",
        numGGN:"N° GGN",
        date:"Date",
        nom:"Nom",
        adresse:"Adresse",
        tel:"Contact Téléphoniques",
        fax:"Fax",
        email:"E-mail",
        dateNaiss:"Ne le",
        lieunais:"A",
        nationalite:"Nationalité",
        genre:"Genre",
        pere:"Père",
        mere:"Mère",
        nbrEnfants:"Nombre enfants",
        nbrFemme:"Nombre femmes",
        refPiece:"Référence pièce"
      },
      typeFourn:{
        code:"Code",
        nom:"Nom",
      },
      article:{
        codeArticle:"Code",
        nomArticle:"Nom",
        quantite:"Quantité",
        pu:"PU",
        montant:"Montant"
      },
      station: {
        code: "Code",
        nom: "Nom",
        localite: "Localité",
        longitude: "Longitude",
        latitude: "Latitude",
      },
      equipe: {
        code: "Code",
        nom: "Nom",
        superviseur: "Supérviseur"
      },
      departement: {
        code: "Code",
        nom: "Nom",
        superviseur: "Supérviseur"
      },
      categoriee: {
        code: "Code",
        nom: "Nom",
      },
      panne:{
        station: "Station",
        dateDebut: "Date de début",
        dateFin:"Date de fin",
        description:"Description",
        equipe:"Equipe",
        responsable:"Responsable",
        category:"Categorie",
        type:"Type",
        heureDebut:"Heure de debut",
        heureFin:"Heure de fin",
        differenceHours:"Difference",
        duree:"Durée",
        actif:"Actif"
      },
      equipementt: {
        code: "Code",
        nom: "Nom",
        station: "Station",
        constat: "Constat",
        solution:"Solution",
        description:"Description",
        actifs:"Actifs",
        documentationLink:"Documentation link"

      },
      employef: {
        identification: "Identification",
        coaching: "Coaching",
        ordervire: "Ordre de Virement",
        code: "Code",
        nom: "Nom",
        matricule: "Matricule",
        dateEntre: 'Date d\'entée',
        numCptTiers: 'N° Compte Tiers',
        datenaiss: 'Né le',
        lieunais: 'A',
        nationalite: 'Nationalité',
        adresse: 'Adresse',
        tel: 'Tél./Cel.',
        email: 'E-mail',
        departement: 'Département',
        fontion: 'Fonction occupée',
        equipe: 'Equipe',
        banque: 'Banque',
        num: 'N°'

      },
      fournisseur:{
        identification:"Identification",
        code:"Code",
        dateEntree:"Date entrée",
        type:'Type',
        numCptTiers:'N° Compte Tiers',
        nom:'Nom',
        adresse:"Adresse",
        tel:'Contacts Téléphoniques',
        fax:'Fax',
        email:'Email',
        regimeFiscal:'Régime Fiscal',
        numCC:'N° C.C',
        numRCCM:'N° R.C.C.M',
        numAgrement:'N° Agrement',
        orderVirement:'Ordre de virement',
        banque:'Banque',
        numero:'N°',
        solde:'Solde'
      },
      newstation: "Nouveau station",
      newproduit:"Nouveau produit",
      newvariete:"Nouveau varieté",
      editvarite:"Modifier varieté",
      newmarque:"Nouveau marque",
      editmarque:"Modifier marque",
      editproduit:"Modifier produit",
      newparcelle:"Nouveau parcelle",
      editparcelle: "Modifier parcelle",
      newnationalite:"Nouveau nationalité",
      newlocalite:"Nouveau localité",
      newPanne:"Nouveau panne et arret",
      newcategorie:"Nouveau catégorie",
      newequipement:"Nouveau équipement",
      newfournisseur:"Nouveau fournisseur",
      editstation: "Modifier station",
      newequipe: "Nouveau équipe",
      newunite:"Nouveau unité de mésure",
      editunite:"Modifier unité de mésure",
      editequipe: "Modifier équipe",
      newemploye: "Nouveau employée",
      editemploye: "Modifier employée",
      newdept: "Nouveau département",
      editdept: "Modifier département",
      newlocalite: "Nouveau localité",
      editlocalite: "Modifier localité",
      editnationalite:"Modifier nationalité",
      newnationalite: "Nouveau nationalité",
      newtype:"Nouveau type de fournisseur",
      newproducteur:"Nouveau producteur",
      editproducteur:"Modifier producteur",
      neworigine:"Nouveau origine",
      editorigine:"Modifier origine",
      gestQualite:"Gestion qualité",
      menu: {
        dashboard: "Tableau de bord",
        gestpanne: "Gestion PN & ARR"
      },
      login: {
        title: "Connectez-vous pour continuer sur Performance Pathfinder Metrics.",
        username: "Login",
        password: "Mot de passe",
        rememberme: "Remember Me",
        forgetpass: "Forget your password?"
      },
      message: {
        required: "Champ obligatoire",
        invalidEmail:"Email invalide"
      },
      actions: {
        save: "Enregistrer",
        delete: "Supprimer",
        edit: "Modifier",
        login: "Login",
        logout: "Logout",
        downloadTemp:"Template",
        export:"Exporter",
        upload:"Données",
        close:"Annuler",
        confirm:"Confirmer",
        new:"Créer"

      },
      text:{
        confirmation:"Confirmation",
        msgDelete:"Voulez vous supprimer cette ligne ?",
      }
    }
  },
  // it: {
  //   translation: translationIT
  // },
  //  rs: {
  //   translation: translationRS
  // },
  //  sp: {
  //   translation: translationSP
  // },
  eng: {
    translation: {
      Gestpanne: "Issues",
      menu: {
        dashboard: "Dashboard"
      },
      actions: {
        login: "Login",
        logout: "Logout"
      },
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fr", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;