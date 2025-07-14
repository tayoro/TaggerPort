import { FaHome } from "react-icons/fa";
import { MdArticle, MdDashboard, MdSupervisedUserCircle } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Swap from './Swap';
import styles from "@/app/styles/pages/home.module.css"
import { useRef, useState } from "react";
import { useFireBaseInfo } from "@/app/context/dataContextInfo";

// interface Links  {
//     activeSection: string,
// }

export default function Nav({activeSection , navRef} : {activeSection: any, navRef: any}) {

    let [isOpen, setIsOpen] = useState(false);
    const {infos} = useFireBaseInfo()
    
    // const open = ()=>{
    //     setIsOpen(prev => !prev)
    // }

    const menuNav = [
        {name: "Home", icon:FaHome, path: 'home', id: 1},
        {name: "A propos", icon:MdArticle, path: 'apropos', id: 2},
        {name: "Experiences", icon:MdDashboard, path: 'experience', id: 3},
        {name: "Services", icon:MdDashboard, path: 'service', id: 4},
        {name: "Portfolio", icon:MdDashboard, path: 'portfolio', id: 5},
        {name: "Tutoriel", icon:MdDashboard, path: 'tutoriel', id: 6},
        {name: "Contact", icon:MdDashboard, path: 'contact', id: 7}
    ]

    
    return (
        <>
           <nav ref={navRef} className={` absolute transition-all duration-500 ease-in lg:duration-0 left-0 w-full mt-7  lg:static lg:w-auto lg:mt-0 bg-[#b0b0b0] md:bg-[#fff]  z-[-1] lg:z-[0] lg:flex lg:items-center p-1 lg:h-[100%] ${isOpen ? infos.length ? "top-[88px] bg-[#b0b0b0]": 'top-[20px]': 'top-[-600px]'}  `}>  {/*   ${isOpen ? 'top-[-490px]': 'top-[20px]'} */}
                <ul className={`${styles.sousNav} flex lg:static bg-[#b0b0b0] md:bg-[#fff] flex-col lg:flex lg:items-center lg:flex-row lg:gap-5 text-[14px] `}>   {/*menu-nav ${navbarOpen ? styles.show_menu : ''} */}
                    {menuNav.map((item: any) => (
                        <li key={item.name}  className={`${isOpen && "top-[88px] bg-[#b0b0b0] md:bg-[#fff] "}`}>
                            <Link href={`#${item.path}`} className={`${styles.nav_link} hover:pl-2 lg:hover:pl-0 hover:bg-[#4e4a4a] hover:underline hover:decoration-solid lg:hover:bg-[#FFF] flex py-[14px] md:py-[19px] justify-start lg:items-center gap-2 text-black hover:text-orange-700`}>
                                {/* <item.icon className={`${activeSection == item.path && "text-orange-500"}`}/> */}
                                <span className={` cursor-pointer ${activeSection == item.path && "text-orange-700 underline decoration-solid"}`}>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className={` lg:hidden grid place-items-center cursor-pointer h-14`}> <Swap isOpen={isOpen} setIsOpen={setIsOpen}/></div>
        </>
    )
}
