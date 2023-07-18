import {IO} from "../socketServer";

export class SocketIo {
    private readonly io: IO;
    private static instance: SocketIo;

    private constructor(io: IO) {
        this.io = io;
    }

    public static getInstance(io?: IO) {
        if (!SocketIo.instance && io) {
            SocketIo.instance = new SocketIo(io);
        }
        return SocketIo.instance;
    }

    public getIo(): IO {
        return this.io;
    }
}

export function getIO() {
    return SocketIo.getInstance().getIo();
}
