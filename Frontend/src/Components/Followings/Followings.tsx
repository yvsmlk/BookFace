import React, { useEffect, useState } from "react";
// import { Person, ResponseMsg, StatusTypes } from "../../utils/Types";
import { SlUserFollow } from "react-icons/sl";
import { Person , ResponseMsg, StatusTypes } from "../../utils/typess";
// import { Person } from "./people"; // importation de notre type Person


// export interface Person {
//   id:number
//   tag:string,
//   avatar:string
// }

const fetchFollowSuggestion = ()=>{

  let option = {
      method: 'GET',
      credentials: "include" as RequestCredentials,
  }

  const DEVELOP = "http://localhost:3535"
  const PRODUCTION = "https://book-face-backend.vercel.app"
  let URL = `${PRODUCTION}/users/suggest` 

  
  return new Promise<ResponseMsg>(async (resolve, reject) => {

      try {
  
        let response = await fetch(URL,option)
        let data:ResponseMsg = await response.json()

        let persons = []

        for (let elem of data.content as {context_id:number,tag:string,link:string}[]){
          persons.push({
            tag:elem.tag,
            avatar:elem.link,
            id:elem.context_id
          })
        }
      
        resolve({
          status:100,
          message:StatusTypes[100],
          content: persons
        }) 
        
      } catch (err) {
        resolve({
          status:404,
          message:"System error",
          content: {err}
        }) 
      }
      
    })

}

const fetchFollow = (u_tag:string)=>{

  let option = {
    method: 'GET',
    credentials: "include" as RequestCredentials,
}

const DEVELOP = "http://localhost:3535"
const PRODUCTION = "https://book-face-backend.vercel.app"
let URL = `${PRODUCTION}/users/follow?user=${u_tag}` 


return new Promise<ResponseMsg>(async (resolve, reject) => {

    try {

      let response = await fetch(URL,option)
      let data:ResponseMsg = await response.json()
    
      resolve({
        status:100,
        message:StatusTypes[100],
        content: {}
      }) 
      
    } catch (err) {
      resolve({
        status:404,
        message:"System error",
        content: {err}
      }) 
    }
    
  })

}

const FollowSuggestions = ({vCardRerender}:{vCardRerender:Function}) => {

  const [showAll, setShowAll] = useState(false);
  const [reRender, setRerender] = useState(false);
  const [persons,setPersons] = useState<Person[]>([])
  const displayedSuggestions = showAll ? persons : persons.slice(0,3);


  useEffect(()=>{
    fetchFollowSuggestion()
    .then(data=>{
      setPersons(data.content as Person[])
    })
  },[showAll,reRender])

  const handleFollow = (u_tag:string) => {
    fetchFollow(u_tag)
    .then(data=>{
      if (data.status == 100){

        setRerender(!reRender);
        vCardRerender(Math.random())
      }
    })
    .catch(err=>console.log(err))
  };

  const truncate = (word:string):string =>{
    return word.length>10? word.slice(0,7) + "...":word
  }

  return (
    <div className="flex flex-col rounded-md shadow-md bg-white p-2 overflow-hidden">
      <div className="bg- h-16 flex justify-center items-center">
        <h2 className="text-lg font-medium text-green-700 select-none">You may follow</h2>
      </div>
      {displayedSuggestions.map((person) => (
        <div key={person.id} className="flex items-center mb-4 border-b-2 border-gray-300 pb-4 ml-2">
          <img
            src={person.avatar}
            alt="Avatar"
            className="rounded-full w-10 h-10 mr-4"
          />
          <div className=" flex gap-2 justify-between flex-1">

            <div className="  ">
              <p className=" text-green-600 cursor-pointer select-none hover:text-green-900 truncate">{truncate(person.tag)}</p>
            </div>

            <button onClick={()=>handleFollow(person.tag)} className="flex place-self-end items-center px-3 rounded-lg text-neutral-50 font-semibold bg-green-600 hover:bg-green-900">
              Follow
            </button>
          </div>
        </div>
      ))}
      {showAll ? 
        <button onClick={()=>setShowAll(false)} className="text-green-900 hover:underline cursor-pointer ml-1">
          See less
        </button>
      :
        <button onClick={()=>setShowAll(true)} className="text-green-900 hover:underline cursor-pointer ml-1">
          See more
        </button>
      }
    </div>
  );
};

export default FollowSuggestions;


