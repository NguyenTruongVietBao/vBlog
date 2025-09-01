import { z } from 'zod';

export const userSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    bio: z.string(),
    avatar: z.string(),
    role: z.enum(['ADMIN', 'USER']),
    createdAt: z.string(),
    updatedAt: z.string(),
    isVerified: z.boolean(),
    isBanned: z.boolean(),
    verifyToken: z.string(),
    verifyTokenExpires: z.string(),
    resetPasswordToken: z.string(),
    resetPasswordTokenExpires: z.string(),
    followers: z.array(z.string()),
    following: z.array(z.string()),
    authProvider: z.enum(['LOCAL', 'GOOGLE', 'FACEBOOK']),
    googleId: z.string(),
  })
  .strict();

export const apiResponse = z
  .object({
    status: z.boolean(),
    statusCode: z.number(),
    message: z.string(),
    data: z.object({}),
  })
  .strict();

export const MeResponse = z
  .object({
    ...apiResponse.shape,
    data: z.object({
      user: userSchema,
    }),
  })
  .strict();
export type MeResponseType = z.infer<typeof MeResponse>;
