import { useState } from 'react';
import bankLogo from '../../assets/bankLogo.svg';
import axios from 'axios';

const Register = () => {
    const [registerData, setRegisterData] = useState({
        fName: '',
        lName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { value, name } = e.target;
        setRegisterData((prevValue) => ({
            ...prevValue,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/register', registerData);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-[#fcfcfc] border rounded-2xl h-132 w-132 flex flex-col items-center justify-center">
                <img className="w-28 h-28" src={bankLogo} alt="Bank Logo" />
                <h1 className="text-[#003366] font-semibold text-3xl mb-4 mt-4">Sign Up</h1>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <input className="p-2 rounded border" placeholder="First Name" name="fName" onChange={handleChange} value={registerData.fName} />
                    <input className="p-2 rounded border" placeholder="Last Name" name="lName" onChange={handleChange} value={registerData.lName} />
                    <input className="p-2 rounded border" placeholder="Email" name="email" onChange={handleChange} value={registerData.email} />
                    <input className="p-2 rounded border" placeholder="Password" name="password" onChange={handleChange} type="password" value={registerData.password} />
                    <button className="bg-[#003366] text-white p-2 rounded font-bold" type="submit">Join</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
