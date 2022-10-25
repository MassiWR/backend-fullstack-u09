"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const users_controller_1 = __importDefault(require("./controllers/users.controller"));
const users_middleware_1 = __importDefault(require("./middleware/users.middleware"));
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/users`)
            .get(users_controller_1.default.listUsers)
            .post((0, express_validator_1.body)('email').isEmail().withMessage('The given email is not valid, please enter a valid email'), (0, express_validator_1.body)('password').isLength({ min: 5 }).withMessage('Password minimum length must 5 characters long'), body_validation_middleware_1.default.verifyBodyFieldsErrors, users_middleware_1.default.validateSameEmailDoesntExist, users_controller_1.default.createUser);
        this.app.param(`userId`, users_middleware_1.default.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(users_middleware_1.default.validateUserExists)
            .get(users_controller_1.default.getUserById)
            .delete(users_controller_1.default.removeUser);
        this.app.put(`/users/:userId`, [
            (0, express_validator_1.body)('email').isEmail().withMessage('The given email is not valid, please enter a valid email'),
            (0, express_validator_1.body)('password').isLength({ min: 5 }).withMessage('Password minimum length must 5 characters long'),
            (0, express_validator_1.body)('firstName').isString(),
            (0, express_validator_1.body)('lastName').isString(),
            (0, express_validator_1.body)('permissionFlags').isInt(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            users_middleware_1.default.validateSameEmailBelongToSameUser,
            users_controller_1.default.put,
        ]);
        this.app.patch(`/users/:userId`, [
            (0, express_validator_1.body)('email').isEmail().optional().withMessage('The given email is not valid, please try again'),
            (0, express_validator_1.body)('password').isLength({ min: 5 }).withMessage('Password minimum length must 5 characters long').optional(),
            (0, express_validator_1.body)('lastName').isString().optional().withMessage('Firstname must be a string'),
            (0, express_validator_1.body)('firstName').isString().optional().withMessage('Lastname must be a string'),
            (0, express_validator_1.body)('permissionFlags').isInt().optional(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            users_middleware_1.default.validatePatchEmail,
            users_controller_1.default.patch,
        ]);
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3VzZXJzL3VzZXJzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQWtFO0FBQ2xFLHNGQUE2RDtBQUM3RCxxRkFBNEQ7QUFDNUQsaUhBQXVGO0FBQ3ZGLHlEQUF1QztBQUd2QyxNQUFhLFdBQVksU0FBUSx5Q0FBa0I7SUFDL0MsWUFBWSxHQUF3QjtRQUNoQyxLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLEdBQUc7YUFDSCxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQ2YsR0FBRyxDQUFDLDBCQUFlLENBQUMsU0FBUyxDQUFDO2FBQzlCLElBQUksQ0FDRCxJQUFBLHdCQUFJLEVBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsV0FBVyxDQUFDLDBEQUEwRCxDQUFDLEVBQy9GLElBQUEsd0JBQUksRUFBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsZ0RBQWdELENBQUMsRUFDakcsb0NBQXdCLENBQUMsc0JBQXNCLEVBQy9DLDBCQUFlLENBQUMsNEJBQTRCLEVBQzVDLDBCQUFlLENBQUMsVUFBVSxDQUM3QixDQUFDO1FBRU4sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLDBCQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLEdBQUc7YUFDSCxLQUFLLENBQUMsZ0JBQWdCLENBQUM7YUFDdkIsR0FBRyxDQUFDLDBCQUFlLENBQUMsa0JBQWtCLENBQUM7YUFDdkMsR0FBRyxDQUFDLDBCQUFlLENBQUMsV0FBVyxDQUFDO2FBQ2hDLE1BQU0sQ0FBQywwQkFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO1lBQzNCLElBQUEsd0JBQUksRUFBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsMERBQTBELENBQUM7WUFDL0YsSUFBQSx3QkFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxnREFBZ0QsQ0FBQztZQUNqRyxJQUFBLHdCQUFJLEVBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQzVCLElBQUEsd0JBQUksRUFBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDM0IsSUFBQSx3QkFBSSxFQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxFQUFFO1lBQy9CLG9DQUF3QixDQUFDLHNCQUFzQjtZQUMvQywwQkFBZSxDQUFDLGlDQUFpQztZQUNqRCwwQkFBZSxDQUFDLEdBQUc7U0FDdEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7WUFDN0IsSUFBQSx3QkFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQyxnREFBZ0QsQ0FBQztZQUNoRyxJQUFBLHdCQUFJLEVBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsV0FBVyxDQUFDLGdEQUFnRCxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQzVHLElBQUEsd0JBQUksRUFBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUMsNEJBQTRCLENBQUM7WUFDaEYsSUFBQSx3QkFBSSxFQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsQ0FBQywyQkFBMkIsQ0FBQztZQUNoRixJQUFBLHdCQUFJLEVBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDMUMsb0NBQXdCLENBQUMsc0JBQXNCO1lBQy9DLDBCQUFlLENBQUMsa0JBQWtCO1lBQ2xDLDBCQUFlLENBQUMsS0FBSztTQUN4QixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUVKO0FBakRELGtDQWlEQyJ9