import { useState, useEffect } from 'react';
import bankLogo from '../../assets/bankLogo.svg';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const response = await axios.post('http://localhost:3000/authenticate', {}, { withCredentials: true }) // withCredentials: true option in an HTTP request is used to indicate that cookies (or other credentials) should be sent along with cross-origin requests.
        const isUserAuthenticated = response.data.isAuthenticated
        if(isUserAuthenticated === true) {
          setIsAuthenticated(true)
        } else {
          navigate("/")
        }
      } catch (error) {
        console.log(error)
        navigate("/")
      }
    }

    authenticate()
  }, [])

  return (
    <>
      {isAuthenticated && (
        <div>
          <h1>Dashboard</h1>
        </div>
      )}
    </>
  );
};

export default Dashboard;
