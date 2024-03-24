import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateContactRequest, SearchContactRequest, UpdateContactRequest } from "../model/contact.model";
import { ContactService } from "../service/contact.service";

export class ContactController {
    static async createContact(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateContactRequest = req.body as CreateContactRequest;

            const response = await ContactService.createContact(req.user!, request)

            res.status(200).json({
                data: response
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async getContact(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contactId = Number(req.params.contactId)

            const response = await ContactService.getContact(req.user!, contactId)

            res.status(200).json({
                data: response
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async updateContact(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contactId = Number(req.params.contactId)
            const request: UpdateContactRequest = req.body as UpdateContactRequest;
            request.id = contactId

            const response = await ContactService.updateContact(req.user!, request)

            res.status(200).json({
                data: response
            })
            
        } catch (error) {
            next(error)
        }
    }

    static async removeContact(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const contacId = Number(req.params.contactId);
            
            await ContactService.removeContact(req.user!, contacId);
            
            res.status(200).json({
                data: "OK"
            });
        } catch (e) {
            next(e);
        }
    }

    static async searchContact(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: SearchContactRequest = {
                name: req.query.name as string,
                phone: req.query.phone as string,
                email: req.query.email as string,
                page: req.query.page ? Number(req.query.page) : 1,
                size: req.query.size ? Number(req.query.size) : 10
            }

            const response = await ContactService.searchContact(req.user!, request)

            res.status(200).json({
                data: response
            })
            
        } catch (error) {
            next(error)
        }
    }
}