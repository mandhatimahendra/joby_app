import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  const onRedirectToJobs = props => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-paragraph">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="retry-button-link">
          <button
            className="home-jobs-button"
            onClick={onRedirectToJobs}
            type="button"
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}

export default Home
