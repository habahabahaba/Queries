// React-Query:
import { queryClient } from '../../api/index.js';
// Queries:
import { fetchEvent } from '../../api/queries/index.js';

export function editEventLoader({ params: { id } }) {
  return queryClient.fetchQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });
}
