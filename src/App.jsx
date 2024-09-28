// React-Query:
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// React-Router:
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

// Components:
import Events from './components/Events/Events.jsx';
import EventDetails from './components/Events/EventDetails.jsx';
import NewEvent from './components/Events/NewEvent.jsx';
import EditEvent from './components/Events/EditEvent.jsx';

const queryClient = new QueryClient();

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
