import { SetMetadata } from '@nestjs/common';
import { Role } from '../domain/value-objects/roles/role.vo'


export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
