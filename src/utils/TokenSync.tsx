import { useEffect } from 'react';
import { isUserPresent, tokenState, userState } from '../store/atoms/AuthAtom';
import { useSetRecoilState,useRecoilState } from 'recoil';
import axios from 'axios';
import toast from 'react-hot-toast';

const TokenSync = () => {
  const  setToken = useSetRecoilState(tokenState);
  const  [isUser,setIsUserPresent]=useRecoilState(isUserPresent)
  const setUser = useSetRecoilState(userState);


  const Login = async (token:string) => {
    console.log(token)
    try {
      const response = await axios.post('/api/login',{token:token}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

  
      if (response.status === 201 || response.status ===  200) {
        const data={
          id: response.data.body.user.id,
          email: response.data.body.user.email,
          name: response.data.body.user.name,
          imageUrl: response.data.body.user.imageUrl,
          skinStart:response.data.body.user.skinStart,
          bodyStart:response.data.body.user.$bodyStart,
        }
       
        setUser(data);
      } else {
        toast.error(response?.data?.error)
        console.log('login failed', response);
      }
    } catch (error) {
      console.error('login error', error);
    }
  };
  useEffect(() => {
    const getToken =localStorage.getItem('token');
    if (getToken && !isUser) {
      setToken(getToken)
      setIsUserPresent(true);
      Login(getToken)
    }
  }, []);

  return null; // This component does not render anything
};

export default TokenSync;