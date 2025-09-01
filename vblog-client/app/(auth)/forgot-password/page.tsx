'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { email, z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Stepper } from '@/components/ui/stepper';

const steps = [
  { title: 'Step 1', description: 'Nhập email' },
  { title: 'Step 2', description: 'Xác nhận email' },
  { title: 'Step 3', description: 'Thay đổi mật khẩu' },
];

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: 'Mã OTP phải có 6 ký tự.',
  }),
});

export default function ForgotPasswordPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  return (
    <div className='container mx-auto py-10 max-w-2xl'>
      <div className='flex items-center justify-start gap-2 mb-5'>
        <Button
          variant='ghost'
          className='cursor-pointer'
          onClick={() => router.back()}
        >
          <ArrowLeftIcon size={24} />
        </Button>
        <h1 className='text-2xl font-bold'>Quên mật khẩu</h1>
      </div>
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />
      <div className='mt-8 p-4 border rounded-md'>
        <h2 className='text-lg font-semibold mb-2'>
          {steps[currentStep].description}
        </h2>
        <div>
          {currentStep === 0 && <Step1 setCurrentStep={setCurrentStep} />}
          {currentStep === 1 && <Step2 setCurrentStep={setCurrentStep} />}
          {currentStep === 2 && <Step3 setCurrentStep={setCurrentStep} />}
        </div>
      </div>
    </div>
  );
}

const Step1 = ({
  setCurrentStep,
}: {
  setCurrentStep: (step: number) => void;
}) => {
  const [email, setEmail] = useState('');
  const handleSendOtp = () => {
    console.log('Gửi OTP');
    setTimeout(() => {
      alert('OTP đã được gửi đến email');
      setCurrentStep(1);
    }, 1000);
  };
  return (
    <div className='w-full flex items-center justify-center max-w-sm gap-2'>
      <Input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type='submit' variant='outline' onClick={handleSendOtp}>
        Gửi OTP
      </Button>
    </div>
  );
};

const Step2 = ({
  setCurrentStep,
}: {
  setCurrentStep: (step: number) => void;
}) => {
  const [pin, setPin] = useState('');
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('🚀 ~ onSubmit ~ data:', data);
    toast('Bạn đã nhập mã OTP', {
      description: (
        <pre className='mt-2 w-[320px] rounded-md bg-neutral-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <div className=''>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=''>
            <FormField
              control={form.control}
              name='pin'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Nhập mã OTP đã được gửi đến email
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='mx-auto cursor-pointer mt-2'>
              Xác nhận
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

const Step3 = ({
  setCurrentStep,
}: {
  setCurrentStep: (step: number) => void;
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleChangePassword = () => {
    console.log('Thay đổi mật khẩu');
    setCurrentStep(2);
  };
  return (
    <div className='flex flex-col gap-4 max-w-sm'>
      <Input
        type='password'
        placeholder='Mật khẩu mới'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type='password'
        placeholder='Xác nhận mật khẩu'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <Button type='submit' variant='outline' onClick={handleChangePassword}>
        Thay đổi mật khẩu
      </Button>
    </div>
  );
};
