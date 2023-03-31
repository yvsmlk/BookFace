import { User } from "../src/models/user"
import { Tags } from "../src/models/tags"
import { Post } from "../src/models/posts"
import { Comment } from "../src/models/comments"

import * as Type from "../src/models/types"

let testEmail = "test@test.tst"

let user = new User()
let tags = new Tags()
let post = new Post()
let comment = new Comment()

test("Test Post & Comment exist ", async ()=>{

    expect((await post.add(-1,"simple post")).status).toBe(201);
    expect((await post.delete(-1)).status).toBe(201);

    user.removeUser(testEmail)
    user.register(testEmail,"test")
    let {id} = (await user.getUser(testEmail)).content as {
        id:number
    }
    
    expect((await comment.add(-1,-1,"simple comment",-1)).status).toBe(201);
    expect((await comment.add(id,-1,"simple comment",-1)).status).toBe(201);

    expect((await comment.delete(-1)).status).toBe(201);

    expect((await post.like(-1)).status).toBe(201);
    expect((await comment.like(-1)).status).toBe(201);
    user.removeUser(testEmail)
    
})


test("Test new Post  ", async ()=>{
    user.removeUser(testEmail)
    user.register(testEmail,"test")
    let {id} = (await user.getUser(testEmail)).content as {
        id:number
    }

    expect((await post.add(id,"simple post")).status).toBe(100);

    // get id of post made by user id

    let {post_id} = {post_id:0}

    expect((await comment.add(id,post_id,"simple comment")).status).toBe(100);

    let {com_id} = {com_id:0}

    expect((await comment.get(com_id)).status).toBe(100);
    expect((await comment.delete(com_id)).status).toBe(100);
    expect((await comment.delete(com_id)).status).toBe(201);

    expect((await post.get(post_id)).status).toBe(100);

    expect((await comment.add(id,post_id,"simple comment")).status).toBe(100);

    let {com2_id} = {com2_id:0}

    expect((await post.delete(post_id)).status).toBe(100);
    expect((await comment.get(com_id)).status).toBe(201);
    expect((await comment.delete(com_id)).status).toBe(201);

    expect((await post.delete(post_id)).status).toBe(201);
    user.removeUser(testEmail)

})


test("Test new Comment ", async ()=>{
    user.removeUser(testEmail)
    user.register(testEmail,"test")
    let {id} = (await user.getUser(testEmail)).content as {
        id:number
    }

    expect((await comment.add(id,id,"simple comment")).status).toBe(100);
    expect((await comment.get(id)).status).toBe(100);
    expect((await comment.delete(id)).status).toBe(100);
    expect((await comment.delete(id)).status).toBe(201);
    user.removeUser(testEmail)

})


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
        post.close()
        comment.close()
        done()
    }, 100);
})