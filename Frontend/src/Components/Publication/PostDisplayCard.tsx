import { useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import { FaComment, FaEllipsisH, FaHeart, FaShare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


type PostType = {
    post_id:number
    publisher: string,
    avatar:string,
    content:string,
    media:number,
    likes:number,
    created_at:string
}

type CommentType = {
    id:number,
    avatar:string,
    user: string,
    content: string,
    responses: CommentResponseType[]
    created_at: string,
    likes:number
}

type CommentResponseType = {
    id:number,
    avatar:string,
    user: string,
    content: string,
    created_at: string,
    likes:number

}

type ResponseMsg = {
    status: number,
    message: string,
    content: object | []
}

const fetchLike = (context_id:number,type="posts")=>{

    /*
    
    {
    "context_id": 7
    }
    
    */

    let option = {
        method: 'POST',
        headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        
        },
        credentials: "include" as RequestCredentials,
        body: JSON.stringify({
            context_id:context_id
        }),
    
    }

    const DEVELOP = "http://localhost:3535"
    const PRODUCTION = "https://book-face-backend.vercel.app"
    let URL = `${DEVELOP}/${type}/like` 

    
    return new Promise<ResponseMsg>(async (resolve, reject) => {

        try {
    
          let response = await fetch(URL,option)
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

const fetchRegister = (context_id:number)=>{

    /*
    
    {
    "context_id": 7
    }
    
    */

    let option = {
        method: 'POST',
        headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        
        },
        credentials: "include" as RequestCredentials,
        body: JSON.stringify({
            posts_id:context_id
        }),
    
    }

    const DEVELOP = "http://localhost:3535"
    const PRODUCTION = "https://book-face-backend.vercel.app"
    let URL = `${DEVELOP}/posts/register` 

    
    return new Promise<ResponseMsg>(async (resolve, reject) => {

        try {
    
          let response = await fetch(URL,option)
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

const ComDisplayCard = ({com_info,post_id,setComRerender}:{com_info:CommentType,post_id:number,setComRerender:React.Dispatch<React.SetStateAction<number>>})=>{

    const [likes,setLikes] =  useState(com_info.likes)
    const [isOpenResponse,setIsOpenResponse] = useState(false)
    const [commentText,setCommentText] = useState("")
    let navigate = useNavigate()
    const handleLike = async () => {
        let resp_like = await fetchLike(com_info.id,"comments")
        let {isLiked} = resp_like.content as {isLiked :boolean}

        if (isLiked){
            setLikes(likes +1)
        }else{
            setLikes(likes -1)
        }

        

    };

    const resetInput = ()=>{
        setCommentText("")
        setComRerender(Math.random())
      }

    const handleResponse = async () => {
        if (commentText.length == 0 ) return

        let response = await addComment(commentText,post_id)
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

    const handleSave = () => {
    };

    const handleComment = (value:boolean) => {
    };

    const handleProfileSwitch = (u_tag = "")=>{
        navigate(`/PProfile/${u_tag}`,{ replace: true })
    }
    
    return (

        <div className=" flex flex-col rounded-md overflow-hidden shadow-lg bg-white p-3 w-[90%]">

            <div className=" flex flex-[0_1_80%] ">
                <div className="flex items-start mb-4 mr-1 ml-1">
                    <div className="flex items-center">
                        <img onClick={()=>handleProfileSwitch(com_info.user)} src={com_info.avatar} alt="Avatar" className=" w-12 h-12 rounded-full mr-4 flex items-center hover:cursor-pointer" />
                    </div>
                </div>

                <div className=" flex flex-col gap-2 flex-1 select-none">
                    <div className=" text-green-800 font-semibold">{com_info.user}</div>
                    <div className="mb-4 mr-2 ml-2 min-h-[2rem]">
                        <p>{com_info.content}</p>
                    </div>
                </div>

            </div>

            <div className="flex flex-[0_1_20%] items-center justify-between mr-2 ml-2 ">
                <div className="flex flex-1 justify-between items-center gap-2">
                    <div className=" flex ">
                        <button onClick={()=>handleLike()} className={`flex items-center mr-4 text-green-600 hover:text-green-900`}>
                            <FaHeart className="w-5 h-5 mr-2" />
                            <span>{likes}</span>
                        </button>
                        

                    </div>
                    <div className=" flex flex-1 justify-end">
                        <button onClick={()=>setIsOpenResponse(!isOpenResponse)} className="flex items-center px-3 rounded-lg text-neutral-50 font-semibold bg-green-600 hover:bg-green-900">
                            Respond
                        </button>

                    </div>
                </div>
                
            </div>
            {
                isOpenResponse ?
                <div className=" ">
                    <textarea
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    className="
                        w-full
                        rounded-md
                        border-gray-300
                        focus:outline-none
                        focus:ring
                        focus:ring-green-800
                        py-2
                        px-4
                        
                    "
                    placeholder="Write a comment..."
                    />
                    <div className=" flex justify-end px-4">
                        <button
                            onClick={handleResponse}
                            className="text-neutral-50 font-semibold bg-green-600 hover:bg-green-900 px-3 rounded-lg"
                            >
                            Send
                        </button>
                    </div>
                </div>
                :
                <></>
            }
        </div>
        
        
    )

}

const SPIN1 = ()=>{
    return (
        <div className=" flex w-full justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="green" d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z">
                    <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
                </path>
            </svg>
        </div>
    )
}

const DEVELOP = "http://localhost:3535"
const PRODUCTION = "https://book-face-backend.vercel.app"

const fetchComment = async (post_id:number)=>{

    let option = {
        method: 'GET',
        credentials: "include" as RequestCredentials
    }

    return new Promise<CommentType[]>(async (resolve, reject) => {
        

        let URL = `${DEVELOP}/posts/comment?post_id=${post_id}` 
        
        let response = await fetch(URL,option)
        let data = await response.json() as ResponseMsg

        if (data.status == 100){
            resolve(data.content as CommentType[])
            return
        }
        resolve([])

        
    })
}

const CommentSection =  ({post_id,comRerender}:{post_id:number,comRerender:number})=>{

    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState<CommentType[]>([]);
    const [reRender, setRerender] = useState(0)
    
    

    useEffect( ()=>{
        setLoading(true)
        fetchComment(post_id)
        .then((data)=>{
            setTimeout(()=>{
                
                setComments(data)
                setLoading(false)
            },300)
        })
        .catch(err=>console.log())

        
    },[comRerender,reRender])



    return (
        <div className=" flex flex-col gap-4 flex-1 items-end  ">
            {
                loading?<SPIN1/>:comments.length<=0? <div className=" flex w-full justify-center"> No Comment </div> : comments.map((comment)=>(<ComDisplayCard post_id={post_id} setComRerender={setRerender} key={comment.id} com_info={comment}/>))
            }
        </div>
    )
}

const addComment = async (content:string, post_id:number,parent=-1)=>{
    let url = `${DEVELOP}/comments/add`

    let option = {
        method: 'POST',
        headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        
        },
        credentials: "include" as RequestCredentials,
        body: JSON.stringify({
        content: content,
        post_id: post_id,
        parent_comment: parent
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

const PostDisplayCard = ({post_info,isReg=false}:{post_info:PostType,isReg:boolean})=>{
    const [isSaved, setIsSaved] = useState(false);
    const [isCommenting, setIsCommenting] = useState(false);
    const [comment_n, setComment_n] = useState(0);
    const [commentText,setCommentText] = useState("")
    const [isOpenResponse,setIsOpenResponse] = useState(false)
    const [comRerender, setComRerender] = useState(0)
    const [likes,setLikes] =  useState(post_info.likes)
    const [HColor, setHColor] = useState(600);
    let navigate = useNavigate()

    const handleLike = async () => {
        let resp_like = await fetchLike(post_info.post_id)
        let {isLiked} = resp_like.content as {isLiked :boolean}

        if (isLiked){
            setLikes(likes +1)
            setHColor(900)
        }else{
            setLikes(likes -1)
            setHColor(600)
        }

        

    };

    const resetInput = ()=>{
        setCommentText("")
        setComRerender(Math.random())
      }
    

    const handleResponse = async () => {
        if (commentText.length == 0 ) return

        let response = await addComment(commentText,post_info.post_id)
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

    const handleRspSection = () => {
        
    };

    const handleSave = async () => {
        let response = await fetchRegister(post_info.post_id)
        let {isReg} = response.content as {isReg :boolean}
        if (response.status == 100){
            toast.success(isReg? "Post saved":"Post removed", {
                position: "top-center",
                hideProgressBar:true,
                pauseOnHover:true,
                autoClose: 3000
            })
        }
        else{
            toast.error(response.message, {
                position: "top-center",
                hideProgressBar:true,
                pauseOnHover:true,
                autoClose: 3000
            })
        }
    };

    const handleComment = (value:boolean) => {
        setIsCommenting(value);
    };

    const handleProfileSwitch = (u_tag = "")=>{
        navigate(`/PProfile/${u_tag}`,{ replace: true })
    }
    

    return (
        <div className=" flex flex-col rounded-md overflow-hidden shadow-md bg-white p-3 ">

            <div className=" flex flex-[0_1_80%] ">
                <div 
                className="flex items-start mb-4 mr-1 ml-1 ">
                    <div className="flex items-center">
                        <img onClick={()=>handleProfileSwitch(post_info.publisher)} src={post_info.avatar} alt="Avatar" className=" w-12 h-12 rounded-full mr-4 flex items-center hover:cursor-pointer" />
                    </div>
                    {/* <FaEllipsisH className="w-5 h-5  text-green-800 mr-1 ml-1" /> */}
                </div>

                <div className=" select-none flex flex-col gap-2 flex-1">
                    <div className=" text-green-800 font-semibold">{post_info.publisher}</div>
                    <div className="mb-4 mr-2 ml-2 min-h-[5rem]">
                        <p>{post_info.content}</p>
                    </div>
                </div>


            </div>

            <div className="flex flex-[0_1_20%] items-center justify-between mr-2 ml-2 ">
                <div className="flex flex-1 justify-between items-center gap-2">
                    <div className=" flex gap-4 ">
                        <button onClick={()=>handleLike()} className={`flex items-center mr-4 text-green-${HColor} hover:text-green-900`}>
                            <FaHeart className="w-5 h-5 mr-2" />
                            <span>{likes}</span>
                        </button>
                        <button onClick={()=>handleComment(!isCommenting)} className="flex items-center text-green-600 hover:text-green-900">
                            <FaComment className="w-5 h-5 mr-2" />
                            {/* <span>{comment_n}</span> */}
                        </button>
                        {
                            ! isReg && 
                            <button onClick={()=>handleSave()} className={`flex items-center mr-4 text-green-600 hover:text-green-900`}>
                                <FaShare className="w-5 h-5 mr-2" />
                            </button>
                            
                        }

                    </div>
                    <div className=" flex flex-1 justify-end">
                        <button onClick={()=>setIsOpenResponse(!isOpenResponse)} className="flex items-center px-3 rounded-lg text-neutral-50 font-semibold bg-green-600 hover:bg-green-900">
                            Respond
                        </button>

                    </div>
                </div>
                
            </div>

            {
                isOpenResponse ?
                <div>
                    <textarea
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    className="
                        w-full
                        rounded-md
                        border-gray-300
                        focus:outline-none
                        focus:ring
                        focus:ring-green-800
                        py-2
                        px-4
                        
                    "
                    placeholder="Write a comment..."
                    />
                    <div className=" flex justify-end px-4">
                        <button
                            onClick={handleResponse}
                            className="text-neutral-50 font-semibold bg-green-600 hover:bg-green-900 px-3 rounded-lg"
                            >
                            Send
                        </button>
                    </div>
                </div>
                :
                <></>
            }

            {
                isCommenting ?
                <div className={"flex py-3"}>
                    <CommentSection comRerender={comRerender} post_id={post_info.post_id} />
                </div>
                : <></>
            }
            
        </div>
    )

}

export default PostDisplayCard