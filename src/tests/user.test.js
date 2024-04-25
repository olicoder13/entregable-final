const request = require("supertest")
const app = require('../app')

const URL_BASE = '/api/v1/users'

let TOKEN;
let userId;

beforeAll( async () =>{
    const user = {
        email: 'yoneison@gmail.com',
        password: 'yoneison1234'
    }

    const res = await request(app)
        .post(`${URL_BASE}/login`)
        .send(user)
        TOKEN = res.body.token;
        //console.log(TOKEN);
})

test("GET 'URL_BASE', should return status code 200 and res.body.length === 1", async () =>{
    const res = await request(app)
        .get(URL_BASE)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("POST 'URL_BASE', should return status code 201 and res.body.firstName === user.firstName", async () =>{
    const user = {
        firstName: 'Alexis',
        lastName: 'Pena',
        email: 'alexis@gmail.com',
        password: 'alexis1234',
        phone: '1253343'
    }

    const res = await request(app)
        .post(URL_BASE)
        .send(user)

        userId = res.body.id;
    
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
})

test("PUT 'URL_BASE/:id', should return status code 200 and res.body.lastName === bodyUpdate.lastName", async () =>{
    /*let token;
{
    const user = {
        email: 'alexis@gmail.com',
        password: 'alexis1234'
    }

    const res = await request(app)
        .post(`${URL_BASE}/login`)
        .send(user)

        token = res.body.token;
}*/

const bodyUpdate = {
    lastName: 'Jonas'
}

const res = await request(app)
    .put(`${URL_BASE}/${userId}`)
    .send(bodyUpdate)
    .set('Authorization', `Bearer ${TOKEN}`)

expect(res.status).toBe(200)
expect(res.body).toBeDefined()
expect(res.body.lastName).toBe(bodyUpdate.lastName)
    
})

test("POST 'URL_BASE/login', should return status code 200 and res.body.user.email === user.email and res.body.token to be defined", async () =>{

    
    const user = {
        email: 'alexis@gmail.com',
        password: 'alexis1234'
    }

    const res = await request(app)
        .post(`${URL_BASE}/login`)
        .send(user)

    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.user.email).toBe(user.email)
    expect(res.body.token).toBeDefined()
})

 test("POST 'URL_BASE/login', should return status code 401", async () =>{
    const userInvalid = {
        email: 'alexis@gmail.com',
        password: 'Invalid password'
    }

    const res = await request(app)
        .post(`${URL_BASE}/login`)
        .send(userInvalid)

    expect(res.statusCode).toBe(401)
 })

test("DELETE 'URL_BASE/:id', should return status code 204", async () =>{
    const res = await request(app)
        .delete(`${URL_BASE}/${userId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
    
    expect(res.status).toBe(204)
})