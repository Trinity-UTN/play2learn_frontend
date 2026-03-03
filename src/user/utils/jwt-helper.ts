// src/shared/utils/jwt-helper.ts
import type { Role } from '@/shared';
import { jwtDecode } from 'jwt-decode';

export interface CustomJwtPayload {
    sub: string;
    role: Role;
    exp: number;
    id?: number
}

export const decodeToken = (token: string): any => {
    try {
        return jwtDecode<CustomJwtPayload>(token);
    } catch {
        return null;
    }
};