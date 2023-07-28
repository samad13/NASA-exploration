const request = require('supertest')
const app = require('../../app')
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')


describe('Launches API', ()=> {
    beforeAll(async () => {
        await mongoConnect()
    });

    afterAll(async() =>{
        await mongoDisconnect()
    })

    describe('test GET/launches',() =>{
        test('it should respond with 200 success',async ()=>{
            const response = await request(app)
            .get('/v1/launches')
            .expect('Content-Type', /json/)
            .expect(200);
        });
    });
    
    describe('test POST/launch',() =>{
        const completeLaunchDetails = {
            mission: "USS Enterprise",
            rocket: "NCC 1701-D",
            target: "Kepler-62 f",
            launchDate: "january 8 2088",
        }
        const launchWithOutDate ={
            mission: "USS Enterprise",
            rocket: "NCC 1701-D",
            target: "Kepler-62 f",
            
        }
        const launchDetailsWithInvalidDate = {
            mission: "USS Enterprise",
            rocket: "NCC 1701-D",
            target: "Kepler-62 f",
            launchDate: "camel",
        };
        test('it should respond with 201 created', async()=>{
            const response = await request(app)
            .post('/v1/launches')
            .send(completeLaunchDetails)
            .expect('Content-Type', /json/)
            .expect(201);
    
            const requestDate = new Date (completeLaunchDetails.launchDate).valueOf();
            const responseDate = new Date (response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);
    
            expect(response.body).toMatchObject(launchWithOutDate)
        });
    
        test('it should catch missing required propeties', async ()=> {
        const response = await request(app)
            .post('/v1/launches')
            .send(launchWithOutDate)
            .expect('Content-Type', /json/)
            .expect(400);
            
            expect(response.body).toStrictEqual({
                error: "Missing required launch property"
            })
            
    })
    
        test('it should catch invalid date',async ()=>{
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDetailsWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);
            
            expect(response.body).toStrictEqual({
                error:"Invalid launch date"
            });
        });
    
        
    });
    
})



