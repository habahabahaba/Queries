const BASE_URL = 'http://localhost:3000/events';

export async function fetchEvents(searchTerm = '') {
  const url = BASE_URL + searchTerm ? `$?search=${searchTerm}` : '';
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}
