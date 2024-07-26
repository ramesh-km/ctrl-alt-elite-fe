import http from '@/utils/http';

export const getBankAccounts = async (userId: string) => {
  const res = await http.get('/api/bank-accounts', {
    params: {
      userId,
    },
  });
  return res.data;
};
