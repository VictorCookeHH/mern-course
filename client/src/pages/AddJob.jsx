import { FormRow, FormRowSelect, SubmitBtn } from '../components'
import Wrapper from '../assets/wrappers/DashboardFormPage'
import { JOB_LOCATION, JOB_STATUS, JOB_TYPE } from '../../../utils/constants'
import { Form } from 'react-router-dom'

const AddJob = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" placeholder="Frontend" />
          <FormRow type="text" name="company" placeholder="Apple" />
          <FormRow type="text" name="notes" placeholder="Applied on 9/3/2023" />
          <FormRow
            type="url"
            name="jobUrl"
            labelText="job url"
            placeholder="https://www.linkedin.com/"
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            list={Object.values(JOB_STATUS)}
            defaultValue={JOB_STATUS.INTEVIEW}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            list={Object.values(JOB_TYPE)}
            defaultValue={JOB_TYPE.FULL_TIME}
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

export default AddJob
