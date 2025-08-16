'use client';

import ErrorCustom from '@/components/common/error-custom';
import LoadingCustom from '@/components/common/loading-custom';
import { formatDateTime } from '@/lib/utils';
import { usePosts } from '@/hooks/usePosts';
import Image from 'next/image';

// Client Component
export default function Home() {
  const { data: posts, isLoading, isError, error } = usePosts();

  if (isLoading) return <LoadingCustom />;
  if (isError) return <ErrorCustom error={error?.message || 'Error'} />;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            {post.title} - {formatDateTime(post.createdAt)}
            <Image
              src={
                post.image && post.image.length > 0
                  ? post.image
                  : `https://images.pexels.com/photos/6572957/pexels-photo-6572957.jpeg`
              }
              alt={post.title}
              width={100}
              height={100}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
