import React, { useEffect, useState } from "react";
import { Person, ResponseMsg, StatusTypes } from "../../utils/typess";
import { SlUserFollow } from "react-icons/sl";
import { useLocation, useNavigate } from "react-router-dom";
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

const fetchFollows = (u_tag:string)=>{

  let option = {
    method: 'GET',
    credentials: "include" as RequestCredentials,
}

const DEVELOP = "http://localhost:3535"
const PRODUCTION = "https://book-face-backend.vercel.app"
let URL = `${PRODUCTION}/users/follows?user=${u_tag ||"self"}` 


return new Promise<ResponseMsg>(async (resolve, reject) => {

    try {

        let response = await fetch(URL,option)
        let data:ResponseMsg = await response.json()
        console.log(u_tag);
        
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

const fetchFollowers = (u_tag:string)=>{

    let option = {
      method: 'GET',
      credentials: "include" as RequestCredentials,
  }
  
  const DEVELOP = "http://localhost:3535"
  const PRODUCTION = "https://book-face-backend.vercel.app"
  let URL = `${PRODUCTION}/users/followers?user=${u_tag ||"self"}` 
  
  
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
  let URL = `${PRODUCTION}/users/follow?user=${u_tag }` 
  
  
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
  
type FFeedType = "Follows" | "Followers"

const FFeed = ({vCardRerender, user_tag, type}:{vCardRerender:Function, user_tag:string, type :FFeedType}) => {

  const [showAll, setShowAll] = useState(false);
  const [reRender, setRerender] = useState(false);
  const [follows,setFollows] = useState<Person[]>([])
  const [followers,setFollowers] = useState<Person[]>([])
//   const displayedSuggestions = showAll ? persons : persons.slice(0,3);
  const displayedFollow = showAll ? follows : follows.slice(0,3);
  const displayedFollowers = showAll ? followers : followers.slice(0,3);
  const [users,setUsers] = useState<Person[]>([])
  let navigate = useNavigate()
  
  


  useEffect(()=>{

    if (type == "Follows"){
        fetchFollows(user_tag)
        .then(data=>{
            console.log(data);
            setUsers(data.content as Person[])
        })
    }
    else if (type == "Followers"){

        fetchFollowers(user_tag)
        .then(data=>{
            console.log(data);
            
            setUsers(data.content as Person[])
            
        })
    }

  },[reRender,user_tag])



  const handleProfileSwitch = (u_tag = "")=>{
    navigate(`/PProfile/${u_tag}`,{ replace: true })
    
  }

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

//   let persons = type == "Follows" ? follows : followers
  console.log("UTAG: "+user_tag);
  
  return (
    <div className="flex flex-col rounded-md gap-4 p-2 overflow-hidden">
      {users.map((person) => (
        <div key={person.id} className="flex items-center mb-4 border-b-2  pb-4 ml-2">
          <img
            src={person.avatar}
            alt="Avatar"
            className="rounded-full w-12 h-12 mr-4"
            
          />
          <div className=" flex gap-2 justify-between flex-1">

            <div className=" hover:cursor-pointer select-none ">
              <p onClick={()=>handleProfileSwitch(person.tag)} className=" text-green-600 cursor-pointer select-none hover:text-green-900">{person.tag }</p>
            </div>

            {
                type == "Follows" && (person.tag == user_tag || user_tag == "") && <button onClick={()=>handleFollow(person.tag)} className="flex place-self-end items-center px-3 rounded-lg text-neutral-50 font-bold bg-green-600 hover:bg-green-900">
                Unfollow {"PTAG"+person.tag }
                </button>

            }

          </div>
        </div>
      ))}
      
    </div>
  );
};

export default FFeed;


