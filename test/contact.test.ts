import supertest from "supertest"
import {app} from "../src/config/app"
import { ContactTest, UserTest } from "./utils.test"
import { logger } from "../src/config/logging"

describe('POST /api/contacts', async () => {
    beforeEach(async () => {
        await UserTest.create()
    })

    afterEach(async () => {
        await UserTest.delete()
    })

    it("should be create new contact", async () => {
        const response = await supertest(app)
            .post('/api/contacts')
            .set('X-API-TOKEN', 'test')
            .send({
                first_name: 'test',
                last_name: 'test_last_name',
                email: 'test@example.com',
                phone: '12345'
            })
        
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.first_name).toBe('test')
        expect(response.body.data.last_name).toBe('test_last_name')
        expect(response.body.data.email).toBe('test@example.com')
        expect(response.body.data.phone).toBe('12345')
    })

    it('should reject create new contact if data is invalid', async () => {
        const response = await supertest(app)
            .post('/api/contacts')
            .set('X-API-TOKEN', 'test')
            .send({
                first_name: '',
                last_name: '',
                email: 'test@example.com',
                phone: '12345'
            })
        
        logger.debug(response.body)
        expect(response.status).toBe(400)
        expect(response.body.data.errors).toBeDefined()
    })
})

describe('GET /api/contacts/:contactId', async () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await ContactTest.deleteAll()
        await UserTest.delete()
    })

    it('should be able to get contact', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(app)
            .get(`/api/contacts/${contact.id}`)
            .set('X-API-TOKEN', 'test')
        
        logger.debug(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.id).toBeDefined()
        expect(response.body.data.first_name).toBe(contact.first_name)
        expect(response.body.data.last_name).toBe(contact.last_name)
        expect(response.body.data.email).toBe(contact.email)
        expect(response.body.data.phone).toBe(contact.phone)
    })

    it('should reject to get contact if contact is not found', async () => {
        const contact = await ContactTest.get()
        const response = await supertest(app)
            .get(`/api/contacts/${contact.id + 1}`)
            .set('X-API-TOKEN', 'test')
        
        logger.debug(response.body)
        expect(response.status).toBe(404)
        expect(response.body.data.errors).toBeDefined()
    })

})

describe('PUT /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should be able to update contact', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(app)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", 'test')
            .send({
                first_name: "update test",
                last_name: "update test_lastname",
                email: "updatetest@example.com",
                phone: "9999"
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(contact.id);
        expect(response.body.data.first_name).toBe("update test");
        expect(response.body.data.last_name).toBe("khannedy");
        expect(response.body.data.email).toBe("update test_lastname");
        expect(response.body.data.phone).toBe("9999");
    });

    it('should reject update contact if request is invalid', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(app)
            .put(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", 'test')
            .send({
                first_name: "",
                last_name: "",
                email: "test",
                phone: ""
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });
});

describe('DELETE /api/contacts/:contactId', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should be able to remove contact', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(app)
            .delete(`/api/contacts/${contact.id}`)
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("OK");
    });

    it('should reject remove contact if contact is not found', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(app)
            .delete(`/api/contacts/${contact.id + 1}`)
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});

describe('GET /api/contacts', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create();
    });

    afterEach(async () => {
        await ContactTest.deleteAll();
        await UserTest.delete();
    });

    it('should be able to search contact', async () => {
        const response = await supertest(app)
            .get("/api/contacts")
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search contact using name', async () => {
        const response = await supertest(app)
            .get("/api/contacts")
            .query({
                name: "es"
            })
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search contact using email', async () => {
        const response = await supertest(app)
            .get("/api/contacts")
            .query({
                email: ".com"
            })
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search contact using phone', async () => {
        const response = await supertest(app)
            .get("/api/contacts")
            .query({
                phone: "99"
            })
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search contact no result', async () => {
        const response = await supertest(app)
            .get("/api/contacts")
            .query({
                name: "salah"
            })
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
        expect(response.body.paging.current_page).toBe(1);
        expect(response.body.paging.total_page).toBe(0);
        expect(response.body.paging.size).toBe(10);
    });

    it('should be able to search contact with paging', async () => {
        const response = await supertest(app)
            .get("/api/contacts")
            .query({
                page: 2,
                size: 1
            })
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(0);
        expect(response.body.paging.current_page).toBe(2);
        expect(response.body.paging.total_page).toBe(1);
        expect(response.body.paging.size).toBe(1);
    });
})