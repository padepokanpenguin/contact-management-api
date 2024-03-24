import supertest from "supertest"
import bcrypt from "bcrypt"
import {app} from "../src/config/app"
import { logger } from "../src/config/logging"
import { UserTest } from "./utils.test"

describe('POST /api/users', () => {

    afterEach(async () => {
        await UserTest.delete()
    })

    it('Should  reject register new user if request user is invalid', async () => {
        const response = await supertest(app)
            .post("/api/users")
            .send({
                username: "",
                name: "",
                password: ""
            })

            logger.debug(response.body)
            expect(response.status).toBe(400)
            expect(response.body.errors).toBeDefined()
    })

    it('should register new user', async () => {
        const response = await supertest(app)
            .post("/api/users")
            .send({
                username: 'test',
                name: "test",
                password: "test"
            })

            logger.debug(response.body)
            expect(response.status).toBe(200)
            expect(response.body.data.name).toBe("test")
            expect(response.body.data.username).toBe("test")
    })
})

describe('POST /api/users/login', async () => {
    beforeEach(async() => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('Should be able to login', async () => {
        const response = await supertest(app)
            .post('/api/users/login')
            .send({
                username: 'test',
                password: 'test'
            })

            logger.debug(response.body)
            expect(response.status).toBe(200)
            expect(response.body.data.name).toBe("test")
            expect(response.body.data.username).toBe("test")
            expect(response.body.token).toBeDefined()
    })

    it('Should reject login user if username is wrong', async () => {
        const response = await supertest(app)
            .post('/api/users/login')
            .send({
                username: 'wrong',
                password: 'test'
            })

            logger.debug(response.body)
            expect(response.status).toBe(401)
            expect(response.body.errors).toBeDefined()
    })

    it('Should reject login user if password is wrong', async () => {
        const response = await supertest(app)
            .post('/api/users/login')
            .send({
                username: 'test',
                password: 'wrong'
            })

            logger.debug(response.body)
            expect(response.status).toBe(401)
            expect(response.body.errors).toBeDefined()
    })
})

describe('GET /api/users/current', async () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be able to get user', async () => {
        const response = await supertest(app)
            .get('/api/users/current')
            .set("X-API-TOKEN", "test")

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe("test")
        expect(response.body.data.username).toBe("test")
    })

    it('should reject if token is invalid', async () => {
        const response = await supertest(app)
            .get('/api/users/current')
            .set("X-API-TOKEN", "salah")

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })
})

describe('PATCH /api/users/current', async () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be able to update user', async () => {
        const response = await supertest(app)
            .patch('/api/users/current')
            .set("X-API-TOKEN", "test")
            .send({
                name: 'test 1',
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe("test")
        expect(response.body.data.username).toBe("test")
    })

    it('should reject update user if request is invalid', async () => {
        const response = await supertest(app)
            .patch('/api/users/current')
            .set("X-API-TOKEN", "test")
            .send({
                name: "",
                password: ""
            })

        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })

    it('should reject if token is invalid', async () => {
        const response = await supertest(app)
            .get('/api/users/current')
            .set("X-API-TOKEN", "salah")
            .send({
                name: "benar",
                password: "benar"
            })

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })

    it('should be able to update user name ', async () => {
        const response = await supertest(app)
            .get('/api/users/current')
            .set("X-API-TOKEN", "test")
            .send({
                name: "benar",
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.name).toBe('benar')
    })

    it('should be able to update user password ', async () => {
        const response = await supertest(app)
            .get('/api/users/current')
            .set("X-API-TOKEN", "test")
            .send({
                name: "benar",
            })

        logger.debug(response.body)
        expect(response.status).toBe(200)
        const user = await UserTest.get()


        expect(await bcrypt.compare('benar', user.password)).toBe(true)
    })
})


describe('DELETE /api/users/current', async () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it('should be able to logout', async() => {
        const response = await supertest(app)
            .delete('/api/users/currents')
            .set('X-API-TOKEN', 'test')

        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("OK")

        const user = await UserTest.get()
        expect(user.token).toBeNull()
    })

    it('should be able to logout', async() => {
        const response = await supertest(app)
            .delete('/api/users/currents')
            .set('X-API-TOKEN', 'salah')

        logger.debug(response.body)
        expect(response.status).toBe(401)
        expect(response.body.errors).toBeDefined()
    })
})