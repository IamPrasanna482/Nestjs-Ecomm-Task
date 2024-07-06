import { Injectable } from "@nestjs/common";
import { User } from "../user/user.model";
@Injectable()
export class AuthRepository {
    async getUserByEmail(email:string):Promise<User>{
        return await User.findOne({where:{email:email}});
    }
}