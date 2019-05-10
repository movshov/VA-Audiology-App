export type userType = 'Admin' | 'Audiologist';

export class UsersObject {
	public username: string;
	public name: string;
	public email: string;
	public password: string;
	public authorityType: userType;
}