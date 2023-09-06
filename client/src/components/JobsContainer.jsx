import Wrapper from '../assets/wrappers/JobsContainer'
import { useAllJobsContext } from '../pages/AllJobs'
import Job from './Job'
import PageContainerBtn from './PageBtnContainer'

const JobsContainer = () => {
  const { data } = useAllJobsContext()
  const { jobs, totalJobs, numOfPages } = data
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display..</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{totalJobs > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>
      {numOfPages > 1 && <PageContainerBtn />}
    </Wrapper>
  )
}

export default JobsContainer
