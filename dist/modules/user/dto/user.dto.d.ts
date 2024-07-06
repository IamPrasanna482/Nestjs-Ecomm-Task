import { UUID } from 'crypto';
export declare class CreateUserDto {
    email: string;
    password: string;
    full_name: string;
    age?: number;
    gender?: string;
    mobile_number?: string;
    role: string;
}
export declare class GetUserParamsDto {
    id: UUID;
    email: string;
    full_name: string;
    mobile_number: string;
    gender: string;
    age: number;
    role: string;
    limit: number;
    offset: number;
    sortBy: string;
    order: string;
}
