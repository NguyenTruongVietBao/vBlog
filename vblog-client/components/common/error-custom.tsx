import React from 'react';

export default function ErrorCustom({ error }: { error: string }) {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='text-red-500'>{error || 'Error'}</div>
    </div>
  );
}
