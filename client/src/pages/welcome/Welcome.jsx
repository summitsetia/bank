import bankLogo from '../../assets/bankLogo.svg'
import Login from './Login.jsx'

const Welcome = () => {
  return (
    <div className="flex justify-center items-center h-screen space-x-16 ">
        <div className="border">
            <h1>Bank App</h1>
        </div>
        <div className="border flex flex-col items-center">
            <img className='w-32 h-32' src={bankLogo} />
            <Login />
            <button className='w-64 border mb-4'>Register</button>
        </div>
    </div>
  )
}

export default Welcome;