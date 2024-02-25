import { ROLE } from '@prisma/client';

export class User {
  id: string;
  email: string;
  password: string;
  name: string;
  type: ROLE;
}
