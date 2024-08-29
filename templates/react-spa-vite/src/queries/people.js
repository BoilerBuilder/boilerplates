import { useQuery } from '@tanstack/react-query';

import { getPeopleById } from '@/services/people';

export const usePeople = (peopleId) => {
  return useQuery({
    queryKey: ['people', peopleId],
    queryFn: async ({ queryKey }) => getPeopleById(queryKey[1]),
    retry: false,
    refetchOnWindowFocus: false,
    select: (response) => response,
  });
};
