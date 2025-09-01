import { useQuery } from '@tanstack/react-query';
import accountApiRequest from '@/apiRequest/account';

export const useAccount = () => {
  return useQuery({
    queryKey: ['account-profile'],
    queryFn: () => accountApiRequest.me().then((res) => res.payload.data.user),
  });
};
