export enum AuthorityEnum { 
	Audiologist, 
	Admin,
}

export const authorityTypes: Array<string> = ['Audiologist', 'Admin'];

export class UsersObject {
    constructor(
        public username: string,
        public authorityid: string,
        public authorityemail: string,
        public authorityType: number,
    ) {}
	public authorityname: string;
	public password: string;
}

export class CreateUserRequest {
    constructor(
        public user: UsersObject,
        public adminPassword: string,
    ) {}
}
