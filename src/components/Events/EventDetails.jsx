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

export default function EventDetails() {
  // Params (for id):
  const { id } = useParams();
  // Fetch query:
  const { data, isPending } = useQuery({
    queryKey: ['event', id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });
  // Delete mutation

  // Handlers:

  // JSX:
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
          <h1>EVENT TITLE</h1>
          <nav>
            <button>Delete</button>
            <Link to='edit'>Edit</Link>
          </nav>
        </header>
        <div id='event-details-content'>
          <img src='' alt='' />
          <div id='event-details-info'>
            <div>
              <p id='event-details-location'>EVENT LOCATION</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>DATE @ TIME</time>
            </div>
            <p id='event-details-description'>EVENT DESCRIPTION</p>
          </div>
        </div>
      </article>
    </>
  );
}
