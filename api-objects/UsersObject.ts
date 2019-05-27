export enum AuthorityEnum { 
	Audiologist, 
	Admin,
}

export const authorityTypes: Array<string> = ['Audiologist', 'Admin'];

export class UsersObject {
    constructor(
        public username: string,
        public name: string,
        public email: string,
        public authorityType: number,
    ) {}
}

export class CreateUserRequest {
    constructor(
        public user: UsersObject,
        public adminPassword: string,
    ) {}
}
