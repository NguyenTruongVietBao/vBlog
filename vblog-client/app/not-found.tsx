import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h2 className='text-2xl font-bold'>Page Not Found</h2>
      <p className='text-sm'>Could not find requested resource</p>
      <Button asChild>
        <Link href='/'>Return Home</Link>
      </Button>
    </div>
  );
}
