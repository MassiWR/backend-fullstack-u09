import express from 'express';
import debug from 'debug';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const log: debug.IDebugger = debug('app:auth-controller');

const jwtSecret: any = process.env.JWT_SECRET;
const tokenExpirationInSeconds: number = 36000;

class AuthController {

    
    async createJWT(req: express.Request, res: express.Response) {
        try {
            const refreshId = req.body.userId + jwtSecret;
            // create a secret key with crypto
            const salt = crypto.createSecretKey(crypto.randomBytes(16));
            // pass the secret key and generate an Hmac object
            const hash = crypto.createHmac('sha512', salt).update(refreshId).digest('base64');
            req.body.refreshKey = salt.export();
            const token = jwt.sign(req.body, jwtSecret, {
                expiresIn: tokenExpirationInSeconds,
            });

            return res.status(201).send({accessToken: token, refreshToken: hash});

        } catch (error) {
            log(`CreateJWT error: %0`, error);
            return res.status(500).send();
        }
    }
}

export default new AuthController();