

import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import { getDoc } from "../api_doc"

import { useState, useEffect } from 'react'
const SAMPLE = ()=>{
    return (
        <div className=" h-screen bg-neutral-600 flex justify-center items-center"> <span className=" text-neutral-50 font-bold select-none"> ADD API DOC HERE </span> </div>
    )
}

type buttonProps = {
    text:string, 
    activeButton:string, 
    setActiveButton:React.Dispatch<React.SetStateAction<string>>
}

const S_BUTTON = ({text, activeButton, setActiveButton}:buttonProps)=>{

    let bg_color = text == activeButton? 'bg-neutral-50' : 'bg-neutral-900'
    let color = text == activeButton? 'text-neutral-900' : 'text-neutral-50'

    return (
        <button className={`flex justify-center items-center h-[75%] ${bg_color} ${color}
        text-neutral-50 select-none cursor-pointer rounded-t-md p-2`}
        onClick={()=>setActiveButton(text)}>
            {text}
        </button>
    )
}

const VIEWSLIDER = ()=>{

    const [activeButton, setActiveButton] = useState('Development')

    const getDisplayInfo = (env:string)=>{
        return {
            host: env == 'Production' ? "https://book-face-backend.vercel.app": "http://localhost:3535"
        }
    }

    return (
        <div  className=" flex-1 flex flex-col bg-neutral-900 p-3 overflow-x-scroll">
            <div className=" flex items-end gap-2 flex-[0_1_5%] pl-2 ">
                <S_BUTTON text="Development" activeButton={activeButton} setActiveButton={setActiveButton}/>
                <S_BUTTON text="Production" activeButton={activeButton} setActiveButton={setActiveButton}/>
            </div>
            <div className=" flex-[0_1_95%] rounded-lg bg-neutral-50">
                <SwaggerUI  spec={getDoc(getDisplayInfo(activeButton).host)} />
            </div>
        </div>
    )
}

export const APIDoc = ()=>{
    return (
        <div className=" flex h-screen ">
            <VIEWSLIDER/>
        </div>
    )
}