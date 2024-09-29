const BASE_URL = 'http://localhost:3000/events';

export async function postNewEvent(eventData) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    const error = new Error('An error occurred, while creating the event.');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { newEvent } = await response.json();

  return newEvent;
}
