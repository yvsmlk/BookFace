import { useEffect, useState } from "react"
import PostDisplayCard from "./PostDisplayCard"

enum FeedType {
    'PUBLIC',
    'GROUP',
    'USER',
    'GROUP_ALL'

}

type ResponseMsg = {
    status: number,
    message: string,
    content: object | []
  }

type FeedProps ={
    rerender_feed:number;
    type:FeedType,
    tag:string
}

type PostType = {
    post_id:number
    publisher: string,
    avatar: string,
    content:string,
    media:number,
    likes:number,
    created_at:string
}

type CommentType = {
    id:number,
    user: string,
    content: string,
    responses: CommentResponseType[]
    created_at: string,
    likes:number
}

type CommentResponseType = {
    id:number,
    user: string,
    content: string,
    created_at: string,
    likes:number

}

const DEVELOP = "http://localhost:3535"
const PRODUCTION = "https://book-face-backend.vercel.app"


const fetchPost = async (type:FeedType,tag:string)=>{
    let URL_PUBLIC = `${PRODUCTION}/posts/public`
    let URL_GROUP = `${PRODUCTION}/posts/group?group_tag=${tag}`
    let URL_USER = `${PRODUCTION}/posts/registered`
    let URL_GROUP_ALL = `${PRODUCTION}/posts/group_all`

    let option = {
        method: 'GET',
        credentials: "include" as RequestCredentials
    }
    
    return new Promise<PostType[]>(async (resolve, reject) => {
        let URL = URL_PUBLIC

        switch (type) {
            case 0:
                URL = URL_PUBLIC
                break;
            case 1:
                URL = URL_GROUP
                break;
            case 2:
                URL = URL_USER
                break;
            case 3:
                URL = URL_GROUP_ALL
                break;

            default:
                break;
        }

        let response = await fetch(URL,option)
        let data = await response.json() as ResponseMsg

        if (data.status == 100){
            resolve(data.content as PostType[])
            return
        }
        resolve([])

    })
}


const Feed = ( {type,rerender_feed, isReg}:{type:number,rerender_feed:number,isReg:boolean})=>{

    let [posts,setPost] = useState<PostType[]>([])
    

    useEffect(()=>{
        fetchPost(type,"")
        .then(data=>{
            setPost(data)
        })
        .catch(err=>console.log(err))
        
    },[rerender_feed])

    return(
        <div className=" flex flex-col gap-4 mb-4"> 
            {posts.map((post)=><PostDisplayCard isReg={isReg} key={post.post_id} post_info={post}></PostDisplayCard>)}
        </div>
    )

}

export default Feed