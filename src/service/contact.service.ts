import { Contact, User } from "@prisma/client";
import { ContactResponse, CreateContactRequest, SearchContactRequest, UpdateContactRequest, toContactResponse } from "../model/contact.model";
import { ContactValidation } from "../validation/contact.validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../config/db";
import { Pageable } from "../model/pagination";

export class ContactService {

    static async checkIfContactExist(username: string, id: number): Promise<Contact> {
        const contact = await prismaClient.contact.findFirstOrThrow({
            where: {
                username,
                id
            }
        })

        return contact
    }

    static async createContact(user: User,request: CreateContactRequest): Promise<ContactResponse>{
        const contactRequestCreate = Validation.validate(ContactValidation.Create, request)

        const contact = await prismaClient.contact.create({
            data: {
                username: user.username,
                ...contactRequestCreate
            }
        })

        return toContactResponse(contact)
    }

    static async getContact(user: User, id: number): Promise<ContactResponse> {
        const contact = await this.checkIfContactExist(user.username, id)

        return toContactResponse(contact)
    }

    static async updateContact(user: User,  request: UpdateContactRequest): Promise<ContactResponse> {
        const updateRequest = Validation.validate(ContactValidation.Update, request);
        await this.checkIfContactExist(user.username, updateRequest.id);

        const contact = await prismaClient.contact.update({
            where: {
                id: updateRequest.id,
                username: user.username
            },
            data: updateRequest
        });

        return toContactResponse(contact);
    }

    static async removeContact(user: User, id: number) : Promise<ContactResponse> {
        await this.checkIfContactExist(user.username, id);

        const contact = await prismaClient.contact.delete({
            where: {
                id: id,
                username: user.username
            }
        });

        return toContactResponse(contact);
    }

    static async searchContact(user: User, request: SearchContactRequest) : Promise<Pageable<ContactResponse>> {
        const searchRequest = Validation.validate(ContactValidation.Search, request);
        const skip = (searchRequest.page - 1) * searchRequest.size;

        const filters = [];
        
        if(searchRequest.name){
            filters.push({
                OR: [
                    {
                        first_name: {
                            contains: searchRequest.name
                        }
                    },
                    {
                        last_name: {
                            contains: searchRequest.name
                        }
                    }
                ]
            })
        }
        
        if(searchRequest.email){
            filters.push({
                email: {
                    contains: searchRequest.email
                }
            })
        }
        
        if(searchRequest.phone){
            filters.push({
                phone: {
                    contains: searchRequest.phone
                }
            })
        }

        const contacts = await prismaClient.contact.findMany({
            where: {
                username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });

        const total = await prismaClient.contact.count({
            where: {
                username: user.username,
                AND: filters
            },
        })

        return {
            data: contacts.map(contact => toContactResponse(contact)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size
            }
        }
    }
}