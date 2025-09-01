import * as z from 'zod';
import { apiResponse, userSchema } from './account';

export const LoginBody = z
  .object({
    email: z.string().email({
      message: 'Email is required',
    }),
    password: z.string().min(6, {
      message: 'Password more than 6 characters',
    }),
  })
  .strict();
export type LoginBodyType = z.infer<typeof LoginBody>;

export const LoginResponse = z.object({
  ...apiResponse.shape,
  data: z
    .object({
      accessToken: z.string(),
      user: userSchema,
    })
    .strict(),
});
export type LoginResponseType = z.infer<typeof LoginResponse>;

export const RegisterBody = z
  .object({
    name: z.string().min(3, 'Tên phải có ít nhất 3 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    phone: z.string().optional(),
    bio: z.string().max(500, 'Giới thiệu phải có ít nhất 500 ký tự'),
    avatar: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });
export type RegisterBodyType = z.infer<typeof RegisterBody>;

export const RegisterResponse = z
  .object({
    ...apiResponse.shape,
    data: z.object({
      user: userSchema,
    }),
  })
  .strict();
export type RegisterResponseType = z.infer<typeof RegisterResponse>;
