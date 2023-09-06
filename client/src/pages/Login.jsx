import { Form, Link, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import { Logo, FormRow, SubmitBtn } from '../components/'
import { toast } from 'react-toastify'
import customFetch from '../utils/customFetch'

const Login = () => {
  const navigate = useNavigate()

  const loginDemoUser = async () => {
    const data = {
      email: 'test@test.com',
      password: ';adhjf;jkajksdf9jlaksdjflasdf832lkj34',
    }
    try {
      await customFetch.post('/auth/login', data)
      toast.success('Test the app!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err?.response?.data)
    }
  }

  return (
    <Wrapper>
      <Form className="form" method="post">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" />
        <FormRow type="password" name="password" />
        <SubmitBtn text="login" />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          Explore the app
        </button>
        <p>
          Not a member yet?{' '}
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}

export default Login
