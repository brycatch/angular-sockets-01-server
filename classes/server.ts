import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

export default class Server {

    private static _instance: Server;
    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
    }

    start(callback: Function) {
        this.httpServer.listen(this.port, callback());
    }

    private escucharSockets() {
        console.log('Escuchando sockets');

        this.io.on('connection', (client) => {

            // Conectar cliente
            socket.conectarCliente(client, this.io);

            // Usuario
            socket.configurarUsuario(client, this.io);

            // Emitir usuarios activos
            socket.obtenerUsuarios(client, this.io);

            // Mensajes
            socket.mensaje(client, this.io);

            // Desconectar
            socket.desconectar(client, this.io);
        });
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }
}