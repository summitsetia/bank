import bankLogo from '../../assets/bankLogo.svg'
import Login from './Login.jsx'

const Welcome = () => {
  return (
    <div className="flex justify-center items-center h-screen space-x-16 ">
        <div className="border p-8">
            <h1 className='text-[#003366] font-semibold text-4xl mb-4 mt-4 '>Bank App</h1>
        </div>
        <div className="border flex flex-col items-center p-8">
            <img className='w-32 h-32' src={bankLogo} />
            <Login />
            <button className='w-64 border mb-4 cursor-pointer '>Register</button>
        </div>
    </div>
  )
}

export default Welcome;