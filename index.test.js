
const app = require('./index')
const supertest = require('supertest')
const req = supertest(app)


describe("get userData",()=>{
    it("testing get request", async done=>{
        const res = await req.get("/get")
        var x = res.body;
        expect(res.status).toBe(200);
        for(var i of x){
            // expect(i).toHaveProperty("username");
            expect(i).toHaveProperty("password");
            expect(i).toHaveProperty("age");
        }
        // expect(x).toBe("hi")
        done()
    }),
    it("testing post request",async (done)=>{
        const res = await req.post("/insert")
            .send({
                username:"sample",
                password:"samplepassword",
                age:"19"
            })
        expect(res.status).toBe(200)
        expect(res.body.message).toBe("inserted successfully")
        done()
    })
})
