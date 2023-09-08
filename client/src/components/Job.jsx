/* eslint-disable react/prop-types */
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { Link, Form } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'
import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
day.extend(advancedFormat)

const Job = ({
  _id,
  position,
  company,
  jobUrl,
  jobType,
  jobStatus,
  createdAt,
  jobLocation,
  notes,
}) => {
  const date = day(createdAt).format('MMMM Do, YYYY')
  return (
    <Wrapper>
      <header>
        <a href={jobUrl} target="_blank" rel="noreferrer">
          <div className="main-icon">{company.charAt(0)}</div>
        </a>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${jobStatus}`}> {jobStatus}</div>
          <div> {notes}</div>
        </div>
        <footer className="actions">
          <Link className="btn edit-btn" to={`../edit-job/${_id}`}>
            Edit
          </Link>
          <Form method="post" action={`../delete-job/${_id}`}>
            <button type="submit" className="btn delete-btn">
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Job
