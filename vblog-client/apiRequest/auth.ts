import http from '@/lib/api';
import { LoginBodyType, RegisterBodyType } from '@/validations/auth';
import { LoginResponseType, RegisterResponseType } from '@/validations/auth';

const authApiRequest = {
  register: (data: RegisterBodyType) =>
    http.post<RegisterResponseType>('/auth/register', data),
  login: (data: LoginBodyType) =>
    http.post<LoginResponseType>('/auth/login', data),
  logout: () => http.post<void>('/auth/logout', {}),
};

export default authApiRequest;
