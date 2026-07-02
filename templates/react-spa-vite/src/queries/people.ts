import { useQuery } from '@tanstack/react-query';

import { getPeopleById, type Person } from '@/services/people';

export const usePeople = (peopleId: number) => {
  return useQuery<Person>({
    queryKey: ['people', peopleId],
    queryFn: async ({ queryKey }) => getPeopleById(queryKey[1] as number),
    retry: false,
    refetchOnWindowFocus: false,
    select: (response) => response,
  });
};
