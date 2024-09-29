const BASE_URL = 'http://localhost:3000/events';

// Many events:
export async function fetchEvents({ signal, searchTerm }) {
  const url = BASE_URL + (searchTerm ? `?search=${searchTerm}` : '');
  // console.log('fetchEvents url: ', url);

  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

// One event:
export async function fetchEvent({ signal, id }) {
  const response = await fetch(`${BASE_URL}/${id}`, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching this event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();
  console.log('event: ', event);

  return event;
}

// Event images:
export async function fetchSelectableImages({ signal }) {
  const response = await fetch(`${BASE_URL}/images`, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred, while fetching the images.');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
}
