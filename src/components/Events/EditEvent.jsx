// React-Query:
import { useQuery } from '@tanstack/react-query';
// Queries:
import { fetchEvent } from '../../api/queries/index.js';
// React-Router:
import { Link, useNavigate, useParams } from 'react-router-dom';
// Components:
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';

export default function EditEvent() {
  // Navigation:
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch event:
  useQuery({
    queryKey: ['events', id],
    queryFn: ({ signal }) => fetchEvent({ signal, id }),
  });

  // Handlers:
  function handleSubmit(formData) {}

  function handleClose() {
    navigate('../');
  }

  return (
    <Modal onClose={handleClose}>
      <EventForm inputData={null} onSubmit={handleSubmit}>
        <Link to='../' className='button-text'>
          Cancel
        </Link>
        <button type='submit' className='button'>
          Update
        </button>
      </EventForm>
    </Modal>
  );
}
