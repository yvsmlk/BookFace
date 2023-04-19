import React, { useState, useEffect } from 'react';

type VCardProps = {
  tag: string,
  username: string,
  followers: number,
  following: number,
  avatar:string
};

type ResponseMsg = {
  status: number,
  message: string,
  content: object | []
}


const DEVELOP = "http://localhost:3535"
const PRODUCTION = "https://book-face-backend.vercel.app"

const getProfile = async ()=>{
  let url = `${DEVELOP}/profiles`

  let option = {
    method: 'GET',
    credentials: "include" as RequestCredentials
    
  }

  
  return new Promise<ResponseMsg>(async (resolve, reject) => {

    try {

      let response = await fetch(url,option)
      let data:ResponseMsg = await response.json()

      resolve(data) 
      
    } catch (err) {
      resolve({
        status:404,
        message:"System error",
        content: {err}
      }) 
    }
    
  })

}


const VCard= () => {


  const [profile,setProfile] = useState<VCardProps>() 

  useEffect(()=>{

    getProfile()
    .then(data=>{

      let {

        tag,
        avatar,
        email,
        username,
        followers,
        follows,
        status,
        banner,
        created_at,

      } = data.content as {
        tag :string,
        avatar : string,
        email : string,
        username : string,
        followers : number,
        follows : number,
        status : number,
        banner : number,
        created_at : string,
      }

      let card:VCardProps = {
        tag: tag,
        username: username||"",
        followers: followers,
        following: follows,
        avatar: avatar,
      }

      setProfile(card)
      
    })
    .catch(err=>console.log())

  },[])  

  return (
    <div className="  w-96   md:w-4/5 lg:w-4/5 xl:w-4/5 mx-auto rounded-md overflow-hidden shadow-md bg-white">
      <div className="bg-green-700 h-28 flex justify-center items-center">
        <div className="h-28 flex items-center mt-12 z-30">
          <img
            src={profile? profile.avatar : ""}
            alt=""
            width={150}
            height={150}
            className="bg-white border-1 border-black rounded-full "
          />
        </div>
      </div>
      <div className="text-center py-6 mt-5">
        <h2 className="text-2xl font-bold text-green-800">{profile? profile.tag : ""}</h2>
      </div>
      <div className="flex justify-between px-6 py-4 border-t border-gray-200">
        <div>
          <p className="text-gray-600 font-medium">{profile? profile.followers : 0}</p>
          <p className="text-gray-400">Followers</p>
        </div>
        <div>
          <p className="text-gray-600 font-medium">{profile? profile.following : 0}</p>
          <p className="text-gray-400">Following</p>
        </div>
      </div>
    </div>
  );
};

export default VCard;

