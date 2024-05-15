process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("./app.js");
let items = require("./fakeDb.js");


let item = { name: "cheerios", price: 3.45 };

beforeEach(function () {
  items.push(item);
});

afterEach(function () {
  // make sure this *mutates*, not redefines, `items`
  items.length = 0;
});

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual( [item] )
  })
})
