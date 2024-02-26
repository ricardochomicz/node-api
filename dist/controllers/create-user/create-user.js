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
exports.CreateUserController = void 0;
const validator_1 = __importDefault(require("validator"));
class CreateUserController {
    constructor(createUserRepository) {
        this.createUserRepository = createUserRepository;
    }
    handle(httpRequest) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requiredFields = ["firstName", "lastName", "email", "password"];
                for (const field of requiredFields) {
                    if (!((_a = httpRequest === null || httpRequest === void 0 ? void 0 : httpRequest.body[field]) === null || _a === void 0 ? void 0 : _a.length)) {
                        return {
                            statusCode: 400,
                            body: `Fields ${field} is required!`
                        };
                    }
                }
                const emailIsValid = validator_1.default.isEmail(httpRequest.body.email);
                if (!emailIsValid) {
                    return {
                        statusCode: 400,
                        body: 'Email is invalid!'
                    };
                }
                const user = yield this.createUserRepository.createUser(httpRequest.body);
                return {
                    statusCode: 201,
                    body: user
                };
            }
            catch (e) {
                return {
                    statusCode: 500,
                    body: "Something went wrong"
                };
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
