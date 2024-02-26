import {IGetUsersController, IGetUsersRepository} from "./protocols";

export class GetUsersController implements IGetUsersController{
    constructor(private readonly getUsersRepository: IGetUsersRepository) {
    }

   // @ts-ignore
    async handle() {
        try {
            const users = await this.getUsersRepository.getUsers();

            return {
                statusCode: 200,
                body: users
            }
        }catch (e) {
            return {
                statusCode: 500,
                body: e
            }
        }
    }
}