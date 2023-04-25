import React, { useState } from "react";
import { FiArrowRight,FiCamera, FiVideo, FiCalendar, FiMoreHorizontal } from "react-icons/fi";
import { toast } from "react-toastify";

interface Props {
  profilePictureUrl: string;
}

type ResponseMsg = {
  status: number,
  message: string,
  content: object | []
}

const DEVELOP = "http://localhost:3535"
const PRODUCTION = "https://book-face-backend.vercel.app"

const sendPost = async (content:string, media=0)=>{
  let url = `${PRODUCTION}/posts/add`

  let option = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
      
    },
    credentials: "include" as RequestCredentials,
    body: JSON.stringify({
      content: content,
      media: media
    }),
    
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


const PostCard = ({ profilePictureUrl,feedFRender }:
  {profilePictureUrl:string,feedFRender:Function}) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [schedule, setSchedule] = useState(new Date());

  

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result as string);
      };
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setVideo(reader.result as string);
      };
    }
  };

  const handleScheduleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setSchedule(date);
  };

  const resetInput = ()=>{
    setText("")
    setImage("")
    setVideo("")
    feedFRender()
  }



  const handleSubmit = async () => {
    if (text.length == 0 ) return

    let response = await sendPost(text)
    if (response.status == 100){
      resetInput()
    }
    else{
      toast.error(response.message, {
        position: "top-center",
        hideProgressBar:true,
        pauseOnHover:true,
        autoClose: 5000
      })
    }
  };

  const handlePhotoUpload = () => {
    // handle photo upload logic here
  };

  const handleVideoUpload = () => {
    // handle video upload logic here
  };

  const handleSchedule = () => {
    // handle schedule logic here
  };

  const handleMore = () => {
    // handle more logic here
  };

  return (
    <div className=" rounded-md overflow-hidden shadow-md bg-white p-3">
      {/* <img className="h-12 w-12 rounded-full" src={profilePictureUrl} alt="Profile" /> */}
      <div className="flex-1 ml-4 mr-4">
          <textarea
            className="block w-full border-green-900 rounded-md shadow-sm focus:border-gray-500 focus:ring-gray-500 min-h-[5rem]"
            placeholder="What's happening?"
            value={text}
            onChange={handleTextChange}
          />
          <div className="flex justify-between items-center mt-2 ml-2 mr-2">
            
            <button
              type="submit"
              className="px-3 rounded-lg text-neutral-50 font-semibold bg-green-600 hover:bg-green-900"
              onClick={handleSubmit}
              >
              Post
            </button>
          </div>
      </div>
    </div>
  );
};

export default PostCard;  
