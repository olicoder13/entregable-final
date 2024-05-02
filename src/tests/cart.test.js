require('../models');
const request = require('supertest')
const app = require('../app');
const Product = require('../models/Product');
const { post } = require('../routes');

const URL_BASE = '/api/v1/cart';

let TOKEN;
let userId;
let productBody;
let product;
let cart;
let cartId;

beforeAll(async () =>{
    const user = {
        email: 'yoneison@gmail.com',
        password: 'yoneison1234'
    }

    
    const res = await request(app)
        .post('/api/v1/users/login')
        .send(user)

        TOKEN = res.body.token;
        userId = res.body.user.id

    productBody = {
        title: 'Iphone',
        description: 'iphonne description',
        price: 3.35
    }

    product = await Product.create(productBody)
})

test("POST 'URL_BASE', should return status code 201, and res.body.quantity === cart.quantity", async () =>{
    cart = {
        quantity:5,
        productId:product.id
    }

    const res = await request(app)
    .post(URL_BASE)
    .send(cart)
    .set('Authorization', `Bearer ${TOKEN}` )

    cartId = res.body.id;
    //console.log(res.body);

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cart.quantity)

    
})

test("GET 'URL_BASE', should return status code 200, and res.body.length === 1", async () =>{

    const res = await request(app)
    .get(URL_BASE)
    .set('Authorization', `Bearer ${TOKEN}` )

    //console.log(res.body);

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    
})


test("GET 'URL_BASE/:id', should return status code 200, and res.body.quantity === cart.quantity", async () =>{

    const res = await request(app)
    .get(`${URL_BASE}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}` )

    //console.log(res.body);

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cart.quantity)

    
})

test("PUT 'URL_BASE/:id', should return status code 200, and res.body.quantity === bodyUpdate.quantity", async () =>{
    const bodyUpdate = {
        quantity: 6
    }

    const res = await request(app)
    .put(`${URL_BASE}/${cartId}`)
    .send(bodyUpdate)
    .set('Authorization', `Bearer ${TOKEN}` )

    //console.log(res.body);

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(bodyUpdate.quantity)

    
})

test("DELETE 'URL_BASE/:id', should return status code 204", async()=>{
    const res = await request(app)
    .delete(`${URL_BASE}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}` )

    expect(res.status).toBe(204)
    await product.destroy()
})
