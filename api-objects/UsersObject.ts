export enum AuthorityEnum { 
	Audiologist, 
	Admin,
}

export const authorityTypes: Array<string> = ['Audiologist', 'Admin'];

export class UsersObject {
	public authorityid: number;
	public username: string;
	public authorityname: string;
	public authorityemail: string;
	public password: string;
	public authoritytype: number;
}
