const BASE_URL = 'http://localhost:3000/events';

// Events:
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
