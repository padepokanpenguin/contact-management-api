import { Address, User } from "@prisma/client";
import { AddressResponse, CreateAddressRequest, GetAddressRequest, RemoveAddressRequest, UpdateAddressRequest, toAddressResponse } from "../model/address.model";
import { ContactService } from "./contact.service";
import { AddressValidation } from "../validation/address.validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../config/db";
import { ResponseError } from "../abstraction/response.error";

export class AddressService {

    static async checkAddressIfExist(contactId: number, addressId: number): Promise<Address> {
        const address = await prismaClient.address.findFirst({
            where: {
                id: addressId,
                contact_id: contactId
            }
        });

        if (!address) {
            throw new ResponseError(404, "Address is not found");
        }

        return address;
    }

    static async createAddress(user: User, request: CreateAddressRequest): Promise<AddressResponse> {
        const createRequest = Validation.validate(AddressValidation.Create, request);
        await ContactService.checkIfContactExist(user.username, request.contact_id);

        const address = await prismaClient.address.create({
            data: createRequest
        });

        return toAddressResponse(address);
    }

    static async getAdress(user: User, request: GetAddressRequest): Promise<AddressResponse> {
        const getRequest = Validation.validate(AddressValidation.Get, request);
        await ContactService.checkIfContactExist(user.username, request.contact_id);
        const address = await this.checkAddressIfExist(getRequest.contact_id, getRequest.id);

        return toAddressResponse(address);
    }

    static async updateAddress(user: User, request: UpdateAddressRequest): Promise<AddressResponse> {
        const updateRequest = Validation.validate(AddressValidation.Update, request);
        await ContactService.checkIfContactExist(user.username, request.contact_id);
        await this.checkAddressIfExist(updateRequest.contact_id, updateRequest.id);

        const address = await prismaClient.address.update({
            where: {
                id: updateRequest.id,
                contact_id: updateRequest.contact_id
            },
            data: updateRequest
        })

        return toAddressResponse(address);
    }

    static async removeAddress(user: User, request: RemoveAddressRequest): Promise<AddressResponse> {
        const removeRequest = Validation.validate(AddressValidation.Get, request);
        await ContactService.checkIfContactExist(user.username, request.contact_id);
        await this.checkAddressIfExist(removeRequest.contact_id, removeRequest.id);

        const address = await prismaClient.address.delete({
            where: {
                id: removeRequest.id
            }
        });

        return toAddressResponse(address);
    }

    static async listAddress(user: User, contactId: number): Promise<Array<AddressResponse>> {
        await ContactService.checkIfContactExist(user.username, contactId);

        const addresses = await prismaClient.address.findMany({
            where:{
                contact_id: contactId
            }
        });

        return addresses.map((address) => toAddressResponse(address));
    }
}