"use client"

import React from "react";
import { useState } from "react";
import Header from "@/components/Header";
import Nav from "@/components/Nav";
import { useEffect, useRef } from 'react';
import Image from "next/image";
import monImg from "@/app/assets/monImg.jpg";
import apropos from "@/app/assets/apropos.jpg";
import cv from "../../public/cv.pdf";
import Link from "next/link";
import styles from "@/app/styles/pages/home.module.css"
import Typewriter from 'typewriter-effect';

import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from "@/components/EmblaCarousel";


import CardContenu from "@/components/CardContenu";

import NoSsr from "@/components/NoSsr";

import { FaUniversity } from "react-icons/fa";
import { GrUserExpert } from "react-icons/gr";
import { FaStar } from "react-icons/fa6";

import Video from "@/components/Video";
import SearchBar from "@/components/SearchBar";
import { useFireBase } from "./context/dataContext";
import FormConatct from "@/components/FormContact";
import { useFireBasePortfolio } from "./context/dataContextPortfolio";
import { any } from "zod";
import Social from "@/components/Social";




export default function HomePage() {

  const OPTIONS: EmblaOptionsType = { loop: true }
  const SLIDE_COUNT = 10
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  let contents = []

  const {videos} = useFireBase()
  const {portfolios} = useFireBasePortfolio()
  

  const [search, SetSearch] = useState('')
  // filtrage de video
  const visibleVideos = videos.filter(video =>{
    if(search && !video.titre.includes(search)){
        return false
    }
    return true
  })


  // tri de d'un tableau d'object 
  const map: any = {};
  portfolios.forEach(({titre, ...original}: {titre: any}) => {
      if(!Object.hasOwnProperty.call(map, titre)) map[titre] = {titre, ...original};
      else {
          ({titre, ...original});
      }
  }); 
  const newPortfoliosTri = Object.values(map)


  return (
    <div onContextMenu={(e) => e.preventDefault()} className="bg-[#82392f]">
      <section id='home' className={`${styles.cadreHome}  home lg:h-screen bg-[#efd9b0]`}> {/*  bg-bannerImg bg-repeat bg-cover bg-bottom */}
        
      <Header/>
        <div className="flex flex-col-reverse p-6 md:flex-row w-[100%] lg:h-screen ">
          <div className={`${styles.illustration} lg:w-[50%] flex justify-center items-center flex-col lg:px-0 `}>
              <div className="grid place-items-center font-bold text-[50px] w-[100%] ">
                <p className="font-serif lg:block flex justify-center flex-col text-[#841304]  ">Dr. Tayoro Gérard</p>
              </div>
              <div className="grid place-items-center mt-1  w-[100%]  ">
                <p className="text-[20px] font-medium text-3xl font-serif italic">
                    <NoSsr>
                      <Typewriter
                            options={{
                              strings: ['Infographiste', 'Enseignant chercheur', 'Expert consultant'],
                              autoStart: true,
                              loop: true,
                            }}
                        />
                    </NoSsr>
                </p>
              </div>
              <div className="flex w-[100%] flex-row ">
                <Social />
                {/* <Link href="/cv.pdf" download="cv"><div className="my-[20px] mr-[20px] grid place-items-center text-center w-[200px] h-[50px] text-white bg-black rounded-md hover:bg-red-400 hover:text-black"> <input type="button" value="Contactez moi" className="block cursor-pointer py-[15px] px-[40px]"/> </div></Link>
                <a href="/cv.pdf" download="cv"><div className="my-[20px] grid place-items-center text-center w-[200px] h-[50px]  text-white bg-black rounded-md hover:bg-red-400 hover:text-black"> <input type="button" value="CV" className="block cursor-pointer py-[15px] px-[40px]"/> </div></a> */}
              </div>
          </div>
          <div className="flex m-0 lg:w-[50%] items-end ">
            <div className="h-[500px] flex items-end justify-center w-full pb-5 ">
              <Image  onContextMenu={(e) => e.preventDefault()} priority={true}  src={monImg} width={250} height={250} alt="image" className={`${styles.imgProfile} h-[350px] w-[350px] object-cover rounded-[50%] border-[8px] border-[#841304]`}/>
            </div>
          </div>
        </div>
      </section>

{/* ----------------------------------------------------------------------------------------------- */}
      <section id="apropos" className={`${styles.cadreAbout} bg-[#efd9b0] apropos relative xl:h-screen mt-4 xl:mt-0`}>
        <div className="h-[60px] flex justify-center items-center text-[30px] ">
          <span>A propos</span>
        </div>
        <div className={`flex flex-col items-center justify-center `}>
          <div className={`${styles.info}  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mx-[40px] flex flex-col justify-center px-[50px] flex-wrap gap-3 py-1`}>
            <div className=" px-4 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quo ab tempore magni voluptatum fuga corporis ducimus velit, autem vel perspiciatis maiores excepturi nulla quibusdam temporibus aliquid nostrum, dicta consequuntur!
            </div>
            <div className=" flex justify-center flex-wrap gap-[50px] bg-gray-200 border text-black">
              <div className=" w-[323px] flex flex-col justify-center items-center h-[125px] bg-gray-200 rounded-md border">
                <span className=" font-bold text-[25px]">NAME</span>
                <span className=" font-medium">TAYORO G. GERARD</span>
              </div>
  
              <div className=" w-[323px] flex flex-col justify-center items-center h-[125px] bg-gray-200 rounded-md border ">
                <span className="font-bold text-[20px]">GMAIL</span>
                <span className="font-medium ">tayorog@gmail.com</span>
              </div>
  
              <div className=" w-[323px] flex flex-col justify-center items-center h-[125px] bg-gray-200 rounded-md border ">
                <span className="block font-bold text-[20px]">PHONE</span>
                <span className="block font-medium">+225 0709803749</span>
              </div>
  
              <div className=" w-[323px] flex flex-col justify-center items-center h-[125px] bg-gray-200 rounded-md border ">
                <span className="block font-bold text-[20px]">PROFESSION</span>
                <span className="block font-medium uppercase">Enseignant-chercheur, Expert-consultant</span>
              </div>
              <div className=" w-[323px] flex flex-col justify-center items-center h-[125px] bg-gray-200 rounded-md border ">
                <span className="block font-bold text-[20px]">MATIERE</span>
                <span className="block font-medium">Infographie, Architecture</span>
              </div>
  
              <div className=" w-[323px] flex flex-col justify-center items-center h-[125px] bg-gray-200 rounded-md border">
                <span className="block font-bold text-[20px]">UNIVERSITE D'ENSEIGNEMENT</span>
                <span className="block font-medium">ISTC Polytechnique, UFHB, ESATIC, IUA</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center w-[100%]">
            <a href="/cv.pdf" download="cv"><div className="my-[15px] mr-[20px] grid place-items-center text-center w-[230px] h-[50px] text-white bg-orange-700 rounded-md hover:bg-orange-900 "> <input type="button" value="Telecharger mon CV" className="block cursor-pointer py-[15px] px-[30px]"/> </div></a>
          </div>
        </div>
      </section>

{/* --------------------------------------------------------------------------------------- */}
      <section id="experience" className=" bg-[#efd9b0] experience relative xl:h-screen text-[14px] my-4 xl:my-0  pb-4 xl:mt-0 ">
        <div className="h-[60px] flex justify-center items-center text-[30px]">
          <span>Experiences</span>
        </div>
        <div className={`${styles.cadreExperience} flex flex-col justify-center relative px-[50px]`}>
            <div className={`${styles.barreExperience} bg-red-400 w-[2px] absolute xl:block hidden 2xl:hidden`}>
            </div>

            <div className=" xl:h-[200px] py-[4px] xl:py-[2px] flex items-center ">

                <div className="flex flex-col items-center justify-center">
                  <div className=" text-red-500 lg:hidden">
                        2045 - 2050
                  </div>
                  <div className="lg:w-[740px] flex">
                    <div className="bg-gray-200 lg:w-[541px] lg:mr-5 px-4  border lg:border-e-4 lg:border-e-gray-950 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] lg:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                      <span className="block my-2 font-semibold">
                        Web Developper
                      </span>
                      <span className="block my-1 italic">
                        Soft Agency, sans Francisco, CA
                      </span>
                      <p className="my-1 ">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo libero illo inventore obcaecati beatae odio corrupti repellat, saepe velit 
                      </p>
                    </div>
                    <div className="hidden lg:flex items-center">
                      <div className="border border-red-400 w-10 h-10 rounded-full flex justify-center items-center">
                        <div className="bg-red-800 w-2 h-2 rounded-full">

                        </div>
                      </div>
                    </div>
                    <div className="hidden lg:flex ml-5 items-center">
                      <div className=" text-red-500">
                        2045 - 2050
                      </div>
                    </div>
                  </div>
                </div> 
              
            </div>

            <div className="xl:h-[200px] py-[4px] xl:py-[2px] flex items-center flex-row-reverse">

                <div className="flex flex-col items-center justify-center">
                  <div className=" text-red-500 lg:hidden">
                        2045 - 2050
                  </div>
                  <div className="lg:w-[740px] flex flex-row-reverse  ">
                    <div className="bg-gray-200 lg:w-[541px] lg:ml-5 px-4 border lg:border-s-4 lg:border-s-gray-950   hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] lg:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                      <span className="block my-2 font-semibold">
                        Web Developper
                      </span>
                      <span className="block my-1 italic">
                        Soft Agency, sans Francisco, CA
                      </span>
                      <p className="my-1 ">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo libero illo inventore obcaecati beatae odio corrupti repellat, saepe velit 
                      </p>
                    </div>
                    <div className="hidden lg:flex items-center">
                      <div className="border border-red-400 w-10 h-10 rounded-full flex justify-center items-center ">
                        <div className="bg-red-800 w-2 h-2 rounded-full">

                        </div>
                      </div>
                    </div>
                    <div className="hidden lg:flex mr-5 items-center">
                      <div className=" text-red-500">
                        2045 - 2050
                      </div>
                    </div>
                  </div>
                </div> 
              
            </div>

            <div className=" xl:h-[200px] py-[4px] xl:py-[2px] flex items-center">

                <div className="flex flex-col items-center justify-center  ">
                  <div className=" text-red-500 lg:hidden">
                        2045 - 2050
                  </div>
                  <div className="lg:w-[740px] flex ">
                    <div className="bg-gray-200 lg:w-[541px] lg:mr-5 px-4  border  lg:border-e-gray-950 lg:border-e-4  hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] lg:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] ">
                      <span className="block my-2 font-semibold">
                        Web Developper
                      </span>
                      <span className="block my-1 italic">
                        Soft Agency, sans Francisco, CA
                      </span>
                      <p className="my-1 ">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo libero illo inventore obcaecati beatae odio corrupti repellat, saepe velit 
                      </p>
                    </div>
                    <div className="hidden lg:flex items-center">
                      <div className="border border-red-400 w-10 h-10 rounded-full flex justify-center items-center">
                        <div className="bg-red-800 w-2 h-2 rounded-full">

                        </div>
                      </div>
                    </div>
                    <div className="hidden lg:flex ml-5 items-center">
                      <div className=" text-red-500">
                        2045 - 2050
                      </div>
                    </div>
                  </div>
                </div> 
              
            </div>


            <div className=" xl:h-[200px] py-[4px] xl:py-[2px] flex items-center flex-row-reverse">

                  <div className="flex flex-col items-center justify-center">
                    <div className=" text-red-500 lg:hidden">
                          2045 - 2050
                    </div>
                    <div className="lg:w-[740px] flex flex-row-reverse ">
                      <div className="bg-gray-200 lg:w-[541px] lg:ml-5 px-4 lg:border-s-4 lg:border-s-gray-950 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] lg:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
                        <span className="block my-2 font-semibold">
                          Web Developper
                        </span>
                        <span className="block my-1 italic">
                          Soft Agency, sans Francisco, CA
                        </span>
                        <p className="my-1 ">
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo libero illo inventore obcaecati beatae odio corrupti repellat, saepe velit 
                        </p>
                      </div>
                      <div className="hidden lg:flex items-center">
                        <div className="border border-red-400 w-10 h-10 rounded-full  flex justify-center items-center">
                          <div className="bg-red-800 w-2 h-2 rounded-full">

                          </div>
                        </div>
                      </div>
                      <div className="hidden lg:flex mr-5 items-center">
                        <div className=" text-red-500">
                          2045 - 2050
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
        </div>
      </section>

{/* --------------------------------------------------------------------------------------- */}
      <section id="service" className="bg-[#efd9b0] service xl:h-screen mt-4 xl:mt-0 pb-4 text-[#ffffff] ">
        <div className="h-[65px] flex justify-center items-center text-[30px] ">
          <span className="text-black">Service</span>
        </div>
        <div className={` h-[calc(100%-100px)]  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] flex justify-center items-center mx-[40px] px-[50px] flex-col gap-3 `}>
          <div className=" text-black ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque est doloribus officia excepturi nesciunt dolorum ipsum sint, tempore poss veritatis error. Ut animi, corrupti ad quis distinctio voluptatibus aperiam enim?
          </div>

          <div className=" xl:flex xl:justify-center xl:items-center pb-5  bg-[#d75c03] ">
                
            <div className="md:flex w-[100%] py-3">
              <div className="expert md:w-[50%] bg-gray-200 xl:w-[350px] w-full h-[350px] flex flex-col justify-center items-center p-5 text-white">
                <div className="my-3 w-full h-[55px] flex justify-center">
                  <GrUserExpert className="text-[50px]" />
                </div>
                <div className="my-3 w-full flex justify-center backdrop-blur-sm">
                  <span className="font-bold xl:inline-block ">
                    Expertise Et Consultance
                  </span>
                </div>
                <div className="my-3 w-full  h-[120px] flex justify-center backdrop-blur-sm md:hidden xl:flex">
                  Solution numerique de creation de supports graphiques (visuels) dans toutes les structures et organisations internationales.
                </div>
              </div>
              <div className="hidden md:flex justify-center items-center md:w-[50%] xl:hidden px-[30px] ">
              Solution numerique de creation de supports graphiques (visuels) dans toutes les structures et organisations internationales.
              </div>
            </div> 

            <div className="md:flex w-[100%] flex-row-reverse py-3">
              <div className="formation md:w-[50%] bg-gray-200 xl:w-[350px] w-full h-[350px] flex flex-col justify-center items-center p-5 text-white">
                <div className="my-3 w-full h-[55px] flex justify-center">
                  <FaUniversity className="text-[50px]" />
                </div>
                <div className="my-3 w-full flex justify-center backdrop-blur-sm">
                  <span className="font-bold ">
                    Formation
                  </span>
                </div>
                <div className="my-3 w-full  h-[120px] flex justify-center backdrop-blur-sm md:hidden xl:flex">
                  Cours d'infographie ou cours pour le renforcement de capacités en inforgraphie .
                </div>
              </div> 
              <div className="hidden md:flex justify-center items-center md:w-[50%] xl:hidden px-[30px]">
              Cours d'infographie ou cours pour le renforcement de capacités en inforgraphie .
              </div>
            </div>

            <div className="md:flex w-[100%] py-3">
              <div className="creation md:w-[50%] bg-gray-200 xl:w-[350px] w-full h-[350px] flex flex-col justify-center items-center p-5 text-white">
                <div className="my-3 w-full h-[55px] flex justify-center">
                  <FaStar className="text-[50px]" />
                </div>
                <div className="my-3 w-full flex justify-center backdrop-blur-sm">
                  <span className="font-bold">
                    Creation
                  </span>
                </div>
                <div className="my-3 w-full  h-[120px] flex justify-center backdrop-blur-sm md:hidden xl:flex">
                  Conception et réalisation de tous supports de communication infographie (logo, affiiche, calendrier, kakimono, deplient, modelisation 3D, etc).
                </div>
              </div>
              <div className="hidden md:flex justify-center items-center md:w-[50%] xl:hidden px-[30px]">
              Conception et réalisation de tous supports de communication infographie (logo, affiiche, calendrier, kakimono, deplient, modelisation 3D, etc).
              </div>
            </div> 

          </div>
          
        </div>
      </section>

{/* --------------------------------------------------------------------------------------- */}
      <section id="portfolio" className="bg-[#efd9b0] portfolio pb-4 lg:h-screen my-4 xl:my-0 ">
          <div className="h-[60px] flex justify-center items-center text-[30px] ">
              <span>Portfolio</span>
          </div>
          {/* <div className=" xl:shadow-none  relative overflow-hidden overflow-y-scroll h-[calc(100%-60px)] bg-white pt-10 ">
              <div className="w-full h-full xl:h-[calc(100%-30px)] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border rounded-md border-opacity-[0.6]">
                <div className="w-full h-full bg-gray-200 flex justify-start flex-wrap px-5 gap-5 overflow-hidden overflow-y-scroll py-4">
                {portfolios.map((portfolio) => (
                  <CardContenu portfolio={portfolio}/>
                ))}
              </div> 
            </div> 
          </div> */}

          <div className="h-[calc(100%-60px)] flex flex-col items-center mx-[40px] px-[50px] ">
            <div className=" ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque est doloribus officia excepturi nesciunt dolorum ipsum sint, tempore possim veritatis error. Ut animi, corrupti ad quis distinctio voluptatibus aperiam enim?
            </div>
            <div className="h-[100%] w-[100%] mt-5 lg:px-[80px] ">
              <EmblaCarousel slides={newPortfoliosTri} options={OPTIONS} />
            </div>
          </div>
      </section>

{/* --------------------------------------------------------------------------------------- */}
      <section id="tutoriel" className=" bg-[#efd9b0] tutoriel h-screen my-4 xl:my-0">
      <div className="h-[60px] flex justify-center items-center text-[30px]">
          <span>Tutoriel</span>
      </div>
      <div className=" w-full h-full ">
            <div className="w-1079 h-[70px] bg-[#FFFFFF]  flex justify-center items-center px-[23px]">
                <SearchBar search={search} SetSearch={SetSearch} /> 
            </div>
            <div className={`shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] xl:shadow-none bg-[#F2F2F2]  relative overflow-hidden overflow-y-scroll h-[calc(100%-130px)] `}>{/* overflow-hidden overflow-y-scroll h-[765px] */}
                
                    
                    {visibleVideos.length > 0 ? (
                      <div className={`${styles.card_video} flex pt-[20px] flex-wrap bg-[#F2F2F2] h-[100%] justify-center sm:justify-start `}> 
                        {visibleVideos.map((video)=>(
                        <Video key={video.id} video={video} />
                        ))}
                      </div>
                    ):(
                      <div className='grid place-items-center h-[100%] w-[100%] bg-[#F2F2F2]'>
                        <div className='text-[50px] text-white'> Aucune video n'a été publié</div>
                      </div>
                    )}
              
            </div>
      </div>
      </section>

{/* --------------------------------------------------------------------------------------- */}
      <section id="contact" className=" bg-[#efd9b0] contact lg:h-screen mt-6 xl:mt-0 ">
        <div className="h-[60px] flex justify-center items-center text-[30px]">
            <span>Contacts</span>
        </div>
        <div className="xl:h-[calc(100%-60px)] flex flex-col justify-center gap-3 mx-[40px] px-[50px] ">
              <div className="">
                  <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil sit aliquid earum odio incidunt nostrum expedita amet dolorum. Autem quidem voluptatum excepturi ex similique eveniet quia voluptas ad laboriosam. Totam.</span>
              </div>
              <div className="">
                <FormConatct />
              </div>
        </div>
      </section>

    </div>
  );
}
