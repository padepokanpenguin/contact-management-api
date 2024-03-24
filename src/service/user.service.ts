import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid"
import { ResponseError } from "../abstraction/response.error";
import { prismaClient } from "../config/db";
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest, UserResponse, toUserResponse } from "../model/user.model";
import { UserValidation } from "../validation/user.validation";
import { Validation } from "../validation/validation";
import { User } from '@prisma/client';

export class UserService {
    static async register(request: CreateUserRequest): Promise<UserResponse> {
        const registerUser = Validation.validate(UserValidation.Register, request)

        const totalUserWithSameUserName = await prismaClient.user.count({
            where: {
                username: registerUser.username
            }
        })

        if (totalUserWithSameUserName > 0) {
            throw new ResponseError(400, "Username was already exists")
        }
        
        registerUser.password = await bcrypt.hash(registerUser.password, 10)

        const user = await prismaClient.user.create({
            data: registerUser
        })

        return toUserResponse(user)
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        const loginUser = Validation.validate(UserValidation.Login, request)

        let user = await prismaClient.user.findUnique({
            where: {
                username: loginUser.username
            }
        })

        if (!user) {
            throw new ResponseError(401, "Username or password is wrong")
        }

        const isPasswordValid = await bcrypt.compare(loginUser.password, user.password)

        if (!isPasswordValid) {
            throw new ResponseError(401, "Username or password is wrong")
        }

        user = await prismaClient.user.update({
            where: {
                username: loginUser.username
            },
            data: {
                token: uuid()
            }
        })

        const response = toUserResponse(user)
        response.token = user.token!

        return response
    }

    static async getUser(user: User): Promise<UserResponse> {
        return toUserResponse(user)
    }

    static async updateUser(user: User, request: UpdateUserRequest): Promise<UserResponse>{
        const updateUser = Validation.validate(UserValidation.Update, request)
        
        if (updateUser.name) {
            user.name = updateUser.name
        }

        if (updateUser.password) {
            user.password = await bcrypt.hash(updateUser.password, 10)
        }

        const result = await prismaClient.user.update({
            where: {
                username: user.username
            },
            data: user
        })

        return toUserResponse(result)
    }

    static async logout(user: User): Promise<UserResponse> {
        const result = await prismaClient.user.update({
            where: {
                username: user.username
            },
            data: {
                token: null
            }
        })

        return toUserResponse(result)
    }
}