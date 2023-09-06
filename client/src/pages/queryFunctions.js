import customFetch from '../utils/customFetch'

export const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const { data } = await customFetch.get('/jobs/stats')
    return data
  },
}

export const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch.get('/users/me')
    return data
  },
}

export const allJobsQuery = (params) => {
  const { search, jobType, jobStatus, sort, page } = params
  return {
    queryKey: [
      'jobs',
      search ?? '',
      jobStatus ?? 'all',
      jobType ?? 'all',
      sort ?? 'newest',
      page ?? '1',
    ],
    queryFn: async () => {
      const { data } = await customFetch.get('/jobs', { params })
      return data
    },
  }
}
