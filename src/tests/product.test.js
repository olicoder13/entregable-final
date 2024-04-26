require('../models')
const request = require('supertest');
const app = require('../app');
const Category = require('../models/Category');

const  URL_BASE = '/api/v1/products';

let TOKEN;
let productId;
let category;
let product;


beforeAll(async () =>{
    const user = {
        email: 'yoneison@gmail.com',
        password: 'yoneison1234'
    }

    const res = await request(app)
        .post('/api/v1/users/login')
        .send(user)

        TOKEN = res.body.token;

    category = await Category.create({
        name: 'carnes'
    })


})

test("POST 'URL_BASE', should return status code 200 and res.body.title === product.title", async () =>{
        product = {
        title: 'pollo',
        description: 'es un tipo de carne de ave',
        price: 12.4,
        categoryId: category.id
    }

    const res = await request(app)
        .post(URL_BASE)
        .send(product)
        .set('Authorization', `Bearer ${TOKEN}`)

        productId = res.body.id;

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)

})

test("GET 'URL_BASE', should return status code 200 and res.body.length === 1", async () =>{
    const res = await request(app)
        .get(URL_BASE)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    
})

test("GET 'URL_BASE/:id', should return status code 200 and res.body.title === product.title", async () =>{
    const res = await request(app)
        .get(`${URL_BASE}/${productId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)


    
})

test("PUT 'URL_BASE/:id', should return status code 200 and res.body.title === bodyUpdate.title", async () =>{
    const bodyUpdate = {
        title: 'pescado'
    }

    const res = await request(app)
        .put(`${URL_BASE}/${productId}`)
        .send(bodyUpdate)
        .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(bodyUpdate.title)

    
})

test("DELETE 'URL_BASE/:id', should return status code 204", async () =>{
    const res = await request(app)
        .delete(`${URL_BASE}/${productId}`)
        .set('Authorization', `Bearer ${TOKEN}`)
    expect(res.status).toBe(204)

    await category.destroy(); //!esto siempre debe estar al ultimo
})