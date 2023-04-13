import { User } from "../src/models/user"
import { Tags } from "../src/models/tags"
import { Session } from "../src/models/sessions"
import * as Type from "../src/models/types"

let testEmail = "test@test.tst"

let user = new User()
let tags = new Tags()
let session = new Session()
test("Test login add user session ", async ()=>{
    user.removeUser(testEmail)
    expect((await user.register(testEmail,"test")).status).toBe(100);

    let {id} = (await user.getUser(testEmail)).content as {
        id:number
    }

    expect((await session.getSession(id)).status).toBe(201);
    expect((await user.login(testEmail,"test")).status).toBe(100);
    expect((await user.login(testEmail,"test")).status).toBe(405);
    expect((await session.getSession(id)).status).toBe(100);
    // Testing logout require manipulation http only cookies
    // expect((await user.logout(id)).status).toBe(100);
    // expect((await session.getSession(id)).status).toBe(201);
    expect((await user.removeUser(testEmail)).status).toBe(100);
})


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
    session.close()
    done()
})
