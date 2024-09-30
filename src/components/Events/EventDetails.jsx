// React-Query:
import { useQuery } from '@tanstack/react-query';
// Queries:
import { fetchEvent } from '../../api/queries/index.js';
// React-Router:
import { Link, Outlet, useParams } from 'react-router-dom';
// Components:
import Header from '../Header.jsx';
import EventDetailsHeader from './EventDetailsHeader.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';

export default function EventDetails() {
  // Routing:
  // Params (for id):
  const { id } = useParams();

  // Fetching event:
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['event', id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  const formattedDate =
    new Date(data?.date + ' ' + data?.time).toUTCString() || '';

  // JSX:
  const renderedDetails = isPending ? null : isError ? (
    <ErrorBlock
      title='An error occurred'
      message={error.info?.message || 'Failed to load this event.'}
    />
  ) : (
    <div id='event-details-content'>
      <img src={`http://localhost:3000/${data.image}`} alt='A stock image' />
      <div id='event-details-info'>
        <div>
          <p id='event-details-location'>{data.location}</p>
          <p>
            <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate}</time>
          </p>
        </div>
        <p id='event-details-description'>{data.description}</p>
      </div>
    </div>
  );

  return (
    <>
      <Outlet />
      <Header>
        <Link to='/events' className='nav-item'>
          View all Events
        </Link>
      </Header>
      <article id='event-details'>
        {isPending ? (
          <header>
            <h1>Loading event details...</h1>
            <LoadingIndicator />
          </header>
        ) : isError ? null : (
          <EventDetailsHeader title={data.title} />
        )}
        {renderedDetails}
      </article>
    </>
  );
}
