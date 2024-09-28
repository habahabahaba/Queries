// React-Query:
import { useMutation } from '@tanstack/react-query';
// Mutations:
import { postNewEvent } from '../../mutations/index.js';
// React-Router:
import { Link, useNavigate } from 'react-router-dom';
// Components:
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewEvent() {
  const navigate = useNavigate();

  // Mutation:
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: postNewEvent,
  });
  // Handlers:
  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending ? (
          <span>Submitting...</span>
        ) : (
          <>
            <Link to='../' className='button-text'>
              Cancel
            </Link>
            <button type='submit' className='button'>
              Create
            </button>
          </>
        )}
      </EventForm>
      {isError ? (
        <ErrorBlock
          title='Failed to create new event.'
          message={
            error.info?.message ||
            'Please check your inputs and try again later.'
          }
        />
      ) : null}
    </Modal>
  );
}
