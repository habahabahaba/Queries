// React-Query:
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/index.js';
// React-Router:
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
// Loaders:
import { editEventLoader } from './components/Events/EditEventLoader.js';
// Actions:
// import { editEventAction } from './components/Events/editEventAction.js';
// Components:
import Events from './components/Events/Events.jsx';
import EventDetails from './components/Events/EventDetails.jsx';
import NewEvent from './components/Events/NewEvent.jsx';
import EditEvent from './components/Events/EditEvent.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/events' />,
  },
  {
    path: '/events',
    element: <Events />,

    children: [
      {
        path: '/events/new',
        element: <NewEvent />,
      },
    ],
  },
  {
    path: '/events/:id',
    element: <EventDetails />,
    children: [
      {
        path: '/events/:id/edit',
        element: <EditEvent />,
        loader: editEventLoader,
        // action: editEventAction, // Use React-Query mutation instead.
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
