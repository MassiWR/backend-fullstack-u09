import {CommonRoutesConfig} from '../common/common.routes.config';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import bodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import {body} from 'express-validator';
import express from 'express';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import { PermissionFlag } from '../common/middleware/common.permissionFlag.enum';
import commonPermissionMiddleware from '../common/middleware/common.permission.middleware';
import usersMiddleware from './middleware/users.middleware';




export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
        console.log("UserRoutes constructor called");
        
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/users`)
            .get(jwtMiddleware.validJWTneeded, commonPermissionMiddleware.permissionFlagRequired(PermissionFlag.ADMIN_PERMISSION),
                UsersController.listUsers)
            .post(
                body('email').isEmail().withMessage('The given email is not valid, please enter a valid email'),
                body('password').isLength({min: 5}).withMessage('Password minimum length must 5 characters long'),
                bodyValidationMiddleware.verifyBodyFieldsErrors,
                UsersMiddleware.validateSameEmailDoesntExist,
                UsersController.createUser
            );

        this.app.param(`userId`, UsersMiddleware.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(usersMiddleware.validateUserExists, jwtMiddleware.validJWTneeded, commonPermissionMiddleware.onlySameUserOrAdminCanDoThisAction)
            .get(UsersController.getUserById)
            .delete(UsersController.removeUser);

        this.app.put(`/users/:userId`, [
            body('email').isEmail().withMessage('The given email is not valid, please enter a valid email'),
            body('password').isLength({min: 5}).withMessage('Password minimum length must 5 characters long'),
            body('firstName').isString(),
            body('lastName').isString(),
            body('permissionFlags').isInt(),
            bodyValidationMiddleware.verifyBodyFieldsErrors,
            UsersMiddleware.validateSameEmailBelongToSameUser,
            UsersController.put,
        ]);

        this.app.patch(`/users/:userId`, [
            body('email').isEmail().optional().withMessage('The given email is not valid, please try again'),
            body('password').isLength({min: 5}).withMessage('Password minimum length must 5 characters long').optional(),
            body('lastName').isString().optional().withMessage('Firstname must be a string'),
            body('firstName').isString().optional().withMessage('Lastname must be a string'),
            body('permissionFlags').isInt().optional(),
            bodyValidationMiddleware.verifyBodyFieldsErrors,
            UsersMiddleware.validatePatchEmail,
            UsersController.patch,
        ]);

        return this.app;
    }

}