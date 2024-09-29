// React-Query:
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../api/index.js';
// Mutations:
import { deleteEvent } from '../../api/mutations/index.js';
// React-Router:
import { Link, useParams, useNavigate } from 'react-router-dom';

// Components:
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';

export default function EventDetailsHeader({ title }) {
  // Routing:
  const navigate = useNavigate();
  // Params (for id):
  const { id } = useParams();

  // Delete mutation
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      // Revalidating fetchEvents query:
      queryClient.invalidateQueries({ queryKey: ['events'] });

      // Navigating away:
      navigate('/events');
    },
  });
  // Handlers:
  function handleDelete() {
    mutate({ id });
  }

  // JSX:
  return (
    <header>
      <h1>{title}</h1>
      {isPending ? (
        <LoadingIndicator />
      ) : (
        <nav>
          <button onClick={handleDelete}>Delete</button>
          <Link to='edit'>Edit</Link>
        </nav>
      )}
      {isError ? (
        <ErrorBlock
          title='An error occurred'
          message={error.info?.message || 'Failed to delete this event.'}
        />
      ) : null}
    </header>
  );
}
