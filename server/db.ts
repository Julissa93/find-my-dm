import {createConnection, Connection} from "typeorm";
import Game from "./entities/Game";
import User from "./entities/User";
import Tag from "./entities/Tag";

const connect = async () => {
    const connection = await createConnection({
        type: "postgres",
        url:"root:julissa@localhost:5432/findmydm",
        entities: [Game, User]
    });
    return connection;
}

export default connect;