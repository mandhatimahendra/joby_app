import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isShowError: false, error: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.push('/')
  }

  renderFailureLogin = error => {
    this.setState({isShowError: true, error})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'

    const response = await fetch(url, options)
    const jsonData = await response.json()
    if (response.ok === true) {
      this.renderSuccessLogin(jsonData.jwt_token)
    } else {
      this.renderFailureLogin(jsonData.error_msg)
    }
  }

  render() {
    const {isShowError, error} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="login-form-container" onSubmit={this.onSubmitForm}>
          <div className="form-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
              className="logo"
            />
          </div>
          <label className="form-label" htmlFor="username">
            USERNAME
          </label>
          <br />
          <input
            type="text"
            className="form-input"
            id="username"
            placeholder="username"
            onChange={this.onChangeUsername}
          />
          <br />
          <label className="form-label" htmlFor="password">
            PASSWORD
          </label>
          <br />
          <input
            type="password"
            className="form-input"
            id="password"
            placeholder="password"
            onChange={this.onChangePassword}
          />
          <br />
          <button type="submit" className="form-submit-button">
            Login
          </button>
          {isShowError && <p className="error-message">{error}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
