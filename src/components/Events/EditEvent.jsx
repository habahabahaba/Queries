// React-Query:
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '../../api/index.js';
// Queries:
import { fetchEvent } from '../../api/queries/index.js';
// Mutations:
import { putEvent } from '../../api/mutations/index.js';
// React-Router:
import { Link, useNavigate, useParams } from 'react-router-dom';
// Components:
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  // Navigation:
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch event:
  const second = 1000;
  const { data, isError, error } = useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
    staleTime: 10 * second, // to avoid refetching after the editEventLoader.
  });

  // Update event:
  const { mutate } = useMutation({
    mutationFn: putEvent,
    onMutate: async (data) => {
      const updatedEventData = data.eventData;
      // console.log('updatedEventData from onMutate: ', updatedEventData);

      // Preventing clashing queries:
      await queryClient.cancelQueries({ queryKey: ['events', id] });

      // Backing-up the original event data:
      const originalEventData = queryClient.getQueryData(['events', id]);

      // Updating the event optimistically:
      queryClient.setQueryData(['events', id], updatedEventData);

      return { originalEventData };
    },

    // Restoring original event data, in case of an error:
    onError: (error, data, context) => {
      queryClient.setQueryData(['events', id], context.originalEventData);
      console.log('UPDATE ERROR');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  // Handlers:
  function handleSubmit(formData) {
    // Updating the event:
    mutate({ id, eventData: formData });
    // Navigating away:
    navigate('../');
  }

  function handleClose() {
    navigate('../');
  }

  // JSX:
  let content;
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
