import { Loader2 } from 'lucide-react';

export default function LoadingCustom() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'>
        <Loader2 className='animate-spin' />
      </div>
    </div>
  );
}
