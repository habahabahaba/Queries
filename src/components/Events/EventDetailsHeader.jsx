// React-Query:
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../api/index.js';
// Mutations:
import { deleteEvent } from '../../api/mutations/index.js';
// React-Router:
import { Link, useParams, useNavigate } from 'react-router-dom';
// React:
import { useState } from 'react';

// Components:
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import Modal from '../UI/Modal.jsx';

export default function EventDetailsHeader({ title }) {
  // State:
  const [isDeleting, setIsDeleting] = useState(false);

  // Routing:
  const navigate = useNavigate();
  // Params (for id):
  const { id } = useParams();

  // Delete mutation
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      // Revalidating fetchEvents query:
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none',
      });

      // Navigating away:
      navigate('/events');
    },
  });

  // Handlers:
  function startDeleting() {
    setIsDeleting(true);
  }
  function stopDeleting() {
    setIsDeleting(false);
  }
  function handleDelete() {
    mutate({ id });
  }

  // JSX:
  const deleteModal = (
    <Modal onClose={stopDeleting}>
      {isPending ? (
        <>
          <span>Deleting the event...</span> <LoadingIndicator />
        </>
      ) : isError ? (
        <ErrorBlock
          title='An error occurred'
          message={error.info?.message || 'Failed to delete this event.'}
        />
      ) : (
        <>
          <h2>Do you really want to delete this event?</h2>
          <p>This action can not be undone!</p>
          <div className='form-actions'>
            <button onClick={stopDeleting} className='button-text'>
              Cancel
            </button>
            <button onClick={handleDelete} className='button'>
              Delete
            </button>
          </div>
        </>
      )}
    </Modal>
  );

  return (
    <header>
      <h1>{title}</h1>

      <nav>
        <button onClick={startDeleting}>Delete</button>
        <Link to='edit'>Edit</Link>
      </nav>
      {isDeleting ? deleteModal : null}
    </header>
  );
}
