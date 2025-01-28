import { useState } from "react"
import axios from "axios"

const Login = () => {
    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        console.log(loginData)
        const {value, name} = e.target;
        setLoginData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:3000/login', loginData )
        } catch (err) {
            console.log(err)
        }
    }
  return (
    <form onSubmit={handleSubmit}>
        <div className='mt-8 p-4'>
            <input className='w-64 border rounded-lg p-3' name="username" placeholder='username' value={loginData.username} onChange={handleChange}/>
        </div>
        <div className='p-4 '>
        <input className='w-64 border rounded-lg p-3' name="password" placeholder='password' value={loginData.password} onChange={handleChange}/>
        </div>
        <button className='w-64 border p-1 mb-12' type="submit">Login</button>
    </form>
  )
}

export default Login;
