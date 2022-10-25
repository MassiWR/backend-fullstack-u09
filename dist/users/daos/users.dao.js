"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortid_1 = __importDefault(require("shortid"));
const debug_1 = __importDefault(require("debug"));
const mongoose_service_1 = __importDefault(require("../../common/services/mongoose.service"));
const log = (0, debug_1.default)('app:in-memory-dao');
class UsersDao {
    constructor() {
        this.Schema = mongoose_service_1.default.getMongoose().Schema;
        this.userSchema = new this.Schema({
            _id: String,
            email: String,
            password: { type: String, select: false },
            firstName: String,
            lastName: String,
            permissionFlags: Number,
        }, { id: false });
        this.User = mongoose_service_1.default.getMongoose().model('Users', this.userSchema);
        log('Created new instance of UsersDao');
    }
    addUser(userFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = shortid_1.default.generate();
            const user = new this.User(Object.assign(Object.assign({ _id: userId }, userFields), { permissionFlags: 1 }));
            yield user.save();
            return userId;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findOne({ email: email }).exec();
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findOne({ _id: userId }).exec();
        });
    }
    getUsers(limit = 25, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.find().limit(limit).skip(limit * page).exec();
        });
    }
    updateUserById(userId, userFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.User.findOneAndUpdate({ _id: userId }, { $set: userFields }, { new: true }).exec();
            return existingUser;
        });
    }
    removeUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.deleteOne({ _id: userId }).exec();
        });
    }
    getUserByEmailWithPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.User.findOne({ email: email }).select('_id email permissionFlags +password').exec();
        });
    }
}
exports.default = new UsersDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdXNlcnMvZGFvcy91c2Vycy5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSxzREFBOEI7QUFDOUIsa0RBQTBCO0FBRTFCLDhGQUFxRTtBQUVyRSxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUV4RCxNQUFNLFFBQVE7SUFlVjtRQWJBLFdBQU0sR0FBRywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUU5QyxlQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3pCLEdBQUcsRUFBRSxNQUFNO1lBQ1gsS0FBSyxFQUFFLE1BQU07WUFDYixRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7WUFDekMsU0FBUyxFQUFFLE1BQU07WUFDakIsUUFBUSxFQUFFLE1BQU07WUFDaEIsZUFBZSxFQUFFLE1BQU07U0FDMUIsRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBRWpCLFNBQUksR0FBRywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBR2pFLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFSyxPQUFPLENBQUMsVUFBeUI7O1lBQ25DLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSwrQkFDdEIsR0FBRyxFQUFHLE1BQU0sSUFDVCxVQUFVLEtBQ2IsZUFBZSxFQUFFLENBQUMsSUFDcEIsQ0FBQztZQUNILE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xCLE9BQU8sTUFBTSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtJQUVLLGNBQWMsQ0FBQyxLQUFhOztZQUM5QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEQsQ0FBQztLQUFBO0lBRUssV0FBVyxDQUFDLE1BQWM7O1lBQzVCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuRCxDQUFDO0tBQUE7SUFHSyxRQUFRLENBQUMsS0FBSyxHQUFHLEVBQUUsRUFBRSxJQUFJLEdBQUcsQ0FBQzs7WUFDL0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25FLENBQUM7S0FBQTtJQUdLLGNBQWMsQ0FBQyxNQUFjLEVBQUUsVUFBcUM7O1lBQ3RFLE1BQU0sWUFBWSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FDakQsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFDLEVBQ2IsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDLEVBQ2xCLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBQyxDQUNkLENBQUMsSUFBSSxFQUFFLENBQUM7WUFFVCxPQUFPLFlBQVksQ0FBQztRQUN4QixDQUFDO0tBQUE7SUFFSyxjQUFjLENBQUMsTUFBYzs7WUFDL0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JELENBQUM7S0FBQTtJQUVLLDBCQUEwQixDQUFDLEtBQWE7O1lBQzFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMscUNBQXFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsRyxDQUFDO0tBQUE7Q0FHSjtBQUVELGtCQUFlLElBQUksUUFBUSxFQUFFLENBQUMifQ==