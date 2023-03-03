import { SocketServerMock } from "socket.io-mock-ts";
import { describe, expect, it } from "vitest";

describe("sockets", () => {
    it("emits and handles a message", () => {
        const socket = new SocketServerMock();

        socket.on("message", (message: string) => {
            expect(message).toBe("Hello World!");
        });

        socket.clientMock.emit("message", "Hello World!");
    });
});
