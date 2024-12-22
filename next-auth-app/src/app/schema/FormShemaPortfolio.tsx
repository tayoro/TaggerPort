import * as yup from "yup"

export const validationShemaPortfolio = yup.object().shape({
    titre: yup.string().trim().required("Le titre est requis"),
    image: yup.string(),
    desc: yup.string().trim().required("La description est requis")
})