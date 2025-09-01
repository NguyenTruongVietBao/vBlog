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
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/queries/useAuth';
import { toast } from 'sonner';
import { HttpError } from '@/lib/api';
import { useAppContext } from '@/components/providers/AuthProvider';
import { RegisterBody, RegisterBodyType } from '@/validations/auth';

export default function RegisterPage() {
  const router = useRouter();
  const { setIsAuth } = useAppContext();
  const registerMutation = useRegisterMutation();
  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      avatar: '',
      bio: '',
    },
  });
  const onSubmit = async (data: RegisterBodyType) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    try {
      const result = await registerMutation.mutateAsync(data);
      if (!result.payload.data) {
        toast.error(result.payload.message);
        return;
      }
      setIsAuth(true);
      router.push('/verify-email');
    } catch (error) {
      if (error instanceof HttpError) {
        toast.error(error.getMessage());
      }
    }
  };
  return (
    <div className='flex items-center justify-center h-screen'>
      <Card className='w-full max-w-2xl'>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Button
              variant='ghost'
              onClick={() => router.push('/')}
              className='cursor-pointer'
            >
              <ArrowLeftIcon size={24} />
            </Button>
            <div className='text-2xl font-bold'>Đăng ký</div>
          </CardTitle>
          <CardAction>
            <Button variant='link'>
              <Link href='/login'>Đăng nhập</Link>
            </Button>
          </CardAction>
          <CardAction>
            <Button variant='link'></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-1 space-y-5'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên</FormLabel>
                        <FormControl>
                          <Input placeholder='Nhập tên' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                          <Input placeholder='Nhập mật khẩu' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Xác nhận mật khẩu</FormLabel>
                        <FormControl>
                          <Input placeholder='Nhập lại mật khẩu' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số điện thoại</FormLabel>
                        <FormControl>
                          <Input placeholder='Nhập số điện thoại' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-1 space-y-5'>
                  <FormField
                    control={form.control}
                    name='bio'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giới thiệu</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Nhập giới thiệu về bản thân'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='avatar'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ảnh đại diện</FormLabel>
                        <FormControl>
                          <Input type='file' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type='submit' className='mx-auto w-full cursor-pointer'>
                Đăng ký
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
