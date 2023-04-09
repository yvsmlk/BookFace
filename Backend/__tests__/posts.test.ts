import { User } from "../src/models/user"
import { Tags } from "../src/models/tags"
import { Post } from "../src/models/posts"
import { Comment } from "../src/models/comments"

import * as Type from "../src/models/types"
import { getTimeStamp } from "../src/utils/time"

let testEmail = "testpost@test.tst"

let user = new User()
let tags = new Tags()
let postObj = new Post()
let comment = new Comment()

test("Test Post & Comment exist ", async ()=>{

    expect((await postObj.add(-1,"simple post")).status).toBe(201);
    expect((await postObj.delete(-1)).status).toBe(201);

    await user.removeUser(testEmail)
    await user.register(testEmail,"test")
    let {id} = (await user.getUser(testEmail)).content as {
        id:number
    }
    
    // expect((await comment.add(-1,-1,"simple comment",-1)).status).toBe(201);
    // expect((await comment.add(id,-1,"simple comment",-1)).status).toBe(201);

    // expect((await comment.delete(-1)).status).toBe(201);

    // expect((await postObj.like(-1)).status).toBe(201);
    // expect((await comment.like(-1)).status).toBe(201);
    await user.removeUser(testEmail)
    
})


test("Test Post only  ", async ()=>{
    await user.removeUser(testEmail)
    await user.register(testEmail,"test")
    
    let res = await user.getUser(testEmail)
    let {id} = (res).content as { id:number }

    let timeStamp = getTimeStamp()

    expect((await postObj.add(id,"simple post",0,timeStamp)).status).toBe(100);

    let postRes = await postObj.getUser(id,timeStamp)
    let pst = postRes.content
    let {post} = pst as {post:{post_id:number }}

    expect((await postObj.get(post.post_id)).status).toBe(100);
    expect((await postObj.delete(post.post_id)).status).toBe(100);
    expect((await postObj.delete(post.post_id)).status).toBe(201);
    await user.removeUser(testEmail)

})

// test("Test Post + Comment ", async ()=>{
//     await user.removeUser(testEmail)
//     await user.register(testEmail,"test")
    
//     let res = await user.getUser(testEmail)
//     let {id} = (res).content as {id:number}

//     let timeStamp = getTimeStamp()

//     expect((await postObj.add(id,"simple post",0,timeStamp)).status).toBe(100);

//     let postRes = await postObj.getUser(id,timeStamp)
//     let pst = postRes.content
//     let {post} = pst as {post:{post_id:number}}
//     expect((await comment.add(id,post.post_id,"simple comment")).status).toBe(100);

//     let {com_id} = {com_id:0}

//     expect((await comment.get(com_id)).status).toBe(100);
//     expect((await comment.delete(com_id)).status).toBe(100);
//     expect((await comment.delete(com_id)).status).toBe(201);
//     expect((await postObj.get(post.post_id)).status).toBe(100);
//     expect((await comment.add(id,post.post_id,"simple comment")).status).toBe(100);

//     let {com2_id} = {com2_id:0}

//     expect((await postObj.delete(post.post_id)).status).toBe(100);
//     expect((await comment.get(com_id)).status).toBe(201);
//     expect((await comment.delete(com_id)).status).toBe(201);
//     expect((await postObj.delete(post.post_id)).status).toBe(201);
//     await user.removeUser(testEmail)

// })


beforeAll(done => {
    done()
})
  
afterAll(done => {

    /*
        Need the timeout otherwise we get the following error

        code: 'ER_NET_READ_INTERRUPTED',
        errno: 1159,
        sqlState: '08S01',
        sqlMessage: 'Got timeout reading communication packets',
        sql: undefined
    
    */
    setTimeout(() => {
        tags.close()
        user.close()
        postObj.close()
        comment.close()
        done()
    }, 200);
})