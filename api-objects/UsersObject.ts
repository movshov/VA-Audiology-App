export enum AuthorityEnum { 
	Audiologist, 
	Statistician, 
	Admin,
}

export const authorityTypes: Array<string> = ['Audiologist', 'Statistician', 'Admin'];

export class UsersObject {

	constructor (username, name, email, password, authorityType) {
		this.username = username;
		this.authorityName = name;
		this.email = email;
		this.password = password;
		this.authorityType = authorityType;
	}

	public username: string;
	public authorityName: string;
	public email: string;
	public password: string;
	public authorityType: number;
}

