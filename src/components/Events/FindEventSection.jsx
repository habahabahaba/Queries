// React-Query:
import { useQuery } from '@tanstack/react-query';
// Queries:
import { fetchEvents } from '../../api/queries';
// React:
import { useRef, useState } from 'react';
// Components:
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock';
import EventItem from './EventItem';

export default function FindEventSection() {
  // State:
  const [searchTerm, setSearchTerm] = useState(null);

  const searchElement = useRef(null);

  // Query:
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', { searchTerm }],
    queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),
    enabled: searchTerm !== null,
  });

  function handleSubmit(event) {
    event.preventDefault();

    setSearchTerm(searchElement?.current?.value || '');
  }

  // JSX:
  let renderedEvents = <p>Please enter a search term and to find events.</p>;

  if (isLoading) {
    renderedEvents = <LoadingIndicator />;
  }
  if (isError) {
    renderedEvents = (
      <ErrorBlock
        title='An error occurred.'
        message={error.info?.message || 'Failed to fetch events.'}
      />
    );
  }
  if (data) {
    renderedEvents = (
      <ul className='events-list'>
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <section className='content-section' id='all-events-section'>
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id='search-form'>
          <input
            type='search'
            placeholder='Search events'
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {renderedEvents}
    </section>
  );
}
