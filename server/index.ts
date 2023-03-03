import { USER_EVENT } from "./events/index";
import { Server } from "socket.io";

const io = new Server({ cors: { origin: "*" } });

io.on("connection", (socket) => {
    socket.on(USER_EVENT.RequestJoin, (username: string) => {
        // TODO: Save user to database??
        socket.emit(USER_EVENT.UserJoined, username);
    });
});

io.listen(3000);
