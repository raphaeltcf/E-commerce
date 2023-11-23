import { ROLE } from '@prisma/client';

export class UserFromJwt {
  id: string;
  email: string;
  name: string;
  type: ROLE;
}
