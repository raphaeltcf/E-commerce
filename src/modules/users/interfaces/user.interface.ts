import { ROLE } from '@prisma/client';

export interface IUser {
  id: string;
  name: string;
  email: string;
  type: ROLE;
  createdAt: Date;
  updatedAt: Date;
}
