import http from '@/lib/api';
import { MeResponseType } from '@/validations/account';

const accountApiRequest = {
  me: () => http.get<MeResponseType>('/auth/me'),
};

export default accountApiRequest;
