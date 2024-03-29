import {User} from "../../models/User";
import {HttpRequest, HttpResponse} from "../protocols";
import {CreateUserParams, ICreateUserController, ICreateUserRepository} from "./protocols";
import validator from 'validator';

export class CreateUserController implements ICreateUserController {
    constructor(private createUserRepository: ICreateUserRepository) {
    }

    async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
        try {

            const requiredFields = ["firstName", "lastName", "email", "password"];

            for (const field of requiredFields) {
                if (!httpRequest?.body[field as keyof CreateUserParams]?.length) {
                    return {
                        statusCode: 400,
                        body: `Fields ${field} is required!`
                    }
                }
            }

            const emailIsValid = validator.isEmail(httpRequest.body.email);
            if(!emailIsValid){
                return {
                    statusCode: 400,
                    body: 'Email is invalid!'
                }
            }

            const user = await this.createUserRepository.createUser(httpRequest.body);
            return {
                statusCode: 201,
                body: user
            }

        } catch (e) {
            return {
                statusCode: 500,
                body: "Something went wrong"
            }
        }
    }
}