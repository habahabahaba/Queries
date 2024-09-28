// React-Query:
import { useQuery } from '@tanstack/react-query';
// Queries:
import { fetchEvents } from '../../queries/http';
// React:
import { useRef, useState } from 'react';
// Components:
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock';
import EventItem from './EventItem';

export default function FindEventSection() {
  // State:
  const [searchTerm, setSearchTerm] = useState('');
  const searchElement = useRef(null);

  // Query:
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { searchTerm }],
    queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),
  });

  function handleSubmit(event) {
    event.preventDefault();

    setSearchTerm(searchElement?.current?.value || '');
  }

  // JSX:
  let renderedEvents = <p>Please enter a search term and to find events.</p>;

  if (isPending) {
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
