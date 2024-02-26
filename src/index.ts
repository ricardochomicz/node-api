import express from 'express';
import 'dotenv/config.js';
import {GetUsersController} from "./controllers/get-users/users";
import {MongoGetUsersRepository} from "./repositories/get-users/mongo-get-users";
import {MongoClient} from "./database/mongo";

const main = async (): Promise<void> => {
    const app = express()

    await MongoClient.connect()

    app.get("/users", async (req, res) => {
        const mongoGetUsersRepository = new MongoGetUsersRepository();

        const getUsersController = new GetUsersController(mongoGetUsersRepository);

        const {body, statusCode} = await getUsersController.handle();
        res.send(body).status(statusCode)
    })

    const port = process.env.PORT || 8001;

    app.listen(port, () => console.log(`listening on port ${port}`));
}

main();

