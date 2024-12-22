// npm i yup react-hook-form @hookform/resolvers
import * as yup from "yup"

export const validationShemaContact = yup.object().shape({
    name: yup.string().trim().required("Le nom est requis"),
    email: yup.string().email().matches(/^(?!.*@[^,]*,)/).required("Le mail est requis"),
    sujet: yup.string().trim().required("Le sujet est requis"),
    message: yup.string().trim().required("Le message est requis")
})