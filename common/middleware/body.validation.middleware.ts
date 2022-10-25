import express from 'express';
import { validationResult } from 'express-validator';


class BodyValidationMiddleware {
    verifyBodyFieldErrors(req: express.Request, res: any, next: express.NextFunction) {
        const errors = validationResult(req);

        if(!errors.isEmpty) {

            return res.status(400).send({ errors: errors.array() });
        }

    }
}

export default new BodyValidationMiddleware();