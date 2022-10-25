import {CommonRoutesConfig} from '../common/common.routes.config';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import bodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import {body} from 'express-validator';
import express from 'express';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/users`)
            .get(UsersController.listUsers)
            .post(
                body('email').isEmail(),
                body('password').isLength({min: 5}).withMessage('Password minimum length is 5 characters'),
                UsersMiddleware.validateSameEmailDoesntExist,
                UsersController.createUser
            );

        this.app.param(`userId`, UsersMiddleware.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(UsersMiddleware.validateUserExists)
            .get(UsersController.getUserById)
            .delete(UsersController.removeUser);

        this.app.put(`/users/:userId`, [
            body('email').isEmail(),
            body('password').isLength({min: 5}).withMessage('Password min length is 5 characters'),
            body('firstName').isString(),
            body('lastName').isString(),
            body('permissionFlags').isInt(),
            UsersMiddleware.validateSameEmailBelongToSameUser,
            UsersController.put,
        ]);

        this.app.patch(`/users/:userId`, [
            body('email').isEmail().optional(),
            body('password').isLength({min: 5}).withMessage('Password min length is 5 characters').optional(),
            body('lastName').isString().optional(),
            body('firstName').isString().optional(),
            body('permissionFlags').isInt().optional(),
            bodyValidationMiddleware.verifyBodyFieldErrors,
            UsersMiddleware.validatePatchEmail,
            UsersController.patch,
        ]);

        return this.app;
    }

}