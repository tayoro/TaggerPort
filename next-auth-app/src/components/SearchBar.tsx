import React from 'react'

export default function SearchBar({search, SetSearch}: any) {
  return (
    <>
    <input 
        type="text" 
        value={search} 
        onChange={(e)=>SetSearch(e.target.value)} 
        placeholder="Rechercher..." 
        className="w-[150px] sm:w-[350px] h-[40px] bg-[#E2E2E2] rounded-[20px] px-5" />
    </>
  )
}
