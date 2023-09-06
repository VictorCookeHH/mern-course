import { Link, useRouteError } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage'
import errorImg from '../assets/images/not-found.svg'
import serverErrorImg from '../assets/images/server-error.jpg'

const Error = () => {
  const error = useRouteError()
  console.log(error)

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={errorImg} alt="not found" />
          <h3>Page not found!</h3>
          <p>We cannot find the page you are looking for...</p>
          <Link to="/dashboard">Back home</Link>
        </div>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <div>
        <img src={serverErrorImg} alt="not found" />
        <h3>Server Error!</h3>
        <p>We are working on a fix right now...</p>
        <Link to="/dashboard">Back home</Link>
      </div>
    </Wrapper>
  )
}

export default Error
