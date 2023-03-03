import { Server } from "socket.io";
import express, { json, urlencoded } from "express";
import cors from "cors";
import { getActiveTodos } from "./services/todo.service";
import { setupSockets } from "./sockets";
import { prisma } from "./prisma";

const io = new Server({ cors: { origin: "*" } });
const app = express();

export class Application {
    constructor() {
        this.setupApplicationSettings();
        this.setupControllers();
        setupSockets(io);
    }

    setupApplicationSettings() {
        app.use(cors());
        app.use(urlencoded({ extended: false }));
        app.use(json());
    }

    listen() {
        prisma.$connect();
        const httpServer = app.listen(3000, () =>
            console.log("Listening on port 3000")
        );

        io.listen(httpServer);
    }

    setupControllers() {
        app.get("/api/todos", async (_req, res) => {
            const response = await getActiveTodos();

            res.send(response);
        });
    }
}

const application = new Application();

application.listen();
