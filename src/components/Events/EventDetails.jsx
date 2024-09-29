// React-Query:
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../api/index.js';
// Queries:
import { fetchEvent } from '../../api/queries/index.js';
// Mutations:
import { deleteEvent } from '../../api/mutations/index.js';
// React-Router:
import { Link, Outlet, useParams } from 'react-router-dom';

// Components:
import Header from '../Header.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';

export default function EventDetails() {
  // Params (for id):
  const { id } = useParams();
  // Fetching event:
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['event', id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  const formattedDate =
    new Date(data?.date + ' ' + data?.time).toUTCString() || '';
  // console.log('formattedDate: ', formattedDate);

  // Delete mutation

  // Handlers:

  // JSX:
  const renderedDetails = isPending ? null : isError ? (
    <ErrorBlock
      title='An error occurred'
      message={error.info?.message || 'Failed to fetch this event.'}
    />
  ) : (
    <div id='event-details-content'>
      <img src={`http://localhost:3000/${data.image}`} alt='A stock image' />
      <div id='event-details-info'>
        <div>
          <p id='event-details-location'>{data.location}</p>
          <time dateTime={`Todo-DateT$Todo-Time`}>{`${formattedDate}`}</time>
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
        <header>
          <h1>{data ? data.title : 'Loading event details'}</h1>
          {isPending ? (
            <LoadingIndicator />
          ) : (
            <nav>
              <button>Delete</button>
              <Link to='edit'>Edit</Link>
            </nav>
          )}
        </header>

        {renderedDetails}
      </article>
    </>
  );
}
