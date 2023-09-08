import Wrapper from '../assets/wrappers/DashboardFormPage'
import { useLoaderData } from 'react-router-dom'
import { JOB_STATUS, JOB_TYPE, JOB_LOCATION } from '../../../utils/constants'
import { Form } from 'react-router-dom'
import { FormRowSelect, FormRow, SubmitBtn } from '../components'

const EditJob = () => {
  const job = useLoaderData()
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            name="notes"
            defaultValue={job.notes || ''}
            required={false}
          />
          <FormRow
            type="text"
            name="jobUrl"
            labelText="job url"
            defaultValue={job.jobUrl}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            list={Object.values(JOB_STATUS)}
            defaultValue={job.jobStatus}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            list={Object.values(JOB_TYPE)}
            defaultValue={job.jobType}
          />
          <FormRowSelect
            name="jobLocation"
            labelText="job location"
            list={Object.values(JOB_LOCATION)}
            defaultValue={JOB_LOCATION.REMOTE}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}

export default EditJob
