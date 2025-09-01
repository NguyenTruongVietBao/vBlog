'use client';

import ErrorCustom from '@/components/common/error-custom';
import LoadingCustom from '@/components/common/loading-custom';
import { useAccount } from '@/queries/useAccount';

export default function ProfilePage() {
  const { data: userData, isLoading, error } = useAccount();
  if (isLoading) return <LoadingCustom />;
  if (error) return <ErrorCustom error={error.message} />;

  return (
    <div>
      <p>Profile Page</p>
      <p>{userData?.name}</p>
      <p>{userData?.email}</p>
      <p>{userData?.phone}</p>
      <p>{userData?.bio}</p>
      <p>{userData?.avatar}</p>
      <p>{userData?.role}</p>
      <p>{userData?.createdAt}</p>
      <p>{userData?.updatedAt}</p>
    </div>
  );
}
