// React-Query:
import { queryClient } from '../../api/index.js';
// Mutations:
import { putEvent } from '../../api/mutations/index.js';
// React-Router:
import { redirect } from 'react-router-dom';

export async function editEventAction({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  const { id } = params;

  await putEvent({ id, eventData: updatedEventData });
  await queryClient.invalidateQueries(['events']);

  return redirect('../');
}
