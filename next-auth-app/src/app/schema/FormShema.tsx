// npm i yup react-hook-form @hookform/resolvers
import * as yup from "yup"

export const validationShema = yup.object().shape({
    titre: yup.string().trim().required("Le titre est requis"),
    video: yup.string(),
    desc: yup.string().trim().required("La description est requis")
})