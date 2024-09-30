// React-Query:
import { useQuery } from '@tanstack/react-query';
// Queries:
import { fetchEvents } from '../../api/queries/index.js';
// React:
// Components:
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

export default function NewEventsSection() {
  // Query:
  const second = 1000;
  const minute = 60000;
  const { isPending, isError, error, data } = useQuery({
    queryKey: ['events', { max: 3 }],
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
    staleTime: 15 * second,
    gcTime: 2 * minute,
  });

  let content = null;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title='An error occurred'
        message={error.info?.message || 'Failed to fetch events'}
      />
    );
  }

  if (data) {
    content = (
      <ul className='events-list'>
        {data.reverse().map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className='content-section' id='new-events-section'>
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
