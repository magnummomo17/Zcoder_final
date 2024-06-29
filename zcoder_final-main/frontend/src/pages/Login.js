import { useState } from "react"
import { Link } from 'react-router-dom'
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(username, password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Log In</h1>
      <p>Please fill the form to log in to your account.</p>
      <label>Username:</label>
      <br />
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <br />
      <label>Password:</label>
      <br />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <button disabled={isLoading} style={{float: 'left', marginRight: '20px'}}>LOG IN</button>
      <Link to="/signup"><p>or register</p></Link>
      
      {error && <div className="error">{error}</div>}
      <br />
    </form>
  )
}

export default Login