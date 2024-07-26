import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function useUserPermissions() {
  const query = useQuery({
    queryKey: ['user-permisisons'],
    queryFn: () => {
      // TODOO: correct once BE is avilable
      return axios.get('/user/permissions');
    },
  });

  return query;
}

export default useUserPermissions;
