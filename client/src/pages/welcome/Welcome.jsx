import bankLogo from '../../assets/bankLogo.svg'
import Login from './Login.jsx'
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthenticated = async () => {
      const response = await axios.post("http://localhost:3000/welcome", {}, {withCredentials: true})
      const isUserAuthenticated = response.data.isAuthenticated
      console.log(isUserAuthenticated)
      if(isUserAuthenticated === true) {
        navigate("/dashboard")
      }
    }

    checkAuthenticated()
  })


  return (
    <div className="flex justify-center items-center h-screen space-x-16 ">
        <div className="border p-8">
            <h1 className='text-[#003366] font-semibold text-4xl mb-4 mt-4 '>Bank App</h1>
        </div>
        <div className="border flex flex-col items-center p-8">
            <img className='w-32 h-32' src={bankLogo} />
            <Login />
            <a href="/register"><button className='w-64 border mb-4 cursor-pointer '>Register</button></a>
        </div>
    </div>
  )
}

export default Welcome;