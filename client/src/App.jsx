import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
} from './pages'
import {
  createJobAction,
  deleteJobAction,
  editJobAction,
  loginAction,
  profileAction,
  registerAction,
} from './pages/actions'
import {
  adminLoader,
  allJobsLoader,
  dashboardLoader,
  editJobLoader,
  statsLoader,
} from './pages/loaders'
import DeleteJob from './pages/DeleteJob'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ErrorElement from './components/ErrorElement'

// eslint-disable-next-line react-refresh/only-export-components
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme)
  return isDarkTheme
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
      },
      {
        path: 'login',
        element: <Login />,
        action: loginAction(queryClient),
      },
      {
        path: 'dashboard',
        element: <DashboardLayout queryClient={queryClient} />,
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true,
            element: <AddJob />,
            action: createJobAction(queryClient),
          },
          {
            path: 'stats',
            element: <Stats />,
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: allJobsLoader(queryClient),
            errorElement: <ErrorElement />,
          },
          {
            path: 'profile',
            element: <Profile />,
            action: profileAction(queryClient),
          },
          { path: 'admin', element: <Admin />, loader: adminLoader },
          {
            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction(queryClient),
          },
          {
            path: 'delete-job/:id',
            element: <DeleteJob />,
            action: deleteJobAction(queryClient),
          },
        ],
      },
    ],
  },
])

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
