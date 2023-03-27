import { User } from "../src/models/user"
import { StatusTypes } from "../src/models/types"
import { Tags } from "../src/models/tags"
import * as Type from "../src/models/types"

let testEmail = "test@test.tst"

let user = new User()
let tags = new Tags()
// test("Test login add user session", async ()=>{
//     expect((await user.register(testEmail,"test")).status).toBe(StatusTypes[100]);
//     expect((await user.getUser(testEmail)).status).toBe(StatusTypes[100]);
//     expect((await user.removeUser(testEmail)).status).toBe(StatusTypes[100]);
// })

// test("Test logout remove user session", async ()=>{
//     expect((await user.register(testEmail,"test")).status).toBe(StatusTypes[100]);
//     expect((await user.login(testEmail,"test")).status).toBe(StatusTypes[100]);
//     expect((await user.logout()).status).toBe(StatusTypes[100]);
        
//     expect((await user.removeUser(testEmail)).status).toBe(StatusTypes[100]);
// })

test("Test Register", async ()=>{
    await user.removeUser(testEmail)
    expect((await user.register(testEmail,"test")).status).toBe(100);
    expect((await user.register(testEmail,"test")).status).toBe(200);

    let {id} = (await user.getUser(testEmail)).content as {
        id:number
    }

    expect((await tags.getTagById(id,Type.TagTypes.USER)).status).toBe(100);
    expect((await user.removeUser(testEmail)).status).toBe(100);
   
})

beforeAll(done => {
    done()
})
  
afterAll(done => {
    tags.close()
    user.close()
    done()
})
