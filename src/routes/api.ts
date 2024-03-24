import express from "express"
import { authMiddleware } from "../middleware/auth-middleware"
import { UserController } from "../controller/user.controller"
import { ContactController } from "../controller/contact.controller"
import { AddressControler } from "../controller/address.controller"

export const apiRouter = express.Router()
apiRouter.use(authMiddleware)
// User API
apiRouter.get('/api/users/current', UserController.getUser)
apiRouter.patch('/api/users/current', UserController.updateUser)
apiRouter.delete('/api/users/current', UserController.logout)

// Contact API
apiRouter.post('/api/contacts', ContactController.createContact)
apiRouter.get('/api/contacts/:contactId(\\d+)', ContactController.getContact)
apiRouter.put('/api/contacts/:contactId(\\d+)', ContactController.updateContact)
apiRouter.delete('/api/contacts/:contactId(\\d+)', ContactController.removeContact)
apiRouter.get("/api/contacts", ContactController.searchContact);

// Address API
// Address API
apiRouter.post("/api/contacts/:contactId(\\d+)/addresses", AddressControler.createAddress);
apiRouter.get("/api/contacts/:contactId(\\d+)/addresses", AddressControler.listAdress);
apiRouter.get("/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)", AddressControler.getAddress);
apiRouter.put("/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)", AddressControler.updateAdress);
apiRouter.delete("/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)", AddressControler.removeAdress);
