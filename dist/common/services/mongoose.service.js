"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
require('dotenv').config({ override: true, debug: true });
const log = (0, debug_1.default)('app:mongoose-service');
class MongooseService {
    constructor() {
        this.count = 0;
        this.mongooseOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        };
        this.connectWithRetry = () => {
            log('Attempting MongoDB connection (will retry if needed)');
            mongoose_1.default
                .connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.gknmyod.mongodb.net/api-db?retryWrites=true&w=majority`, this.mongooseOptions)
                .then(() => {
                log('MongoDB is connected');
            })
                .catch((err) => {
                const retrySeconds = 5;
                log(`MongoDB connection unsuccessful (will retry #${++this
                    .count} after ${retrySeconds} seconds):`, err);
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            });
        };
        this.connectWithRetry();
    }
    getMongoose() {
        return mongoose_1.default;
    }
}
exports.default = new MongooseService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9tb25nb29zZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWdDO0FBQ2hDLGtEQUEwQjtBQUMxQixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUV6RCxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUUzRCxNQUFNLGVBQWU7SUFTakI7UUFSUSxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1Ysb0JBQWUsR0FBRztZQUN0QixlQUFlLEVBQUUsSUFBSTtZQUNyQixrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLHdCQUF3QixFQUFFLElBQUk7U0FFakMsQ0FBQztRQVVGLHFCQUFnQixHQUFHLEdBQUcsRUFBRTtZQUNwQixHQUFHLENBQUMsc0RBQXNELENBQUMsQ0FBQztZQUM1RCxrQkFBUTtpQkFDSCxPQUFPLENBQUMsaUJBQWlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0Isa0VBQWtFLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQztpQkFDOUssSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDUCxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUNoQyxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ1gsTUFBTSxZQUFZLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixHQUFHLENBQ0MsZ0RBQWdELEVBQUUsSUFBSTtxQkFDakQsS0FBSyxVQUFVLFlBQVksWUFBWSxFQUM1QyxHQUFHLENBQ04sQ0FBQztnQkFDRixVQUFVLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQztZQUMzRCxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQztRQXZCRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsV0FBVztRQUNQLE9BQU8sa0JBQVEsQ0FBQztJQUNwQixDQUFDO0NBbUJKO0FBQ0Qsa0JBQWUsSUFBSSxlQUFlLEVBQUUsQ0FBQyJ9