'use client';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LoginGoogleButton from '@/components/common/login-google-button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { HttpError } from '@/lib/api';
import { LoginBody, LoginBodyType } from '@/validations/auth';
import { toast } from 'sonner';
import { useAppContext } from '@/components/providers/AuthProvider';
import { useLoginMutation } from '@/queries/useAuth';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { setIsAuth } = useAppContext();
  const loginMutation = useLoginMutation();
  const searchParams = useSearchParams();
  const clearTokens = searchParams?.get('clearTokens');
  const redirect = searchParams?.get('redirect');

  useEffect(() => {
    if (clearTokens && clearTokens === 'true') {
      setIsAuth(false);
    }
  }, [clearTokens]);

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: 'bao@gmail.com',
      password: '123123',
    },
  });

  const onSubmit = async (data: LoginBodyType) => {
    try {
      const result = await loginMutation.mutateAsync(data);
      if (!result.payload.data) {
        toast.error(result.payload.message);
        return;
      }
      setIsAuth(true);
      router.push(redirect || '/profile');
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.getMessage());
      }
    }
  };
  return (
    <div className='flex items-center justify-center h-screen'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Button
              variant='ghost'
              onClick={() => router.push('/')}
              className='cursor-pointer'
            >
              <ArrowLeftIcon size={24} />
            </Button>
            <div className='text-2xl font-bold'>Đăng nhập</div>
          </CardTitle>
          <CardAction>
            <Button variant='link'>
              <Link href='/register'>Đăng ký</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Nhập email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your password'
                        {...field}
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />

                    <Link
                      href='/forgot-password'
                      className='cursor-pointer text-sm font-medium hover:underline hover:font-semibold'
                    >
                      Quên mật khẩu ?
                    </Link>
                  </FormItem>
                )}
              />

              <Button type='submit' className='mx-auto w-full cursor-pointer'>
                Đăng nhập
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex-col gap-2'>
          <div>
            <LoginGoogleButton />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
