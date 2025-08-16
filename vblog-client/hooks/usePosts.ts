import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';
import { Post } from '@/types/post';

export const usePosts = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchApi<Post[]>('/posts'),
  });

  return { data, isLoading, isError, error };
};
