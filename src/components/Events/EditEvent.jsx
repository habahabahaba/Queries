// React-Query:
import { useQuery, useMutation } from '@tanstack/react-query';
// Queries:
import { fetchEvent } from '../../api/queries/index.js';
// Mutations:
import { putEvent } from '../../api/mutations/index.js';
// React-Router:
import { Link, useNavigate, useParams } from 'react-router-dom';
// Components:
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  // Navigation:
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch event:
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  // Update event:
  const {
    mutate,
    updateIsPending = isPending,
    isUpdateError = isError,
    updateError = error,
  } = useMutation({
    mutationFn: () => putEvent,
  });

  // Handlers:
  function handleSubmit(formData) {
    mutate({ id, eventData: formData });
  }

  function handleClose() {
    navigate('../');
  }

  // JSX:
  let content;
  if (isPending) {
    content = (
      <div className='center'>
        <LoadingIndicator />
      </div>
    );
  }
  if (isError) {
    content = (
      <>
        <ErrorBlock
          title='An error occurred'
          message={
            error.info?.message || 'Failed to load details for this event.'
          }
        />
        <div className='form-actions'>
          <Link to='../' className='button'>
            Go back
          </Link>
        </div>
      </>
    );
  }
  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to='../' className='button-text'>
          Cancel
        </Link>
        <button type='submit' className='button'>
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
