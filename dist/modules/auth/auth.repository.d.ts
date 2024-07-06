import { User } from "../user/user.model";
export declare class AuthRepository {
    getUserByEmail(email: string): Promise<User>;
}
