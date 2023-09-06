import { JobsContainer, SearchContainer } from '../components'
import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { allJobsQuery } from './queryFunctions'

const AllJobsContext = createContext()

const AllJobs = () => {
  const { searchValues } = useLoaderData()
  const data = useQuery(allJobsQuery(searchValues)).data
  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAllJobsContext = () => useContext(AllJobsContext)
export default AllJobs
