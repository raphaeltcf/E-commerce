import { ROLE } from '@prisma/client';

export interface UserPayload {
  userId: string;
  email: string;
  name: string;
  type: ROLE;
}
