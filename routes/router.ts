import { Router, Request, Response } from 'express';
import Server from '../classes/server';

const router = Router();

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo bien'
    });
});

router.post('/mensajes', (req: Request, res: Response) => {
    const server = Server.instance;

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = { cuerpo, de };

    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        mensaje: 'Post - Listo',
        objeto: {
            cuerpo,
            de
        }
    });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
    const server = Server.instance;

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    const payload = {
        de,
        cuerpo
    };

    // server.io.in(id).emit('mensaje-privado', payload);
    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        mensaje: 'Post - Listo',
        objeto: {
            cuerpo,
            de,
            id
        }
    });
});

export default router;