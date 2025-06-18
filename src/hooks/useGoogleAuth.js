import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import instance from '../Axios/axiosConfig';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getOwnProfile } from '../services/accountService';

const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginContext, setLoginContext] = useState({ rememberMe: null, navigate: null });

  const handleGoogleLogin = async (rememberMe, navigate, tokenResponse) => {
    setLoading(true);
    try {
      const userInfo = await axios.get('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });

      const payload = {
        email: userInfo.data.email,
        fullName: userInfo.data.name,
      };

      const response = await instance.post('/api/authen/login-google', payload);
      const loginData = response.data;

      if (response.status === 200) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('accessToken', loginData.accessToken);
        storage.setItem('refreshToken', loginData.refreshToken);
        storage.setItem('username', loginData.username);
        storage.setItem('accId', loginData.accId);
        const expiryTime = Date.now() + loginData.tokenExpiryIn * 1000;
        storage.setItem('tokenExpiry', expiryTime);

        const profileData = await getOwnProfile();
        storage.setItem('fullName', profileData.data.fullName || loginData.username);
        storage.setItem('avatarUrl', profileData.data.avatar || '');
        storage.setItem('profileData', JSON.stringify(profileData.data || {}));

        toast.success('LOGIN SUCCESSFULLY!');
        navigate('/');
      } else {
        toast.error('Login failed!');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Google login failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Google token response:', tokenResponse);
      if (loginContext.rememberMe !== null && loginContext.navigate) {
        handleGoogleLogin(loginContext.rememberMe, loginContext.navigate, tokenResponse);
      } else {
        setError('Cannot log in due to configuration error');
        toast.error('Cannot log in due to configuration error');
      }
    },
    onError: (error) => {
      console.error('Google login error:', error);
      setError('Google login failed');
      toast.error('Google login failed');
    },
    flow: 'implicit',
    prompt: 'select_account',
    scope: 'profile email',
  });

  const initiateGoogleLogin = (rememberMe, navigate) => {
    setLoginContext({ rememberMe, navigate });
    loginGoogle();
  };

  return { initiateGoogleLogin, loading, error };
};

export default useGoogleAuth;