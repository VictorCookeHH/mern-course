import { redirect } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { allJobsQuery, statsQuery, userQuery } from './queryFunctions'

export const dashboardLoader = (queryClient) => async () => {
  try {
    const data = await queryClient.ensureQueryData(userQuery)
    return data
  } catch (error) {
    return redirect('/')
  }
}

export const allJobsLoader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])
    await queryClient.ensureQueryData(allJobsQuery(params))
    return { searchValues: { ...params } }
  }

export const editJobLoader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`)
    return data
  } catch (err) {
    toast.error(err?.reponse?.data)
    return redirect('/dashboard/all-jobs')
  }
}

export const adminLoader = async () => {
  try {
    const { data } = await customFetch.get('users/admin')
    return data
  } catch (error) {
    toast.error('You are not authorized to view this page')
    return redirect('/dashboard')
  }
}

export const statsLoader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery)
  return data
}
