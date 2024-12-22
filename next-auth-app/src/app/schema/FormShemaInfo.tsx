import * as yup from "yup"

export const validationShemaInfo = yup.object().shape({
    infoType: yup.string().trim().required("Le type de publication est requis"),
    theme: yup.string().trim().required("Le theme est requis"),
    cible: yup.string().trim().required("La cible est requise"),
    description: yup.string().trim().required("La description est requise"),
    dateDebutFirst: yup.string().trim().required("La date est requise"),
    heureFinFirst: yup.string().trim().required("L'heure est requise"),
    dateDebutSecond: yup.string(),
    heureFinSecond: yup.string(),
    intervenant: yup.string().trim().required("Le intervenant est requis"),
    lieu: yup.string().trim().required("Le intervenant est requis")
})