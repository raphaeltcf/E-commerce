import { IUser } from './user.interface';

export interface IUserWithPassword extends IUser {
  password: string;
}
