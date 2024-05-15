process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("./app.js");
let items = require("./fakeDb.js");


let item = { name: "cheerios", price: 3.45 };

beforeEach(function () {
    item = { name: "cheerios", price: 3.45 };
    items.push(item);
});

afterEach(function () {
    // make sure this *mutates*, not redefines, `items`
    items.length = 0;
});

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual( [item] );
    })
})

describe("POST /items", () => {
    test("Post a new item", async () => {
        const res = await request(app).post("/items").send({'name': 'bread', 'price': 4.5 });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual( {'added': {'name': 'bread', 'price': 4.5 }} );
    })
    test('Post an invalid item', async () => {
        const res = await request(app).post('/items').send({'name': 'milk'});
        expect(res.statusCode).toBe(400);
    })
})
 
describe('GET /items/:name', () => {
    test('Get an item', async () => {
        const res = await request(app).get('/items/cheerios');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual( item );
    })
    test('Get an invalid item', async () => {
        const res = await request(app).get('/items/bacon');
        expect(res.statusCode).toBe(404);
    })
})

describe('PATCH /items/:name', () => {
    test('Update an item', async () => {
        const res = await request(app).patch('/items/cheerios').send({'name': 'honey cheerios', 'price': 3.45});
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual( {'updated': {'name': 'honey cheerios', 'price': 3.45}} );
    })
    test('Update an invalid item', async () => {
        const res = await request(app).patch('/items/bacon').send({'name': 'canadian bacon'});
        expect(res.statusCode).toBe(404);
    })
})

describe('DELETE /items/:name', () => {
    test('Delete an item', async () => {

        const res = await request(app).delete('/items/cheerios');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual( {'message': 'Deleted'} );
    })
    test('Delete an invalid item', async () => {
        const res = await request(app).delete('/items/bacon');
        expect(res.statusCode).toBe(404);
    })
})
