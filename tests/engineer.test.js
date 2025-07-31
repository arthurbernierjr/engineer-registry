const request = require("supertest")
const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")
const app = require("../app.js")
const Engineer = require("../models/engineer.js")

const server = app.listen(8081, () => {
  console.log("Testing engineer routes on port 8081")
})
let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
  await mongoose.connection.close()
  await mongoServer.stop()
  server.close()
})

describe("Test the engineers endpoints", () => {
  test("It should create a new engineer", async () => {
    const response = await request(app).post("/engineers").send({
      name: "Alice Smith",
      specialty: "Software",
      yearsExperience: 5,
      available: true,
    })
    expect(response.statusCode).toBe(302) // redirect
    const engineers = await Engineer.find({})
    expect(engineers.length).toBe(1)
    expect(engineers[0].name).toBe("Alice Smith")
  })
  test('should get all engineers in the index page', async () => {
      // Create some engineers for the user
      const engineer1 = new Engineer({
        name: 'Apple',
        specialty: 'Red',
        yearsExperience:5,
        available: true,
      })
      const engineer2 = new Engineer({
        name: 'Banana',
        specialty: 'Yellow',
        yearsExperience:4,
        available: false,
      })
      await engineer1.save()
      await engineer2.save()

      // Add engineers to user

      const response = await request(app)
        .get('/engineers')
        .expect(200)

      expect(Array.isArray(response.body)).toBe(true)
      expect(response.body).toHaveLength(3)
      expect(response.body[0]).toHaveProperty('name')
      expect(response.body[0]).toHaveProperty('specialty')
      expect(response.body[0]).toHaveProperty('yearsExperience')
    })
  
    test("It should update an engineer", async () => {
    const engineer = await Engineer.create({
      name: "Charlie Brown",
      specialty: "Electrical",
      yearsExperience: 3,
      available: true,
    })
    const response = await request(app)
      .put(`/engineers/${engineer._id}?_method=PUT`)
      .send({
        name: "Charlie Updated",
        specialty: "Electrical",
        yearsExperience: 4,
        available: "on",
      })
    expect(response.statusCode).toBe(302) // redirect
    const updated = await Engineer.findById(engineer._id)
    expect(updated.name).toBe("Charlie Updated")
    expect(updated.yearsExperience).toBe(4)
  })
  
  test("It should delete an engineer", async () => {
    const engineer = await Engineer.create({
      name: "Dana Williams",
      specialty: "Mechanical",
      yearsExperience: 8,
      available: true,
    })
    const response = await request(app)
      .delete(`/engineers/${engineer._id}?_method=DELETE`)
      .send()
    expect(response.statusCode).toBe(302) // redirect
    const deleted = await Engineer.findById(engineer._id)
    expect(deleted).toBeNull()
  })
})
