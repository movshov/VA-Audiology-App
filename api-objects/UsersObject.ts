export enum AuthorityEnum {
	Audiologist,
	Statistician,
	Admin,
}

export const authorityTypes: Array<string> = ['Audiologist', 'Statistician', 'Admin'];

export class UsersObject {
	public username: string;
	public name: string;
	public email: string;
	public password: string;
	public authorityType: number;

	constructor(username?: string, name?: string, email?: string, password?: string, authorityType?: number) {
		this.username = username;
		this.name = name;
		this.email = email;
		this.password = password;
		this.authorityType = authorityType;
	}
}

