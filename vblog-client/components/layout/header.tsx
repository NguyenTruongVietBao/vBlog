'use client';

import { ThemeToggle } from '@/components/common/theme-toggle';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppContext } from '../providers/AuthProvider';
import { Button } from '../ui/button';
import { useLogoutMutation } from '@/queries/useAuth';
import Image from 'next/image';
import { useTheme } from 'next-themes';

export default function Header() {
  const pathname = usePathname();
  const { isAuth, setIsAuth } = useAppContext();
  const router = useRouter();
  const logoutMutation = useLogoutMutation();
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    if (logoutMutation.isPending) return;
    try {
      await logoutMutation.mutateAsync();
      setIsAuth(false);
      router.push('/login');
    } catch (e) {
      console.log('error', e);
    }
  };

  const isAuthPage =
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/register') ||
    pathname?.startsWith('/forgot-password');

  if (isAuthPage) {
    return null;
  }

  return (
    <header className='container mx-auto w-full h-16 flex justify-between items-center'>
      <div>
        <Link href='/' className='flex items-center gap-4'>
          {mounted && theme.theme === 'dark' ? (
            <Image
              priority={false}
              src='/images/vblog-logo-light.svg'
              alt='vBlog'
              width={100}
              height={100}
              className='w-20 h-20'
            />
          ) : (
            <Image
              priority={false}
              src='/images/vblog-logo-dark.svg'
              alt='vBlog'
              width={100}
              height={100}
              className='w-20 h-20'
            />
          )}
        </Link>
      </div>
      <div className='flex items-center gap-4 font-medium'>
        <Link href='/'>Home</Link>
        <Link href='/blog'>Blog</Link>
        <Link href='/about'>About</Link>
        <Link href='/contact'>Contact</Link>
      </div>
      <div className='flex items-center gap-4'>
        {isAuth ? (
          <div className='flex items-center gap-4'>
            <Button variant='secondary'>
              <Link href='/profile'>Profile</Link>
            </Button>
            <Button variant='default' onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className='flex items-center gap-4 '>
            <Button variant='secondary'>
              <Link href='/login'>Login</Link>
            </Button>
            <Button variant='default'>
              <Link href='/register'>Register</Link>
            </Button>
          </div>
        )}
        <ThemeToggle />
      </div>
    </header>
  );

  // const [isScrolling, setIsScrolling] = useState(false);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolling(window.scrollY > 64);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // return (
  //   <header
  //     className={cn(
  //       'w-full h-16 flex justify-between items-center fixed top-0 z-50 transition-all duration-500 px-4',
  //       {
  //         'bg-red-200': isScrolling,
  //         'bg-transparent': !isScrolling,
  //       }
  //     )}
  //   >
  //     <div>LOGO</div>
  //     <div>Menu</div>
  //     <div className='flex items-center gap-4'>
  //       <ThemeToggle />
  //       <div>
  //         <Link href='/login'>Login</Link>
  //       </div>
  //       <div>
  //         <Link href='/register'>Register</Link>
  //       </div>
  //     </div>
  //   </header>
  // );
}
