// React-Query:
import { useQuery } from '@tanstack/react-query';
// Queries:
import { fetchSelectableImages } from '../../api/queries/index.js';
// React:
import { useState } from 'react';
// Components:
import ImagePicker from '../ImagePicker.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EventForm({ inputData, onSubmit, children }) {
  // State:
  const [selectedImage, setSelectedImage] = useState(inputData?.image);

  // Fetching Images:
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events-images'],
    queryFn: fetchSelectableImages,
  });

  // Handlers:
  function handleSelectImage(image) {
    setSelectedImage(image);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    onSubmit({ ...data, image: selectedImage });
  }

  return (
    <form id='event-form' onSubmit={handleSubmit}>
      <p className='control'>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          name='title'
          defaultValue={inputData?.title ?? ''}
        />
      </p>
      {isPending ? <span>Loading selectable images...</span> : null}
      {isError ? (
        <ErrorBlock
          title='Failed to load selectable images.'
          message={error.info?.message || 'Please try again later.'}
        />
      ) : null}
      {data ? (
        <div className='control'>
          <ImagePicker
            images={data}
            onSelect={handleSelectImage}
            selectedImage={selectedImage}
          />
        </div>
      ) : null}

      <p className='control'>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          name='description'
          defaultValue={inputData?.description ?? ''}
        />
      </p>

      <div className='controls-row'>
        <p className='control'>
          <label htmlFor='date'>Date</label>
          <input
            type='date'
            id='date'
            name='date'
            defaultValue={inputData?.date ?? ''}
          />
        </p>

        <p className='control'>
          <label htmlFor='time'>Time</label>
          <input
            type='time'
            id='time'
            name='time'
            defaultValue={inputData?.time ?? ''}
          />
        </p>
      </div>

      <p className='control'>
        <label htmlFor='location'>Location</label>
        <input
          type='text'
          id='location'
          name='location'
          defaultValue={inputData?.location ?? ''}
        />
      </p>

      <p className='form-actions'>{children}</p>
    </form>
  );
}
