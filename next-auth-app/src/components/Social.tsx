import { FaFacebookF } from "react-icons/fa6";
import { IoLogoTwitter } from "react-icons/io5";
import { FaLinkedinIn } from "react-icons/fa";
import styles from "@/app/styles/pages/home.module.css" 

export default function Social() {


    return (
        <>
            <div className={ `${styles.homeSci} w-[100%] flex justify-center`}>
                <a href="#"><FaFacebookF/></a>
                <a href="#"><IoLogoTwitter/></a>
                <a href="#"><FaLinkedinIn/></a>
            </div>
        </>
    )
}
