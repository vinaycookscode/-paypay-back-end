export interface IUserInterface {
	name: string;
	gender: string;
	email?: string;
	address: string;
	city: string;
	state: string;
	country: ICountry;
	photo?: string;
	hobby: string;
	password?: string;
	role: string;
	_id?: string;
	isActive?: Boolean
}

export interface IUserLogin {
	email: string;
	password: string;
}

export interface ICountry {
	id: string;
	 name: string;
  }

     