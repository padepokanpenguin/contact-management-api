import { NextFunction, Request, Response } from "express";
import { CreateUserRequest, LoginUserRequest, UpdateUserRequest } from "../model/user.model";
import { UserService } from "../service/user.service";
import { UserRequest } from "../type/user-request";

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUserRequest = req.body;
            const response = await UserService.register(request)

            res.status(200).json({
                data: response
            });

        } catch (error) {
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body;
            const response = await UserService.login(request)

            res.status(200).json({
                data: response
            });
            
        } catch (error) {
            next(error)
        }
    }

    static async getUser(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.getUser(req.user!)

            res.status(200).json({
                data: response
            });
            
        } catch (error) {
            next(error)
        }
    }

    static async updateUser(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: UpdateUserRequest = req.body as UpdateUserRequest
            
            const response = await UserService.updateUser(req.user!, request)

            res.status(200).json({
                data: response
            });
            
        } catch (error) {
            next(error)
        }
    }

    static async logout(req: UserRequest, res: Response, next: NextFunction) {
        try {
            await UserService.logout(req.user!)

            res.status(200).json({
                data: "OK"
            });
            
        } catch (error) {
            next(error)
        }
    }
}