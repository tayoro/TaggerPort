"use client"

import { MutableRefObject } from "react"
import React, { useState } from 'react'
import Nav from "@/components/Nav";
import Link from "next/link";
import { useEffect, useRef } from 'react';
//npm i gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import logo from "@/app/assets/logo.jpg";
import Image from "next/image";
import styles from "@/app/styles/pages/home.module.css"
import Marquee from "./Maquee";
import { useFireBaseInfo } from "@/app/context/dataContextInfo";
import { cn } from "../../lib/utils"; 
import { useRouter } from "next/navigation";

import InfiniteScrollCarousel from '@/components/InfiniteScrollCarousel';


export default function Header({}) {
    // activation de lien
    
    //const [ scrollPosition, setScrollPosition ] = useState(0);
    //const [headerVisivble, setHeaderVisivble] = useState<boolean>(false)

    const router = useRouter()
    let [activeSection, setActiveSection] = useState('')
    const headerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const navRef = useRef() as MutableRefObject<HTMLDivElement>;
    const {infos} = useFireBaseInfo()

    // Fondu la barre de navigation lors du défilement de l'utilisateur
    gsap.registerPlugin(ScrollTrigger);


    useEffect(() => {
        const showNav = gsap.fromTo(
            headerRef.current, 
            {
                opacity: 0,
                pointerEvents: "none",
            }, 
            {
                opacity: 1,
                duration: 0.4,
                pointerEvents: "auto",
                
        }).progress(1);
        ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                self.direction === -1 ?
                    showNav.play()
                    : showNav.reverse()
            }
        });
    }, [])

    // acitive lien
    useEffect(() => {
        let home = document.getElementById('home')
        let apropos = document.getElementById('apropos')
        let experience = document.getElementById('experience')
        let service = document.getElementById('service')
        let portfolio = document.getElementById('portfolio')
        let tutoriel = document.getElementById('tutoriel')
        let contact = document.getElementById('contact')
        let sections = [home, apropos, experience, service, portfolio, tutoriel, contact]

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2,
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    if (entry.target.id == 'home'){
                        setActiveSection('home')
                    }
                    if (entry.target.id == 'apropos'){
                        setActiveSection('apropos')
                    }
                    if (entry.target.id == 'experience'){
                        setActiveSection('experience')
                    }
                    if (entry.target.id == 'service'){
                        setActiveSection('service')
                    }
                    if (entry.target.id == 'portfolio'){
                        setActiveSection('portfolio')
                    }
                    if (entry.target.id == 'tutoriel'){
                        setActiveSection('tutoriel')
                    }
                    if (entry.target.id == 'contact'){
                        setActiveSection('contact')
                    }
                }
            })
        }, observerOptions)
        
        sections?.forEach(section => {
        section && observer.observe(section)
        })
    }, [])

    
        // useEffect(()=>{
        //     var timer = setInterval(()=>{
        //         headerRef.current.style.opacity = '0'
        //     }, 1000)
        //     return ()=>{
        //         clearInterval(timer)
        //     }
        // }, [])

        // useEffect(() => {
        //     window.addEventListener("scroll", handleScroll, { passive: true });
        //     console.log(scrollY)
        //     return () => {
        //         window.removeEventListener("scroll", handleScroll);
        //     };
        // }, [scrollPosition]);

        // const handleScroll = () => {
        //     const position = window.scrollY;
        //     if (position > 400) {
        //         setHeaderVisivble(true);
        //     }
        //     if (position < 401) {
        //         setHeaderVisivble(false);
        //     }
        // };

    // carder pour le Maquee
    let rand: Number = 0;

    //const ReviewCard = (
    //     {
    //     theme,
    //     intervenant,
    //     cible,
    //     lieu,
    //     description,
        
    // }: {
    //     theme: string;
    //     intervenant: string;
    //     cible: string;
    //     lieu: string;
    //     description: string;
        
    // }
    // ) => {
        
    // return (
    //     <figure
    //         className={cn(
    //         "relative mr-10 cursor-pointer overflow-hidden rounded-xl border p-4",
    //         // light styles
    //         "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
    //         // dark styles
    //         "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
    //         )}
    //     >
    //         <div className="flex items-center w-auto gap-7">
                
    //                 <>
    //                     <div className="flex gap-2"><span className="font-semibold italic">Theme:</span><span>{theme}</span></div>
    //                     <div className="flex gap-2"><span className="font-semibold italic">Intervenant:</span><span>{intervenant}</span></div>
    //                     <div className="flex gap-2"><span className="font-semibold italic">Cible:</span><span>{cible}</span></div>
    //                     <div className="flex gap-2"><span className="font-semibold italic">Lieu:</span><span>{lieu}</span></div>
    //                     <div className="flex gap-2"><span className="font-semibold italic">Description:</span><span>{description}</span></div>
    //                 </>
                
    //         </div>
    //     </figure>
    //     );
    // };

   

    return (
        <>
            <header ref={headerRef} className={`  md:shadow-md shadow-none flex flex-col  w-[100%] fixed z-[2] md:h-auto bg-[#FFF] ${styles.header}`}>
                    <div className="bg-[#FFF]">
                        <InfiniteScrollCarousel />
                    </div>
                    <div className="relative bg-[#FFF]">
                        {/* logo ici */}
                        {infos && (
                            <>
                                <div className="cursor-pointer px-[20px] xl:px-[40px]" onClick={()=>{router.push(`info`)}}>
                                    <Marquee pauseOnHover className="[--duration:20s] py-0">
                                        <div className="flex items-center text-[30px] text-[#d31212]">
                                            {infos.length > 0 && <div className="font-bold text-[40px] mr-10"><span className="warning">Warning:</span> Nouvelles informations publiées cliquez ici pour en savoir plus ... </div>}
                                            {/* {infos.map((info)=>(
                                                <>
                                                    {infos.length > 1 &&( 
                                                        <> 
                                                            <div className="w-10 h-10 border border-red-600 flex items-center justify-center rounded-[50%]">{1+rand++} </div>
                                                        </>
                                                    )}
                                                    <ReviewCard key={info.theme} {...info} />
                                                </>
                                            ))} */}
                                        </div>
                                    </Marquee> 
                                </div>
                            </>
                            )
                        }
                        <div className={` flex justify-between items-start px-[20px] xl:px-[40px] ${ infos.length && "md:justify-end" } md:flex md:items-center w-full bg-[#FFF] md:h-[60px]`}>
                            <div className={` text-black grid place-items-center h-full w-[100px] ${ infos.length && "md:absolute top-0 left-0 md:w-[200px] bg-white" }`}>
                                <Link href="/"> <Image priority={true}  src={logo} width={73} height={83} alt="image" className={` h-full w-full object-cover`}/></Link>
                            </div>
        
                            {/* nav links here */}
                            <Nav activeSection={activeSection} navRef={navRef}/>
                        </div>
                    {/* </div> */}
                    
                    </div>
                    
            </header>
        </>
    )
    
}
