import { server } from "./server";

const SERVER_PORT = 8080;  // process.env.SERVER_PORT

server.listen(SERVER_PORT, () => {

    console.log(SERVER_PORT, "Server is running...");
});