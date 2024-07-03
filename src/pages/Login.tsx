/* eslint-disable @typescript-eslint/no-explicit-any */
import graphics from "../assets/BetterMe.jpeg"
import Logo from "../assets/betterMeLogo.png"
import { useRecoilState, useRecoilValue, useSetRecoilState,} from 'recoil'
import { loginData, loginFlag, signupData, tokenState, userState } from '../store/atoms/AuthAtom';
import axios from "axios";
import toast from 'react-hot-toast'
import { useNavigate } from "react-router";

export const Login = () => {
  
  return (
    <div className='bg-[#020913]  flex w-full min-h-[100vh]'>
      {
       <FormCointeinter/>
      }
        
        <img src={graphics}
        className=' lg:w-[40%] h-[100vh] xs:w-[0%] '/>
        
    </div>
  )
}
const FormCointeinter=()=>{
  const isLogin:boolean=useRecoilValue(loginFlag)
  return (<div className="lg:w-[60%] w-[100%]">
    {
    isLogin?(<LoginForm/>):(<SignupForm/>)
    }
  </div>
  )
}




const SignupForm=()=>{
  const [formData, setFormData]=useRecoilState(signupData)
  const setLoginFlag=useSetRecoilState(loginFlag)
  const setUser = useSetRecoilState(userState);
  const setToken=useSetRecoilState(tokenState);
  const navigate=useNavigate();
  
  const changeFormData = async(e: { target: { name: any; value: any } }) => {
  // Logs the name attribute of the target element
   setFormData({ ...formData, [e.target.name]: e.target.value });  // Update formData state
  };
  const SignUp = async () => {
    try {
      const response = await axios.post('/api/signup',formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.data.status === 201 || response.data.status ===  200) {
        setUser(response.data.body.user)
        setToken(response.data.body.token)
        localStorage.setItem('token',response.data.body.token);
        toast.success('Account created sucessfully')
        navigate('/')
      } else {
        toast.error("erorr while signup")
      }
    } catch (error) {
      toast.error("erorr while signup")

    }
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    SignUp();
  };

return (
    <div className=' min-h-[100vh] xs:m-0 xs:p-0 lg:m-10 lg:p-10 flex flex-col items-center  gap-6'>
       <img src={Logo} className='w-[300px] h-[180px]'/>
       <input className='w-[80%] rounded-md h-12 bg-[#0C2D48] text-white pl-4' placeholder="Name" name='name' onChange={changeFormData}></input>
       <input className='w-[80%] rounded-md h-12 bg-[#0C2D48] text-white pl-4' placeholder="Email" name='email' onChange={changeFormData}></input>
       <input className='w-[80%] rounded-md h-12 bg-[#0C2D48] text-white pl-4' placeholder="Password" name='password' onChange={changeFormData}></input>
       <button className='w-[25%] rounded-xl h-14 bg-[#145DA0] text-white text-2xl' onClick={handleSubmit}>Register</button>

       <div>
       <span className='text-white'>Already Have an Account? </span>
       <button className='text-[#145DA0] underline text-lg'
       onClick={()=>setLoginFlag(true)}>Login</button>
       </div>
       
    </div>
)
}
const LoginForm=()=>{
  const [formData, setFormData]=useRecoilState(loginData)
  const setLoginFlag=useSetRecoilState(loginFlag)
  const setUser = useSetRecoilState(userState);
  const setToken=useSetRecoilState(tokenState);
  const navigate =useNavigate();
  
  const changeFormData = async(e: { target: { name: any; value: any } }) => {
  // Logs the name attribute of the target element
   setFormData({ ...formData, [e.target.name]: e.target.value });  // Update formData state
  };
  const Login = async () => {
    try {
      const response = await axios.post('/api/login',formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.data.status === 201 || response.data.status ===  200) {
        console.log('Login successful', response);
        setUser(response.data.body.user)
        setToken(response.data.body.token)
        localStorage.setItem('token',response.data.body.token);
        toast.success('Logged in sucessfully')
        navigate('/')
        
      } else {
        toast.error(response.data.body.error)
        console.log('login failed', response.data.status);
      }
    } catch (error) {
      console.error('login error', error);
    }
  };


return (
    <div className=' min-h-[100vh] m-10 p-10 xs flex flex-col items-center  gap-6'>
       <img src={Logo} className='w-[300px] h-[180px] '/>

       <input className='w-[80%] rounded-md h-12 bg-[#0C2D48] text-white pl-4' placeholder="Email" name='email' onChange={changeFormData}></input>
       <input className='w-[80%] rounded-md h-12 bg-[#0C2D48] text-white pl-4' placeholder="Password" name='password' onChange={changeFormData}></input>
       <button className='w-[25%] rounded-xl h-14 bg-[#145DA0] text-white text-2xl' onClick={Login}>Login</button>
       <div>
       <span className='text-white'>Donot have an acccount? </span>
       <button className='text-[#145DA0] underline text-lg'
       onClick={()=>setLoginFlag(false)}>create one</button>
       </div>
    </div>
)
}

export default Login
//#282829