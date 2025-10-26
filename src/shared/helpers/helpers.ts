import { Role } from '../../domain/value-objects/roles/role.vo'

export const parseRole = (value: string): Role => {
  if (value === Role.USER) return Role.USER;
  if (value === Role.ADMIN) return Role.ADMIN;
  throw new Error(`Invalid role: ${value}`);
}