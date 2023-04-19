import { useEffect, useState } from "react"
import PostDisplayCard from "./PostDisplayCard"

enum FeedType {
    'PUBLIC',
    'GROUP',
    'USER'
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

const sample_posts = [
    {
        post_id:1,
        publisher: "@John",
        avatar: "https://randomuser.me/api/portraits/men/7.jpg",
        content:"just a simple test",
        media:0,
        likes:200,
        created_at:""
    }
    ,
    {
        post_id:1,
        publisher: "@Fred",
        avatar: "https://randomuser.me/api/portraits/men/8.jpg",
        content:"wow this card looks really good isn't it",
        media:0,
        likes:15,
        created_at:""
    }
]

const DEVELOP = "http://localhost:3535"
const PRODUCTION = "https://book-face-backend.vercel.app"


const fetchPost = async (type:FeedType,tag:string)=>{
    let URL_PUBLIC = `${DEVELOP}/posts/public`
    let URL_GROUP = `${DEVELOP}/posts/group?group_tag=${tag}`

    let option = {
        method: 'GET',
        credentials: "include" as RequestCredentials
    }
    
    return new Promise<PostType[]>(async (resolve, reject) => {
        let URL = type == FeedType.PUBLIC ? URL_PUBLIC : URL_GROUP
        let response = await fetch(URL,option)
        let data = await response.json() as ResponseMsg

        if (data.status == 100){
            resolve(data.content as PostType[])
            return
        }
        resolve([])

    })
}


const Feed = ( {type,tag,rerender_feed}:FeedProps)=>{

    let [posts,setPost] = useState<PostType[]>([])
    

    useEffect(()=>{
        fetchPost(FeedType.PUBLIC,"")
        .then(data=>{
            setPost(data)
        })
        .catch(err=>console.log(err))
        
    },[rerender_feed])

    return(
        <div className=" flex flex-col gap-4 mb-4 "> 
            {posts.map((post)=><PostDisplayCard key={post.post_id} post_info={post}></PostDisplayCard>)}
        </div>
    )

}

export default Feed